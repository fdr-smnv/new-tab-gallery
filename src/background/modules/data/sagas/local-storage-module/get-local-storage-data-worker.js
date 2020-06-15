import { call } from '@redux-saga/core/effects';

export function* getLocalStorageDataSagaWorker(payload) {
  return yield call(() => browser.storage.local.get(payload));
}
