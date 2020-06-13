import { call, put } from '@redux-saga/core/effects';
import { fetchSearchDataSagaWorker } from '../fetch-search-data-worker';
import { getLocalStorageDataSagaWorker } from '../local-storage-module/get-local-storage-data-worker';
import { setSearchDataAction } from '../../actions';

export function* initSearchSagaWorker() {
  try {
    const localStorageSearchData = yield call(getLocalStorageDataSagaWorker, 'searchData');
    if (!Object.keys(localStorageSearchData).length) {
      const newSearchData = yield call(fetchSearchDataSagaWorker);
      yield put(setSearchDataAction(newSearchData));
    } else {
      yield put(setSearchDataAction(localStorageSearchData));
    }
  } catch (error) {
    console.error(error);
  }
}
