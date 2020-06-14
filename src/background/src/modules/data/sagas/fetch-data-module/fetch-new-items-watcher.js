import { fork, take } from '@redux-saga/core/effects';
import { FETCH_NEW_ITEMS } from '../../actions';
import { fetchNewItemsSagaWorker } from './fetch-new-items-worker';

export function* fetchNewItemsSagaWatcher() {
  while (true) {
    const { payload } = yield take(FETCH_NEW_ITEMS);
    yield fork(fetchNewItemsSagaWorker, payload);
  }
}
