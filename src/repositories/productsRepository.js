import http from '../services/http';

// eslint-disable-next-line camelcase
const productUrl = '/api/v1/products';

const productsRepository = {
  getProductsByCategory: async (category) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${productUrl}/menu/${category}?include=productVariants:enabled(1)`);
    } catch (error) {
      throw error;
    }
  },
};

export default productsRepository;
