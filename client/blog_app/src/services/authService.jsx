import axios from 'axios';
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
    if (resp.status !== 200) {
      return null;
    }
    return resp;
  } catch (err) {
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
    if (resp.status === 200) {
      return resp.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

//update user
export const updateUser = async (body) => {
  try {
    const resp = await axios.put('/api/user/me', body);
    if (resp.status === 200) {
      return resp.data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

export const VerifyUserService = async (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify(userData);

  try {
    const resp = await axios.post('/api/user/verification', body, config);
    if (resp.status !== 200) {
      return null;
    }
    return resp;
  } catch (err) {
    return null;
  }
};
