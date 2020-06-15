import { call } from '@redux-saga/core/effects';

export function* fetchSearchDataSagaWorker() {
  const dataURL = 'https://fdr-smnv.github.io/new-tab-gallery-pages/search.json';
  try {
    const responseData = yield call(() => fetch(dataURL));
    return yield call(() => responseData.json());
  } catch (e) {
    console.error(e);
  }
  return {};
}
