import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { offline } from '@redux-offline/redux-offline';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import { autoRehydrate } from 'redux-persist';
import { logger } from 'redux-logger';
// import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './redux/sagas';
// import { history } from './'

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware, /*logger*/]; // TODO: Uncomment

// Create Store
export default onCompletion => {
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares), autoRehydrate());
  const store = createStore(reducers, {}, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};
