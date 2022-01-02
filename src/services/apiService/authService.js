import { serialize } from 'object-to-formdata';
import authRepository from '../../repositories/authRepository';

const AuthService = {
  loginUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await authRepository.loginUser(data);
    } catch (error) {
      throw error;
    }
  },
  registerUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await authRepository.registerUser(serialize(data));
    } catch (error) {
      throw error;
    }
  },
  getAuthMe: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const authInfo = await authRepository.getAuthMe();
      return formatDataUser(authInfo);
    } catch (error) {
      throw error;
    }
  },
};

const formatDataUser = (data) => {
  return {
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
};
export default AuthService;
