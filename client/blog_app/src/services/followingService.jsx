import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createFollowingService = async (id) => {
  try {
    const resp = await axios.post(
      '/api/followings/',
      null,
      {
        params: {
          blogUserId: id
        }
      },
      config
    );
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFollowingService = async (id) => {
  try {
    const commentList = await axios.get(`/api/followings/${id}`, config);
    return commentList;
  } catch (error) {
    return error;
  }
};

export const getMyFollowingService = async () => {
  try {
    const commentList = await axios.get(`/api/followings/`, config);
    return commentList;
  } catch (error) {
    return error;
  }
};

export const unFollowingService = async (id) => {
  try {
    const resp = await axios.delete(`http://localhost:3000/api/followings/${id}`, null, config);
    return resp;
  } catch (error) {
    return error;
  }
};
