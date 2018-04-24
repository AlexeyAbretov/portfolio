const cache = {};
export default (event, params) => {
  const key = event.name + params;
  if (!cache[key]) {
    cache[key] = () => event(...params);
  }
  return cache[key];
};
