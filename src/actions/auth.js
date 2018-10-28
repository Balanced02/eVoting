// import { BrowserRouter } from 'react-router-dom';
import { history } from "../index";
import { callApi } from "../utils";
import { startLoading, stopLoading, showError, showInfo } from "./feedback";
import { message } from "antd";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = user => {
  return {
    type: LOGIN,
    user
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};

export const startRegister = formData => {
  return dispatch => {
    dispatch(startLoading());
    callApi("/auth/register", formData, "POST")
      .then(data => {
        dispatch(stopLoading());
        dispatch(showInfo("Registration Successful! Please go to Login"));
        console.log(data);
        history.push("/login");
      })
      .catch(err => {
        dispatch(stopLoading());
        dispatch(showError(err));
        console.log(err);
      });
  };
};

export const startLogin = formData => {
  return dispatch => {
    dispatch(startLoading());
    setTimeout(() => 
    history.push("/dashboard"), 3000
    )
    // callApi("/auth/login", formData, "POST")
    //   .then(data => {
    //     dispatch(stopLoading());
    //     dispatch(showInfo("Login Successful!"));
    //     dispatch(login(data.user));
    //     history.push("/dashboard");
    //   })
    //   .catch(err => {
    //     dispatch(stopLoading());
    //     dispatch(showError(err));
    //     console.log(err);
    //   });
  };
};
