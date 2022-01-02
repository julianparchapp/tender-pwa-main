import { serialize } from 'object-to-formdata';
import groupUserRepository from '../../repositories/groupUserRepository';

const GroupUserService = {
  saveGroupUser: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await groupUserRepository.saveGroupUser(serialize(data));
    } catch (error) {
      throw error;
    }
  },
  postGroupSilent: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await groupUserRepository.postGroupSilent(serialize(data));
    } catch (error) {
      throw error;
    }
  },
  postGroupInvitation: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await groupUserRepository.postGroupInvitation(serialize(data));
    } catch (error) {
      throw error;
    }
  },
  deleteGroupRoom: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await groupUserRepository.deleteGroupRoom(data);
    } catch (error) {
      throw error;
    }
  },
  getGroupsInCommerce: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await groupUserRepository.getGroupsInCommerce();
    } catch (error) {
      throw error;
    }
  },
  getProfileGroup: async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      return await groupUserRepository.getProfileGroup();
    } catch (error) {
      throw error;
    }
  },
  updateProfileGroup: async (data) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const { dataForm, copyPhotos } = data;
      return await groupUserRepository.updateProfileGroup(
        serialize(profileRequestData(dataForm, copyPhotos, 'PUT'), { nullsAsUndefineds: true })
      );
    } catch (error) {
      throw error;
    }
  },
};

const handleCheckUpdateImage = (formData, copyPhotos) => {
  return formData.map((item) => {
    if (!item.url) {
      const findCopy = copyPhotos.find((d) => d.id === item.id);
      return findCopy.url;
    }
    return item.url;
  });
};

const profileRequestData = (dataInteres, copyPhotos, method) => {
  dataInteres = dataInteres || {};
  return {
    group_name: dataInteres.name,
    user_name: dataInteres.user,
    photos: handleCheckUpdateImage(dataInteres?.photos, copyPhotos),
    _method: method,
  };
};

export default GroupUserService;
