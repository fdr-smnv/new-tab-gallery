import { spawn } from '@redux-saga/core/effects';
import { incrementAsyncWatcher } from './modules/count/sagas';
import {
  fetchNewItemsSagaWatcher,
  getLocalStorageDataSagaWatcher,
  initAppSagaWatcher,
  setLocalStorageDataSagaWatcher,
} from './modules/data/sagas';

export function* rootSaga() {
  yield spawn(incrementAsyncWatcher);
  yield spawn(getLocalStorageDataSagaWatcher);
  yield spawn(setLocalStorageDataSagaWatcher);
  yield spawn(initAppSagaWatcher);
  yield spawn(fetchNewItemsSagaWatcher);
}
