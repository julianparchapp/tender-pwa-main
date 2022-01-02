import http from '../services/http';

// eslint-disable-next-line camelcase
const interesUrl = '/api/v1/interests';
const groupUserUrl = '/api/v1/groupUsers';
const groupInteresUrl = '/api/v1/groupInterest';
const groupSilentUrl = '/api/v1/groupUserSilents';
const groupUserRoomUrl = '/api/v1/groupUserRooms';
const profileGroupUrl = '/api/v1/user/groupUsers';

const groupUserRepository = {
  getGroupsInCommerce: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${groupUserUrl}`);
    } catch (error) {
      throw error;
    }
  },
  saveGroupUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${groupUserUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  saveInteresGroup: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${groupInteresUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  getInterests: async (category) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${interesUrl}`);
    } catch (error) {
      throw error;
    }
  },
  postGroupSilent: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${groupSilentUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  postGroupInvitation: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.post(`${groupUserRoomUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
  deleteGroupRoom: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.delete(`${groupUserRoomUrl}/${data?.id}`);
    } catch (error) {
      throw error;
    }
  },
  getProfileGroup: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.get(`${profileGroupUrl}`);
    } catch (error) {
      throw error;
    }
  },
  updateProfileGroup: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await http.put(`${groupUserUrl}`, data);
    } catch (error) {
      throw error;
    }
  },
};

export default groupUserRepository;
