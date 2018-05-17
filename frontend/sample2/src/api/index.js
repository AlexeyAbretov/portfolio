const internalFetch = (url, options) => {
    const fetchOptions = { ...options } || {};
    fetchOptions.credentials = 'same-origin';
    fetchOptions.headers = {
        'Content-Type': 'application/json'
    };

    fetchOptions.method = fetchOptions.method || HttpMethod.Post;

    if (fetchOptions.body && typeof (fetchOptions.body) !== 'string') {
        fetchOptions.body = JSON.stringify(fetchOptions.body);
    }

    return fetch(url, fetchOptions)
        .then((response) => {
            if (response.status >= 400) {
                return {};
            }
            return response.json();
        });
};

const HttpMethod = {
    Post: 'POST',
    Get: 'GET'
}

export default {
    getStreets(cityName, cityId, term, url) {
        return internalFetch(
            `${url}?cityName=${cityName}&cityId=${cityId}&term=${term}`,
            { method: HttpMethod.Get });
    },

    getHouses(streetId, term, url) {
        return internalFetch(
            `${url}?streetId=${streetId}&term=${term}`,
            { method: HttpMethod.Get });
    },

    sendRequest(houseId, flat, phone, url) {
        return internalFetch(
            `${url}?houseId=${houseId}&flat=${flat}&phone=${phone}`,
            { method: HttpMethod.Post })
            .then((result) => {
                return {
                    hasError: !result || !result.isSuccess,
                    requestId: (result || {}).requestId
                };
            });
    },

    checkHouseConnection(data) {
        return (data || {}).isConnected || false;
    },

    checkAddress(houseId, flat, url) {
        return internalFetch(
            `${url}?houseId=${houseId}&flat=${flat}`,
            { method: HttpMethod.Get });
    }
};
