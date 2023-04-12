import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createCommentService = async (body) => {
  try {
    console.log(body);
    const resp = await axios.post('/api/comments/', body, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getCommentService = async (blogId) => {
  console.log(blogId, '===================++++++++++++++++++++');
  try {
    const commentList = await axios.get(
      `/api/comments/${blogId}`,
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
