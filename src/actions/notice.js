import { callApi } from "../utils";
import { getSummary } from "./teacherSummary"
import { message } from "antd";

export const CREATE_NOTICE = "CREATE_NOTICE";
export const CREATE_NOTICE_SUCCESS = "CREATE_NOTICE_SUCCESS";
export const CREATE_NOTICE_ROLLBACK = "CREATE_NOTICE_ROLLBACK";



export const createNotice = formData => {
   return dispatch => {
    callApi('/createNotice', formData, 'POST')
      .then(data => {
        message.info("New Notice Added");
        dispatch(getSummary());
      })
      .catch(err => {
        message.error("Error Creating Notice");
      });
  };
};

