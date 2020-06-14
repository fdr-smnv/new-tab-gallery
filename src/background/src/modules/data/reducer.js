import {
  SET_CURRENT_ITEM,
  SET_CURRENT_SETTINGS,
  SET_ITEMS_ARRAY,
  SET_SEARCH_DATA,
  UPDATE_SEARCH_SELECT_DATA,
} from './actions';

const initialState = {
  currentSettings: {},
  currentItem: {},
  itemsArray: [],
  searchData: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_SETTINGS:
      return {
        ...state,
        currentSettings: payload,
      };
    case SET_CURRENT_ITEM:
      return {
        ...state,
        currentItem: payload,
      };
    case SET_ITEMS_ARRAY:
      return {
        ...state,
        itemsArray: payload,
      };
    case SET_SEARCH_DATA:
      return {
        ...state,
        searchData: payload,
      };
    case UPDATE_SEARCH_SELECT_DATA: {
      const { value, settingsField } = payload;
      return {
        ...state,
        currentSettings: { ...state.currentSettings, [settingsField]: value },
      };
    }
    default:
      return state;
  }
};
