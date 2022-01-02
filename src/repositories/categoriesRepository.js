import http from '../services/http';

// eslint-disable-next-line camelcase
const categoryUrl = '/api/v1/categories';

const categoriesRepository = {
  getCategory: async (idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${categoryUrl}/commerce/${idCommerce}`);
    } catch (error) {
      throw error;
    }
  },
  getCategoryByUser: async (idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${categoryUrl}/user/${idCommerce}`);
    } catch (error) {
      throw error;
    }
  },
};

export default categoriesRepository;
