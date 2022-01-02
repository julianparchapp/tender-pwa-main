import { serialize } from 'object-to-formdata';
import interestRepository from '../../repositories/interestRepository';

const interestService = {
  getInterest: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return interestRepository.getInterest();
    } catch (error) {
      throw error;
    }
  },
  saveGroupInterest: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return interestRepository.saveGroupInterest(serialize(groupInterestRequestData(data)));
    } catch (error) {
      throw error;
    }
  },
};

const groupInterestRequestData = (dataInteres, method) => {
  dataInteres = dataInteres || {};
  const dataToSave = [];
  dataInteres.map((item) => dataToSave.push(item.id));
  console.log('dataToSave', dataToSave);
  return { interests: dataToSave };
};

export default interestService;
