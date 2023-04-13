import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createCommentService = async (body) => {
  try {
    const resp = await axios.post('/api/comments/', body, config);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getCommentService = async (blogId) => {
  try {
    const commentList = await axios.get(`/api/comments/${blogId}`, config);
    return commentList;
  } catch (error) {
    return error;
  }
};
