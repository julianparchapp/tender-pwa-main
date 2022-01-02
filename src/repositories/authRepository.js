import { serialize } from 'object-to-formdata';
import http from '../services/http';

const authUrl = '/api/v1/auth/user';
const registerUser = '/api/v1/users';

const headers = {
  applicationJson: 'application/json',
  multipartFormData: 'multipart/form-data',
};

const authRepository = {
  loginUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${authUrl}/`, serialize(data));
    } catch (error) {
      throw error;
    }
  },
  registerUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${registerUser}`, data);
    } catch (error) {
      throw error;
    }
  },
  getAuthMe: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get('/api/v1/auth/me');
    } catch (error) {
      throw error;
    }
  },
};

export default authRepository;
