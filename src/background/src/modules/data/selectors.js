export const getDataStorage = (state) => state.data;
export const getSearchData = (state) => state.data.searchData || {};
export const getCurrentSettings = (state) => state.data.currentSettings || {
  form: 'any', type: 'any', school: 'any', timeline: 'any',
};
