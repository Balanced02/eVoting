import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import notesSagas from './notes/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    notesSagas(),
  ]);
}
