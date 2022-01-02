import categoriesRepository from '../../repositories/categoriesRepository';

const categoriesService = {
  getCategories: async (idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await categoriesRepository.getCategory(idCommerce);
    } catch (error) {
      throw error;
    }
  },
  getCategoryByUser: async (idCommerce) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await categoriesRepository.getCategoryByUser(idCommerce);
    } catch (error) {
      throw error;
    }
  },
};

export default categoriesService;
