const streets = [{
    id: 1,
    cityId: 1,
    label: 'Ленинградское шоссе'
},
{
    id: 2,
    cityId: 1,
    label: 'Ленинградский проспект'
},
{
    id: 3,
    cityId: 1,
    label: 'проспект Мира'
}];

const houses = [{
    id: 1,
    streetId: 3,
    label: '1',
    isConnected: true
},
{
    id: 2,
    streetId: 3,
    label: '20',
    isConnected: false
}];

let checkAddressResult = false;
let hasError = false;

export default {
    getStreets: (cityName, cityId, term, url) => {
        return streets
            .filter(x => x.cityId === cityId &&
                x.label.toLowerCase().indexOf(term.toLowerCase()) !== -1);
    },

    getHouses: (streetId, term, url) => {
        return houses
            .filter(x => x.streetId === streetId &&
                x.label.toLowerCase().indexOf(term.toLowerCase()) !== -1);
    },

    sendRequest(data) {
        const result = hasError;
        hasError = !result;
        return {
            hasError: result,
            requestId: '2222222222222222222'
        };
    },

    checkHouseConnection(data) {
        return (data || {}).isConnected || false;
    },

    checkAddress(data) {
        const result = !checkAddressResult;
        checkAddressResult = result;
        return {
            connectionState: result ? 1 : 0
        };
    }
};
