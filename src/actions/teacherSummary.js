import { callApi } from "../utils";

export const SUMMARIES = "SUMMARIES";

export const summaries = summary => {
  console.log("from summaries "+ summary.totalStaff)
  return {
    type: SUMMARIES,
    payload: summary
  };
};

export const getSummary = () => {
  return dispatch => {
    callApi("/getSummary")
      .then(data => {
        dispatch(summaries(data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

