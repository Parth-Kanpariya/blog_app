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

export const getBlogService = async (id) => {
  try {
    const resp = await axios.get(
      '/api/blogs/',
      {
        user_id: localStorage.userId
      },
      config
    );

    return resp.data;
  } catch (error) {
    return error;
  }
};

export const getFilteredBlogService = async (query) => {
  try {
    const resp = await axios.get(`/api/blogs/search/${query}`, null, null, config);
    return resp.data;
  } catch (error) {
    return error;
  }
};

export const getBlogByIdService = async (id) => {
  try {
    const resp = await axios.get(`/api/blogs/${id}`, {}, config);
    return resp.data;
  } catch (error) {
    return error;
  }
};

export const updateBlogService = async (id, body) => {
  console.log(body);
  try {
    const response = await axios.put(`http://localhost:3000/api/blogs/${id}`, body);
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const deleteBlogService = async (id) => {
  try {
    const resp = await axios.delete(`http://localhost:3000/api/blogs/${id}`, null, config);

    return resp;
  } catch (error) {
    return error;
  }
};
