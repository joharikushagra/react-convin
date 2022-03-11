import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./userTypes";

const initialState = {
  loading: false,
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
