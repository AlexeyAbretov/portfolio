export default (a, b) => {
  let result = ((a.price || 0) - (a.discount || 0)) -
    ((b.price || 0) - (b.discount || 0));

  if (result === 0) {
    result = a.name > b.name ? 1 : -1;
  }

  return result;
};
