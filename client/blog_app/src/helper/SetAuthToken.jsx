import axios from 'axios';
const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default SetAuthToken;
