import { SUMMARIES } from "../actions/teacherSummary";

let init = {

    summary:[],
    notices:[],
    searching:true, 
};

// summary Reducer
export default (state = init, action) => {
  switch (action.type) {
    case SUMMARIES:
      
      return {
        summary: action.payload,
        notices: action.payload.noticeBoard,
        searching:false
      }

    default:
      return state;
  }
};
