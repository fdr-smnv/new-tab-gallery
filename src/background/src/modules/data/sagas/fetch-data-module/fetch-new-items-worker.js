import { call, put, select } from '@redux-saga/core/effects';
import { getCurrentSettings, getDataStorage, getSearchData } from '../../selectors';
import { newItemPaths } from '../../utils/find-new-items-path';
import {
  setCurrentItemAction,
  setItemsArrayAction,
  setLocalStorageDataSagaAction,
} from '../../actions';

export function* fetchNewItemsSagaWorker() {
  const baseURL = 'https://fdr-smnv.github.io/new-tab-gallery-pages/';
  try {
    const {
      form, type, school, timeline,
    } = yield select(getCurrentSettings);
    const searchData = yield select(getSearchData);

    const pathsCountObject = newItemPaths(searchData, [form, type, school, timeline]);

    const pathsCountKeysRandomIndex = Math.floor(
      Math.random() * Object.keys(pathsCountObject).length,
    );
    const newItemsURL = `${baseURL}${Object.keys(pathsCountObject)[pathsCountKeysRandomIndex]}/index.json`;

    const newItemsResponse = yield call(() => fetch(newItemsURL));
    const newItems = yield call(() => newItemsResponse.json());
    yield put(setItemsArrayAction(newItems));

    const newCurrentItem = newItems[Math.floor(Math.random() * newItems.length)];
    yield put(setCurrentItemAction(newCurrentItem));

    const store = yield select(getDataStorage);
    yield put(setLocalStorageDataSagaAction(store));
  } catch (e) {
    console.error(e);
  }
}
