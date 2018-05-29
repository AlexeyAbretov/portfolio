export default {
  currentTv: '1',
  packets: [],

  setCurrentTv(id) {
    this.currentTv = id;
  },

  setPackets(ids) {
    this.packets = [
      ...ids
    ];
  }
};
