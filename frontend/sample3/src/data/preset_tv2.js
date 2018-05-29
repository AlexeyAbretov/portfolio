import {
  ServiceTypes,
  OwnerShipType,
  TvPacketTypes
} from 'consts';

export default {
  name: '',
  id: 'p00001',
  url: '',

  internet: {
    id: '0',
    name: 'Интернет-тариф Новый',
    icon: 'http://static.vendordev.ru/upload/images/home/profile/internet.png',
    speedIn: 100.0,
    speedOut: 200.0,
    speedUp: 100.0,
    servicesCount: 2,
    fee: 100,
    fullFee: 250,
    benefit: 'Интернет-тариф Новый Бенефит',
    speed: 200
  },

  vsu: {
    id: 'vsu4',
    benefit: `Без проблем позволит максимально увеличить скорость вашего тарифного плана в любое время без смены
    текущего тарифного плана. Стоимость услуги 60 руб./мес. за каждый шаг в 50 Мбит/с.`,
    name: 'Услуга "Увеличение скорости',
    fee: 180,
    value: 190,
    splId: 9526275
  },

  tv: {
    id: 'tv2',
    name: 'Домашнее тв за 100',
    icon: 'http://static.vendordev.ru/upload/images/home/profile/tv.png',
    channelsCount: 10,
    fee: 110,
    type: ServiceTypes.TvTariff,
    benefit: 'Бенефит Домашнее тв за 100',
    groups: [{
      id: 1,
      name: 'Группа 1',
    },
    {
      id: 2,
      name: 'Группа 2',
    }],
    packages: [{
      id: '1',
      groupId: 1,
      title: 'Детский',
      channels: 10,
      fee: 100,
      connected: true,
      type: TvPacketTypes.Concrete
    },
    {
      id: '2',
      groupId: 1,
      title: 'Кино',
      channels: 20,
      fee: 200,
      connected: false,
      type: TvPacketTypes.Concrete
    },
    {
      id: '3',
      groupId: 1,
      title: 'Спорт',
      channels: 30,
      fee: 300,
      connected: true,
      type: TvPacketTypes.Concrete
    },
    {
      id: '11',
      groupId: 2,
      title: 'Подписка Детский',
      channels: 10,
      fee: 100,
      connected: true,
      isSubscription: true,
      type: TvPacketTypes.Concrete
    },
    {
      id: '21',
      groupId: 2,
      title: 'Подписка Кино',
      channels: 20,
      fee: 200,
      connected: false,
      isSubscription: true,
      type: TvPacketTypes.Concrete
    },
    {
      id: '31',
      groupId: 2,
      title: 'Подписка Спорт',
      channels: 30,
      fee: 100,
      connected: false,
      isSubscription: true,
      type: TvPacketTypes.Concrete
    },
    {
      id: '41',
      groupId: 2,
      title: 'Подписка Спорт+',
      channels: 30,
      fee: 300,
      connected: false,
      isSubscription: true,
      type: TvPacketTypes.Concrete
    },
    {
      id: '51',
      groupId: 2,
      title: 'Подписка 1 Спорт',
      channels: 30,
      fee: 300,
      connected: false,
      isSubscription: true,
      type: TvPacketTypes.Concrete
    }]
  },

  items: [{
    id: 'inet1',
    title: 'Домашний инет за 500',
    value: 40,
    fee: 500,
    type: ServiceTypes.Internet,
    benefit: '',
    ownerShipType: null,
    installmentDate: ''
  }, {
    id: 'inet2',
    title: 'Домашний инет за 600',
    value: 100,
    fee: 600,
    type: ServiceTypes.Internet,
    benefit: '',
    ownerShipType: null,
    installmentDate: ''
  }, {
    id: 'inet3',
    title: 'Домашний инет за 700',
    value: 120,
    fee: 700,
    type: ServiceTypes.Internet,
    benefit: '',
    ownerShipType: null,
    installmentDate: ''
  }, {
    id: 'vsu1',
    title: '',
    value: 100,
    fee: 60,
    type: ServiceTypes.Vsu,
    benefit: '',
    ownerShipType: null,
    installmentDate: ''
  }, {
    id: 'vsu2',
    title: '',
    value: 150,
    fee: 120,
    type: ServiceTypes.Vsu,
    benefit: '',
    ownerShipType: null,
    installmentDate: ''
  }, {
    id: 'vsu3',
    title: '',
    value: 200,
    fee: 210,
    type: ServiceTypes.Vsu,
    benefit: '',
    ownerShipType: null,
    installmentDate: ''
  }, {
    id: 'vsu4',
    title: '',
    value: 190,
    fee: 180,
    type: ServiceTypes.Vsu,
    benefit: '',
    ownerShipType: null,
    installmentDate: '',
    splId: 9526275
  }, {
    id: 'staticIp1',
    title: 'Фиксированный IP-адрес',
    value: '',
    fee: 150,
    type: ServiceTypes.StaticIp,
    benefit: 'Постоянный адрес в интернете, который закреплен за вашим логином',
    ownerShipType: null,
    installmentDate: '',
    connected: true
  }, {
    id: 'kasper1',
    title: 'Kaspersky Anti-Virus (1 ПК)',
    value: '',
    fee: 99,
    type: ServiceTypes.Kasper,
    benefit: 'Решение для базовой защиты компьютера от основных видов интернет-угроз',
    ownerShipType: null,
    installmentDate: '',
    connected: false,
    description: 'Описание услуги, Описание услуги, Описание услуги, Описание услуги, Описание услуги'
  }, {
    id: 'eset1',
    title: 'ESET NOD32 Антивирус (3 ПК)',
    value: '',
    fee: 89,
    type: ServiceTypes.Eset,
    benefit: 'Надежное решение для максимальной защиты в сети интернет',
    ownerShipType: null,
    installmentDate: '',
    connected: false,
    description: 'Описание услуги, Описание услуги, Описание услуги, Описание услуги, Описание услуги'
  }, {
    id: 'wifirent1',
    title: 'Vendor SmartBox',
    value: '',
    fee: 100,
    type: ServiceTypes.WifiRent,
    benefit: '',
    ownerShipType: OwnerShipType.Rent,
    mac: '09:25:17:91:AB:01',
    serial: '12347',
    installmentDate: '',
    connected: false
  }, {
    id: 'wifirent2',
    title: 'Vendor SmartBox',
    value: '',
    fee: 100,
    type: ServiceTypes.WifiRent,
    benefit: '',
    ownerShipType: OwnerShipType.Buy,
    mac: '09:25:17:91:AB:02',
    serial: '79133',
    installmentDate: '25.01.2018',
    connected: true
  }, {
    id: 'wifirent3',
    title: 'Vendor SmartBox',
    value: '',
    fee: 0,
    type: ServiceTypes.WifiRent,
    benefit: '',
    ownerShipType: OwnerShipType.Buy,
    mac: '09:25:17:91:AB:03',
    serial: '13678',
    installmentDate: '',
    connected: false
  }, {
    id: 'tv1',
    title: 'Домашнее тв за 200',
    value: 10,
    fee: 210,
    type: ServiceTypes.TvTariff,
    benefit: 'Бенефит Домашнее тв за 200',
    ownerShipType: null
  }, {
    id: '1',
    title: 'Тв-тариф Новый',
    type: ServiceTypes.TvTariff,
    fee: 100,
    value: 2
  }, {
    id: 'tv2',
    title: 'Домашнее тв за 100',
    value: 20,
    fee: 110,
    type: ServiceTypes.TvTariff,
    benefit: 'Бенефит Домашнее тв за 100',
    ownerShipType: null,
    inFttbPreset: true,
    connected: true,
    splId: 666
  }, {
    id: 'return1',
    title: 'Возврат эфира',
    connected: false,
    value: 0,
    fee: 10,
    type: ServiceTypes.ReturnEther,
    benefit: 'Возврат эфира бенефит',
    ownerShipType: null
  }, {
    id: 'console1',
    title: 'Тв-приставка ТВ-Вох 1',
    value: 0,
    fee: 10,
    type: ServiceTypes.TvConsole,
    mac: '111:777:777:222'
  }, {
    id: 'console2',
    title: 'Тв-приставка ТВ-Вох 2',
    value: 0,
    fee: 0,
    type: ServiceTypes.TvConsole,
    mac: '777:777:777:777'
  }, {
    id: 'console3',
    title: 'Тв-приставка ТВ-Вох 3',
    value: 0,
    fee: 120,
    type: ServiceTypes.TvConsole,
    inFttbPreset: true,
    connected: true,
    mac: ''
  }, {
    id: 'console4',
    title: 'Тв-приставка ТВ-Вох 4',
    value: 0,
    fee: 120,
    type: ServiceTypes.TvConsole,
    inFttbPreset: true,
    connected: true,
    mac: ''
  }, {
    id: 'console5',
    title: 'Тв-приставка ТВ-Вох 5',
    value: 0,
    fee: 120,
    type: ServiceTypes.TvConsole,
    inFttbPreset: true,
    connected: true,
    mac: ''
  },
  {
    id: 'Multiroom1',
    title: 'ТMultiroom 1',
    value: 0,
    fee: 120,
    type: ServiceTypes.Multiroom,
    inFttbPreset: true,
    connected: true
  }, {
    id: 'multiroom',
    title: 'Мультирум',
    value: '',
    fee: 0,
    type: ServiceTypes.Multiroom,
    benefit: 'Подключите «Билайн» ТВ до 4-х телевизоров в одной квартире',
    ownerShipType: null,
    connected: false
  }]
};
