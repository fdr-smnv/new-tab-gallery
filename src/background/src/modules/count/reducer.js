import { INCREMENT } from './actions';

const initialState = 0;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case INCREMENT:
      return state + (payload || 1);
    default:
      return state;
  }
};
