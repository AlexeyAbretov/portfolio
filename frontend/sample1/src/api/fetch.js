export default (url, options) => {
  const fetchOptions = options || {};
  fetchOptions.credentials = 'same-origin';
  fetchOptions.headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };

  fetchOptions.method = fetchOptions.method || 'POST';

  if (fetchOptions.body && typeof (fetchOptions.body) !== 'string') {
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  return fetch(`${url}`, fetchOptions)
      .then((response) => {
        if (response.status >= 400) {
          return {};
        }
        return response.json();
      })
      .then(response => response.view)
      .catch((err) => {
        console.log(err);
        return {};
      });
};
