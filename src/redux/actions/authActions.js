import {
  REGULAR_LOGIN,
  REQUEST_ERROR,
  REQUEST_IN_PROGRESS,
  LOGOUT,
  REGISTER,
} from "./types";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import "../../firebase/config";

export const regularLogin = (loggedUser) => {
  return { type: REGULAR_LOGIN, payload: loggedUser };
};
export const register = (loggedUser) => ({
  type: REGISTER,
  payload: loggedUser,
});
export const requestError = (error) => ({
  type: REQUEST_ERROR,
  payload: error,
});
export const requestInProgress = () => ({ type: REQUEST_IN_PROGRESS });
export const logout = () => ({
  type: LOGOUT,
});

export const signin = (userInput) => {
  const auth = getAuth();
  return async (dispatch) => {
    dispatch(requestInProgress());
    try {
      await signInWithEmailAndPassword(
        auth,
        userInput.email,
        userInput.password
      ).then((cred) => {
        dispatch(regularLogin(cred.user));
      });
    } catch (error) {
      dispatch(requestError(error));
    }
  };
};

export const signout = () => {
  const auth = getAuth();
  return async (dispatch) => {
    try {
      await signOut(auth).then(() => {
        dispatch(logout());
      });
    } catch (error) {
      console.log(error);
      dispatch(requestError(error));
    }
  };
};

export const registerUser = (userInfo) => {
  const auth = getAuth();
  return async (dispatch) => {
    dispatch(requestInProgress());
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      ).then((cred) => {
        updateProfile(auth.currentUser, {
          displayName: userInfo.fullName,
          photoURL: userInfo.image,
        }).then((res) => {
          const db = getDatabase();
          const refrence = ref(db, "users/" + cred.user.uid);
          set(refrence, {
            phoneNumber: userInfo.phoneNumber,
          });
          dispatch(register(auth.currentUser));
        });
      });
    } catch (error) {
      dispatch(requestError(error));
    }
  };
};
