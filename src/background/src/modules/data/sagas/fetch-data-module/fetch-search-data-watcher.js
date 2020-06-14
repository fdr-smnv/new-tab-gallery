import { fork, take } from '@redux-saga/core/effects';
import { FETCH_SEARCH_DATA } from '../../actions';
import { fetchSearchDataSagaWorker } from './fetch-search-data-worker';

export function* fetchSearchDataSagaWatcher() {
  while (true) {
    const { payload } = yield take(FETCH_SEARCH_DATA);
    yield fork(fetchSearchDataSagaWorker, payload);
  }
}
