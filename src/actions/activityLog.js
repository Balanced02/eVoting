import { callApi } from "../utils";

export const ACTIVITIES = "ACTIVITIES";

export const activities = activity => {
  return {
    type: ACTIVITIES,
    activity
  };
};

export const getActivities = () => {
  return dispatch => {
    callApi("/log")
      .then(data => {
        dispatch(activities(data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};
