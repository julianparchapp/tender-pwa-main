import http from '../services/http';

const commerceUrl = '/api/v1/commerces';

const headers = {
  applicationJson: 'application/json',
  multipartFormData: 'multipart/form-data',
};

const commerceRepository = {
  getCommerce: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${commerceUrl}/`, data);
    } catch (error) {
      throw error;
    }
  },
  getInfoCommerce: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${commerceUrl}/user/${id}`);
    } catch (error) {
      throw error;
    }
  },

  getCommercesAround: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${commerceUrl}/game`, data);
    } catch (error) {
      throw error;
    }
  },
};

export default commerceRepository;
