import { LOGIN, LOGOUT } from '../actions/auth'

let init = {
  authenticated: false,
  user: null,
}

// Auth Reducer
export default (state = init, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        authenticated: true,
        user: action.user,
      }

    case LOGOUT:
      return {
        authenticated: false,
        user: null,
      }

    default:
      return state
  }
}
