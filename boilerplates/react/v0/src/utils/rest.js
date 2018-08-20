import axios from 'axios';

/**
 * Базовые настройки запросов
 */
const baseConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
};

/**
 * Экземпляр модуля запросов с базовыми параметрами
 */
const instance = axios.create(baseConfig);

/**
 * Перехват запросов для кастомной логики
 */
instance.interceptors.response.use(
  response => response,
  (error) => {
    switch (error.response.status) {
      case 401:
      case 403:
        console.log('redirect to login');

        window.location.href = '/Login';
        return undefined;
      default:
        return Promise.reject(error);
    }
  }
);

/**
 * Обработка успешного ответа
 *
 * @param {object} response объект ответа
 */
const onSuccess = (response) => {
  console.debug('Request Successful!', response);

  return {
    status: response.status,
    data: response.data
  };
};

/**
 * Обработка ошибки запроса
 *
 * @param {object} error объект ошибки
 */
const onError = (error) => {
  console.error('Request Failed:', error.config);

  if (error.response) {
    // Request was made but server responded with something
    // other than 2xx
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);
  } else {
    // Something else happened while setting up the request
    // triggered the error
    console.error('Error Message:', error.message);
  }

  return Promise.reject(error.response || error.message);
};

/**
 * Запрос get
 *
 * @param {string} url ссылка
 * @param {object} params параметры
 *
 * @returns Promise
 */
const get = ({ url, params = {} } = {}) => {
  const config = {
    ...baseConfig,
    params
  };

  return instance
    .get(url, config)
    .then(onSuccess)
    .catch(onError);
};

/**
 * Запрос post
 *
 * @param {string} url ссылка
 * @param {object} params параметры
 *
 * @returns Promise
 */
const post = ({ url, params = {} } = {}) => instance
  .post(url, params, baseConfig)
  .then(onSuccess)
  .catch(onError);

/**
 * Запрос put
 *
 * @param {string} url ссылка
 * @param {object} params параметры
 *
 * @returns Promise
 */
const put = ({ url, params = {} } = {}) => instance
  .put(url, params, baseConfig)
  .then(onSuccess)
  .catch(onError);

/**
 * Запрос delete
 *
 * @param {string} url ссылка
 * @param {object} params параметры
 *
 * @returns Promise
 */
const del = ({ url, params = {} } = {}) => {
  const config = {
    ...baseConfig,
    params
  };

  return instance
    .delete(url, config)
    .then(onSuccess)
    .catch(onError);
};

/**
 * Эскпортирует методы запросов
 */
export default {
  /** Запрос get */
  get,

  /** Запрос post */
  post,

  /** Запрос put */
  put,

  /** Запрос delete */
  del
};
