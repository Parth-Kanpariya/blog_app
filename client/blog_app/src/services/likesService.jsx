import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createLikeService = async (body) => {
  try {
    const resp = await axios.post('/api/likes/', body, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getLikeService = async (blogId) => {
  try {
    const like = await axios.get(`/api/likes/${blogId}`, config);
    return like?.data?.data;
  } catch (error) {
    return error;
  }
};
