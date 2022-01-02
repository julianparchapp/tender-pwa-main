import { serialize } from 'object-to-formdata';
import commerceRepository from '../../repositories/commerceRepository';

const commercesService = {
  getCommerce: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await commerceRepository.getCommerce(data);
    } catch (error) {
      throw error;
    }
  },
  getInfoCommerce: async (id) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await commerceRepository.getInfoCommerce(id);
    } catch (error) {
      throw error;
    }
  },
  getCommercesAround: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await commerceRepository.getCommercesAround(serialize(data));
    } catch (error) {
      throw error;
    }
  },
};

export default commercesService;
