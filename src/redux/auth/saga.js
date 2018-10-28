import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import { clearToken } from '../../helpers/utility';
import JwtAuthentication from '../../helpers/jwtAuthentication';
import notification from '../../components/notification';
// import { callApi } from '../../utils/index';

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*({ payload }) {
    const { history, userInfo } = payload;
    const result = yield call(JwtAuthentication.login, userInfo);
    if (result.token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: result,
        history
      });
    } else {
      notification('error', result.error || result);
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*({ payload, history }) {
    yield localStorage.setItem('id_token', payload.token);
    history.push('/dashboard');
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*() {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
