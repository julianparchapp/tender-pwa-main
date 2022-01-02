import http from '../services/http';

const messageUrl = '/api/v1/roomMessages';

const messagesRepository = {
  getPublicMessages: async (idCommerce, page) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${messageUrl}/public/${idCommerce}?page=${page}`);
    } catch (error) {
      throw error;
    }
  },
  getRoomMessages: async (idRoom, page) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${messageUrl}/${idRoom}?page=${page}`);
    } catch (error) {
      throw error;
    }
  },
  postMessages: async (body) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${messageUrl}`, body);
    } catch (error) {
      throw error;
    }
  },
};

export default messagesRepository;
