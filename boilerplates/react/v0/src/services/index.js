import rest from 'src/utils/rest';

const path = 'Api/';

export const get = () => rest.get(path);

export const post = () => rest.post(path);

export default {
  get, post
};
