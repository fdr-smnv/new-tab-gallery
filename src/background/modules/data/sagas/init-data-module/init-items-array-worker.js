import { call, put } from '@redux-saga/core/effects';
import { getLocalStorageDataSagaWorker } from '../local-storage-module/get-local-storage-data-worker';
import { setItemsArrayAction } from '../../actions';

export function* initItemsArraySagaWorker() {
  try {
    const localStorageItemsArray = yield call(getLocalStorageDataSagaWorker, 'itemsArray');
    if (localStorageItemsArray.length) {
      yield put(setItemsArrayAction(localStorageItemsArray));
    }
  } catch (error) {
    console.error(error);
  }
}
