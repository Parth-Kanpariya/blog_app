import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createLikeService = async (body) => {
  try {
    console.log(body);
    const resp = await axios.post('/api/likes/', body, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getLikeService = async (blogId) => {
  console.log(blogId, '===================++++++++++++++++++++');
  try {
    const commentList = await axios.get(
      `/api/likes/${blogId}`,
      {
        // user_id: localStorage.userId
        // // params: {
        // //   title: query
        // // }
      },
      config
    );
    return commentList;
  } catch (error) {
    return error;
  }
};
