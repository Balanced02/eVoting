import { Map } from 'immutable';
import actions from './actions';
import JwtAuthentication from '../../helpers/jwtAuthentication';

const localToken = JwtAuthentication.checkExpirity(
  localStorage.getItem('id_token')
);
const initState = new Map({
  idToken: localToken.token || null
});
export default function authReducer(state = initState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state.set('idToken', action.payload.token);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
