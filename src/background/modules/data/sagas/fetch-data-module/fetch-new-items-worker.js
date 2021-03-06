import { call, put, select } from '@redux-saga/core/effects';
import { getItemImageUrl } from '@background/modules/data/utils/get-item-image-url';
import { getCurrentSettings, getDataStorage, getSearchData } from '../../selectors';
import { newItemPaths } from '../../utils/find-new-items-path';
import {
  setCurrentItemAction,
  setItemsArrayAction,
  setLocalStorageDataSagaAction,
} from '../../actions';

const getImageDimensionsHelper = (url) => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => {
    const { naturalWidth: width, naturalHeight: height } = img;
    resolve({ width, height });
  };
  img.onerror = () => {
    reject(new Error('There was some problem with the image.'));
  };
  img.src = url;
});

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
    newCurrentItem.imageURL = getItemImageUrl(newCurrentItem.url);
    newCurrentItem.dimensions = yield call(() => getImageDimensionsHelper(newCurrentItem.imageURL));
    yield put(setCurrentItemAction(newCurrentItem));

    const store = yield select(getDataStorage);
    yield put(setLocalStorageDataSagaAction(store));
  } catch (e) {
    console.error(e);
  }
}
