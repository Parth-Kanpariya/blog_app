const initialState = {
  user: null
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_USER':
      if (state.user && state.user.user_id === action.payload.user_id) {
        return { ...state, user: action.payload };
      }
      return state;
    default:
      return state;
  }
};
