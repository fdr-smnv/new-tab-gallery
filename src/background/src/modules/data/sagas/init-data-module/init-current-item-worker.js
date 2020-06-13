import { call, put } from '@redux-saga/core/effects';
import { setCurrentItemAction } from '../../actions';
import { getLocalStorageDataSagaWorker } from '../local-storage-module/get-local-storage-data-worker';

export function* initCurrentItemSagaWorker() {
  try {
    const localStorageCurrentItem = yield call(getLocalStorageDataSagaWorker, 'currentItem');
    if (Object.keys(localStorageCurrentItem).length) {
      yield put(setCurrentItemAction(localStorageCurrentItem));
    }
  } catch (error) {
    console.error(error);
  }
}
