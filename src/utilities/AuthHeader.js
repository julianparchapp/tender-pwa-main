import jwtService from '../services/jwtService';

// eslint-disable-next-line import/prefer-default-export
const authHeader = () => {
  const token = jwtService.getAccessToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};
export default authHeader;
