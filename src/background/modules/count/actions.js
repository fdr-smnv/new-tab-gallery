export const INCREMENT = 'INCREMENT';
export const incrementAction = (payload) => ({
  type: INCREMENT,
  payload,
});

export const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
export const incrementAsyncAction = () => ({
  type: INCREMENT_ASYNC,
});
