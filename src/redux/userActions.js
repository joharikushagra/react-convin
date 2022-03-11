import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./userTypes";

const fetchUserRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    const response1 = await fetch("https://reqres.in/api/users?page=1");
    const response2 = await fetch("https://reqres.in/api/users?page=2");
    const users1 = await response1.json();
    const users2 = await response2.json();
    dispatch(fetchUserSuccess([...users1.data, ...users2.data]));
  };
};
