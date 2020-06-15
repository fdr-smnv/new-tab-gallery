import { applyMiddleware, createStore } from 'redux';
import { wrapStore } from 'webext-redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import { rootSaga } from './sagas';
import { initAppSagaAction } from './modules/data/actions';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);
wrapStore(store);

store.dispatch(initAppSagaAction());

browser.runtime.onMessage.addListener((message) => console.log(message));
