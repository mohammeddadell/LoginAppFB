import {
  REGULAR_LOGIN,
  REGISTER,
  REQUEST_IN_PROGRESS,
  REQUEST_ERROR,
  LOGOUT,
} from "../actions/types";
const loginInitialState = {
  user: null,
  errorMessage: null,
  loading: false,
};

const authReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case REQUEST_IN_PROGRESS:
      return { ...state, loading: true };

    case REGULAR_LOGIN:
      return { ...state, user: action.payload, loading: false };

    case REGISTER:
      return { ...state, user: action.payload, loading: false };

    case REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: "REQUEST_ERROR " + action.payload,
      };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default authReducer;
