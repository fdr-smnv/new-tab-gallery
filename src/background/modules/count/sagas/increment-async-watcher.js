import { fork, take } from '@redux-saga/core/effects';
import { INCREMENT_ASYNC } from '../actions';
import { incrementAsyncWorker } from './increment-async-worker';

export function* incrementAsyncWatcher() {
  while (true) {
    const { payload } = yield take(INCREMENT_ASYNC);
    yield fork(incrementAsyncWorker, payload);
  }
}
