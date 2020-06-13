export const SET_CURRENT_SETTINGS = 'SET_CURRENT_SETTINGS';
export const setCurrentSettingsAction = (payload) => ({
  type: SET_CURRENT_SETTINGS,
  payload,
});

export const SET_CURRENT_ITEM = 'SET_CURRENT_ITEM';
export const setCurrentItemAction = (payload) => ({
  type: SET_CURRENT_ITEM,
  payload,
});

export const SET_ITEMS_ARRAY = 'SET_ITEMS_ARRAY';
export const setItemsArrayAction = (payload) => ({
  type: SET_ITEMS_ARRAY,
  payload,
});

export const SET_SEARCH_DATA = 'SET_SEARCH_DATA';
export const setSearchDataAction = (payload) => ({
  type: SET_SEARCH_DATA,
  payload,
});

export const FETCH_NEW_ITEMS = 'FETCH_NEW_ITEMS';
export const fetchNewItemsSagaAction = (payload) => ({
  type: FETCH_NEW_ITEMS,
  payload,
});

export const FETCH_SEARCH_DATA = 'FETCH_SEARCH_DATA';
export const fetchSearchDataSagaAction = () => ({
  type: FETCH_SEARCH_DATA,
});

export const INIT_APP = 'INIT_APP';
export const initAppSagaAction = () => ({
  type: INIT_APP,
});

export const GET_LOCAL_STORAGE_DATA = 'GET_LOCAL_STORAGE_DATA';
export const getLocalStorageDataSagaAction = (payload) => ({
  type: GET_LOCAL_STORAGE_DATA,
  payload,
});

export const SET_LOCAL_STORAGE_DATA = 'SET_LOCAL_STORAGE_DATA';
export const setLocalStorageDataSagaAction = (payload) => ({
  type: SET_LOCAL_STORAGE_DATA,
  payload,
});
