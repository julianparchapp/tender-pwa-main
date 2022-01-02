import productsRepository from '../../repositories/productsRepository';

const productsService = {
  getProductsByCategory: async (category) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await productsRepository.getProductsByCategory(category);
    } catch (error) {
      throw error;
    }
  },
};

export default productsService;
