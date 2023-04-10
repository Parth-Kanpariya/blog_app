import axios from 'axios';
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};
export const createBlogService = async (body) => {
  try {
    console.log(body);
    const resp = await axios.post('/api/blogs/', body);
    return resp;
  } catch (error) {
    return error;
  }
};

export const getBlogService = async () => {
  try {
    const BlogList = await axios.get('/api/blogs/', {}, config);
    return BlogList;
  } catch (error) {
    return error;
  }
};

export const getBlogByIdService = async (id) => {
  try {
    const BlogData = await axios.get(`/api/blogs/${id}`, {}, config);
    return BlogData;
  } catch (error) {
    return error;
  }
};
