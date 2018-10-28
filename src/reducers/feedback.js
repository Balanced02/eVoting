import {
  SHOW_ERROR,
  CLEAR_ERROR,
  SHOW_INFO,
  CLEAR_INFO,
  SHOW_LOADING,
  STOP_LOADING,
} from '../actions/feedback'

const init = {
  loading: false,
  errors: [],
  infos: [],
}

// Feedback Reducer
export default (state = init, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return {
        ...state,
        errors: [{ error: action.error, id: action.id }],
      }

    case CLEAR_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== action.id),
      }

    case SHOW_INFO:
      return {
        ...state,
        infos: state.infos.concat({ info: action.info, id: action.id }),
      }

    case CLEAR_INFO:
      return {
        ...state,
        infos: state.infos.filter(info => info.id !== action.id),
      }

    case SHOW_LOADING:
      return {
        ...state,
        loading: true,
      }

    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}
