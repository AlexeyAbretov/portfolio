export const nameSort = (a, b) => (a.name > b.name ? 1 : -1);

export const priceSort = (a, b) => {
  let result = ((a.fee || 0) - (a.discount || 0)) -
    ((b.fee || 0) - (b.discount || 0));

  if (result === 0) {
    result = nameSort(a, b);
  }

  return result;
};
