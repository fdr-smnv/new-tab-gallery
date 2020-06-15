import { delay } from '@redux-saga/core/effects';
import { put } from 'redux-saga/effects';
import { incrementAction } from '../actions';

export function* incrementAsyncWorker() {
  yield delay(1000);
  yield put(incrementAction());
}
