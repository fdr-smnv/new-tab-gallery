import { fork, take } from '@redux-saga/core/effects';
import { SET_LOCAL_STORAGE_DATA } from '../../actions';
import { setLocalStorageDataSagaWorker } from './set-local-storage-data-worker';

export function* setLocalStorageDataSagaWatcher() {
  while (true) {
    const { payload } = yield take(SET_LOCAL_STORAGE_DATA);
    yield fork(setLocalStorageDataSagaWorker, payload);
  }
}
