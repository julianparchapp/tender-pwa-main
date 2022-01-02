import axios from 'axios';
import jwtDecode from 'jwt-decode';
import FuseUtils from '../../utilities/FuseUtils';
import { Axios } from '../apiService/apiService';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            // if you ever get an unauthorized response, logout the user
            this.emit('onAutoLogout', 'Invalid access_token');
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit('onNoAccessToken');

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit('onAutoLogin', true);
    } else {
      this.setSession(null);
      this.emit('onAutoLogout', 'access_token expired');
    }
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/register', data).then((response) => {
        if (response.data.user) {
          this.setSession(response.data.access_token);
          resolve(response.data.user);
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (id_token_string, commerce_id) => {
    return new Promise((resolve, reject) => {
      const data = {
        id_token_string,
        commerce_id,
      };
      axios
        .post(`${process.env.REACT_APP_TENDER_API}/api/v1/auth/user`, data, {
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          // console.log('DATA LOG', response.data);
          if (!response.data.code) {
            this.setSession(response.data.access_token);
            resolve(response.data);
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Verifique sus credenciales o contactar con el administrador.');
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_TENDER_API}/api/v1/auth/me?include=commerce`, {
          headers: {
            Authorization: `Bearer ${this.getAccessToken()}`,
          },
        })
        .then((response) => {
          if (response.data.code === 200) {
            // this.setSession(response.data.access_token);
            // this.setSession(this.getAccessToken());
            const { data } = response.data.data;
            // console.log('data', data);
            const newData = {
              role: data.rol?.rol,
              data: {
                displayName: data.name,
                photoURL: 'foto',
                email: data.email,
                displayUser: data.name,
                displayPhone: data.phone,
                displayStatus: data.status?.status,
                displayId: data.id,
              },
            };
            resolve(newData);
          } else {
            this.logout();
            reject(new Error('Failed to login with token.'));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error('Failed to login with token.'));
        });
    });
  };

  updateUserData = (user) => {
    return axios.post('/api/auth/user/update', {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem('@token-login', access_token);
      Axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem('@token-login');
      delete Axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn('access token expired');
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem('@token-login');
  };
}

const instance = new JwtService();

export default instance;
