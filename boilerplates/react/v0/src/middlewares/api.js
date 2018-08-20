const api = args => () => next => (action) => {
  let newAction = action;

  if (action) {
    newAction = {
      ...action,
      api: args.api
    };
  }

  const result = next(newAction);

  return result;
};

export default api;
