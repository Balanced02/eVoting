import { ACTIVITIES } from "../actions/activityLog";

let init = {
  activities: []
};

// Activity Log Reducer
export default (state = init, action) => {
  switch (action.type) {
    case ACTIVITIES:
      return {
        activities: action.activity.Usage
      };

    default:
      return state;
  }
};
