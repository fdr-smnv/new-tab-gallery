import { fork, take } from '@redux-saga/core/effects';
import { GET_LOCAL_STORAGE_DATA } from '../../actions';
import { getLocalStorageDataSagaWorker } from './get-local-storage-data-worker';

export function* getLocalStorageDataSagaWatcher() {
  while (true) {
    const { payload } = yield take(GET_LOCAL_STORAGE_DATA);
    yield fork(getLocalStorageDataSagaWorker, payload);
  }
}
