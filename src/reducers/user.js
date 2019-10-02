const initialState = {
  users: [],
};

const login = (state = initialState, action) => {
  console.log('r/u:', state, action);
  switch (action.type) {
    case 'GET_USERS':
      return { ...state, users: action.users };

    case 'LOGGED_IN':
      const loginUsers = [ ...state.users ];
      loginUsers[action.userId-1] = { ...state.users[action.userId-1], logged_in: true };
      return { ...state, users: loginUsers };

    case 'LOGGED_OUT':
      const logoutUsers = [ ...state.users ];
      logoutUsers[action.userId-1] = { ...state.users[action.userId-1], logged_in: false };
      return { ...state, users: logoutUsers };

    default:
      return state;
  }
};

export default login;
