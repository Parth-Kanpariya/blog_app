import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createFavoriteService = async (id) => {
  try {
    const resp = await axios.post(`/api/favorites/${id}`, {}, config);
    return resp;
  } catch (error) {
    return error;
  }
};
export const getFavoriteByIdService = async (blogId) => {
  try {
    const resp = await axios.get(`/api/favorites/${blogId}`, config);
    return resp.data;
  } catch (error) {
    return error;
  }
};
export const getFavoritesService = async () => {
  try {
    const resp = await axios.get(`/api/favorites/`, config);
    return resp.data;
  } catch (error) {
    return error;
  }
};

export const removeFavoritesService = async (blogId) => {
  try {
    const resp = await axios.delete(`/api/favorites/${blogId}`, config);
    return resp;
  } catch (error) {
    return error;
  }
};
