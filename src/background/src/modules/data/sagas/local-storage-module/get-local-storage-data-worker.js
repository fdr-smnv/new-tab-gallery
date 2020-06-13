import { call } from '@redux-saga/core/effects';

export function* getLocalStorageDataSagaWorker(payload) {
  const retrivedData = yield call(() => browser.storage.local.get(payload));
  return retrivedData;
}
