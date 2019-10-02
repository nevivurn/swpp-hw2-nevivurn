import axios from 'axios';

export const getUsers = () => {
  return async dispatch => {
    const { data } = await axios.get('/api/user');
    return await dispatch({
      type: 'GET_USERS',
      users: data,
    });
  };
};

export const loggedIn = email => {
  return async dispatch => {
    const { data } = await axios.patch('/api/user/1', {
      logged_in: true,
    });

    return await dispatch({
      type: 'LOGGED_IN',
      userId: data.id,
    });
  };
};

export const loggedOut = id => {
  return async dispatch => {
    const { data } = await axios.patch(`/api/user/${id}`, {
      logged_in: false,
    });

    return await dispatch({
      type: 'LOGGED_OUT',
      userId: data.id,
    });
  };
};
