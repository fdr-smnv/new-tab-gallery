import { all, select, spawn } from '@redux-saga/core/effects';
import { initItemsArraySagaWorker } from './init-items-array-worker';
import { initCurrentItemSagaWorker } from './init-current-item-worker';
import { initSearchSagaWorker } from './init-search-worker';
import { initCurrentSettingsSagaWorker } from './init-current-settings-worker';

export function* initAppSagaWorker() {
  try {
    yield all([
      spawn(initSearchSagaWorker),
      spawn(initCurrentSettingsSagaWorker),
      spawn(initCurrentItemSagaWorker),
      spawn(initItemsArraySagaWorker),
    ]);
    console.log(yield select());
  } catch (error) {
    console.error(error);
  }
}
