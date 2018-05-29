import state from './state';

const changeServices = (data) => {
  console.log('changeServices', data);
  return { isSucceeded: true, data, result: 12345 };
};

export default {
  addService: changeServices,
  changeTariff: changeServices,
  speedUp: changeServices,
  changeTvPackages: (data) => {
    state.setPackets(data.services[0].packetsIds);

    return changeServices(data);
  },
  changeTvTariff: (data) => {
    state.setCurrentTv(data.services[0].serviceId);

    return changeServices(data);
  }
};
