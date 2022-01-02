import messagesRepository from '../../repositories/messagesRepository';

const messagesService = {
  getPublicMessages: async (idCommerce, page) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await messagesRepository.getPublicMessages(idCommerce, page);
    } catch (error) {
      throw error;
    }
  },
  getRoomMessages: async (idRoom, page) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await messagesRepository.getRoomMessages(idRoom, page);
    } catch (error) {
      throw error;
    }
  },
  postMessages: async (body) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await messagesRepository.postMessages(body);
    } catch (error) {
      throw error;
    }
  },
};

export default messagesService;
