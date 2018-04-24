import {
  ServiceTypes
} from 'consts';

export const notSetServices = null;

export const emptyServices = {
  items: []
};

export const notConnectedServices = {
  services: {
    items: [{
      type: ServiceTypes.Kit,
      isConnected: false,
      name: 'Пакет 1',
      url: 'http://ddddd'
    }, {
      type: ServiceTypes.Internet,
      isConnected: false
    }, {
      type: ServiceTypes.TvTariff,
      isConnected: false
    }]
  }
};

export const kitConnectedServices = {
  services: {
    items: [{
      type: ServiceTypes.Kit,
      isConnected: true,
      name: 'Пакет 1',
      url: 'http://ddddd'
    }, {
      type: ServiceTypes.Internet,
      isConnected: false
    }, {
      type: ServiceTypes.TvTariff,
      isConnected: false
    }]
  }
};

export const otherConnectedServices = {
  services: {
    items: [{
      type: ServiceTypes.Kit,
      isConnected: false,
      name: 'Пакет 1',
      url: 'http://ddddd'
    }, {
      type: ServiceTypes.Internet,
      isConnected: true
    }, {
      type: ServiceTypes.TvTariff,
      isConnected: false
    }]
  }
};

