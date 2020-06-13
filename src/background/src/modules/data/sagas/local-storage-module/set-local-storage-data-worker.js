import { call } from '@redux-saga/core/effects';

export function* setLocalStorageDataSagaWorker(payload) {
  yield call(() => browser.storage.local.set(payload));
  console.log('Data set!');
}
