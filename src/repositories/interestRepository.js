import http from '../services/http';

const interestUrl = '/api/v1/interests';
const groupInterestUrl = '/api/v1/groupInterest';

const interestRepository = {
  getInterest: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${interestUrl}`);
    } catch (error) {
      throw error;
    }
  },
  saveGroupInterest: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${groupInterestUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
};

export default interestRepository;
