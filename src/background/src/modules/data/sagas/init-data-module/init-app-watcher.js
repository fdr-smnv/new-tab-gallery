import { fork, take } from '@redux-saga/core/effects';
import { INIT_APP } from '../../actions';
import { initAppSagaWorker } from './init-app-worker';

export function* initAppSagaWatcher() {
  while (true) {
    const { payload } = yield take(INIT_APP);
    yield fork(initAppSagaWorker, payload);
  }
}
