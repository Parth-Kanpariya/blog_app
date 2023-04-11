import { getUser } from '../../services/authService';
export const fetchUser = () => async (dispatch) => {
  const user = await getUser();
  dispatch({
    type: 'FETCH_USER',
    payload: user.data.data
  });
};

export const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    payload: user
  };
};
