import axios from 'axios';
import { toast } from 'react-toastify';
import SetAuthToken from '../helper/SetAuthToken';
// register user
export const RegisterUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(userData);

  try {
    const resp = await axios.post('/api/user/signup', body, config);
    console.log(resp.status);
    if (resp.status !== 200) {
      return null;
    }
    return resp;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    return null;
  }
};

// login user
export const loginUser = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(userData);
  try {
    const resp = await axios.post('/api/user/login', body, config);
    if (resp.status === 200) {
      localStorage.setItem('token', resp.data.data.data.accessToken);
      localStorage.setItem('userId', resp.data.data.data.user_id);

      SetAuthToken(resp.data.data.data.accessToken);

      const user = await getUser();
      localStorage.setItem('user', JSON.stringify(user.data.data));
      return resp;
    }
    return null;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    return null;
  }
};

//get user
export const getUser = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const resp = await axios.get('/api/user/me', null, config);
    console.log(resp.data);
    if (resp.status === 200) {
      return resp.data;
    }
    return null;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    toast.error(errors);
  }
};

//update user

export const updateUser = async (body) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const resp = await axios.put('/api/user/me', body);
    console.log(resp.data);
    if (resp.status === 200) {
      return resp.data;
    }
    return null;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
    toast.error(errors);
  }
};
