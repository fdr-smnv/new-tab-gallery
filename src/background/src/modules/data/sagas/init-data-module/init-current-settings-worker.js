import { call, put } from '@redux-saga/core/effects';
import { getLocalStorageDataSagaWorker } from '../local-storage-module/get-local-storage-data-worker';
import { setCurrentSettingsAction } from '../../actions';

export function* initCurrentSettingsSagaWorker() {
  try {
    const localStorageCurrentSettings = yield call(getLocalStorageDataSagaWorker, 'currentSettings');
    if (Object.keys(localStorageCurrentSettings).length) {
      yield put(setCurrentSettingsAction(localStorageCurrentSettings));
    }
  } catch (error) {
    console.error(error);
  }
}
