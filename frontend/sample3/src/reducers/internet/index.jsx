const internet = (state = {}, action) => {
  const newState = {
    ...state
  };
  switch (action.type) {
    case '':
      return newState;
    default:
      return state;
  }
};

export default internet;
