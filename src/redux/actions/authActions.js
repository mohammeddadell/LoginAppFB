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
import {
  getStorage,
  ref as strgRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import uuid from "uuid";
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
      ).then(async (cred) => {
        let imgURL = "";
        if (userInfo.image) {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", userInfo.image.uri, true);
            xhr.send(null);
          });
          const fileRef = strgRef(getStorage(), uuid.v4());
          const result = await uploadBytes(fileRef, blob);
          blob.close();
          imgURL = await getDownloadURL(fileRef);
          console.log(imgURL);
        }

        updateProfile(auth.currentUser, {
          displayName: userInfo.fullName,
          photoURL: imgURL,
        }).then((res) => {
          const db = getDatabase();
          const refrence = ref(db, "users/" + cred.user.uid);
          set(refrence, {
            phoneNumber: userInfo.phoneNumber,
          });
          refrence.putFile;
          dispatch(register(auth.currentUser));
        });
      });
    } catch (error) {
      dispatch(requestError(error));
    }
  };
};
