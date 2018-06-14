/* eslint-disable */

import {
  ServiceTypes,
  SortOrder,
  Groups,
  TvPacketTypes,
  TvPacketSaveStatus,
  OwnershipType,
  InetServiceTypes
} from 'consts';

export default [{
  id: 'preset1',
  name: 'Preset 1',
  isConnected: true,
  fee: 550,
  connectedFee: 1200,
  description: `<div data-title="Общая информация">Подробное описание</div><div data-title="Подключение">Параметр fullDescription сервиса <h2 class="mobile-hidden">FTTB_PRESET</h2><h3>Условия предоствления ТВ-приставки</h3><ol><li>Wi-Fi роутер предоставляется в собственность на условиях, соответствующих выбранному тарифу.</li><li>Оплата осуществляется в соответствии с условиями договора-оферты продажи оборудования. При расторжении договора Абонент обязан погасить остаточную стоимость оборудования.
</li><li>Оплата производится путем списания Оператором суммы, соответствующей выбранному тарифу, с Персонального счета Абонента вместе со списанием Абонентской платы.</li></ol></div>
    <div data-title="Стоимость и оплата">Отображается под заголовком. Должен быть поддержан HTML</div><div data-title="Оборудование">Отображается под заголовком. Должен быть поддержан HTML</div><style>.mobile-hidden{display: none}</style>`,
  services: [{
    fee: 100,
    discount: 0,
    isRequired: false,
    isPreInclude: false,
    isAllow: true,
    isLineHolder: false,
    isTve: false,
    speed: 0,
    speedUp: 0,
    maxSpeed: 0,
    hasGift: false,
    channels: 0,
    packets: [],
    splId: null,
    accumulatorDiscountType: null,
    accumulator: null,
    name: 'NetPhone некон прес 4',
    type: 4,
    id: 'vobb062',
    isConnected: false
  },{
    fee: 40,
    discount: 0,
    isRequired: false,
    isPreInclude: true,
    isAllow: false,
    isLineHolder: false,
    isTve: false,
    speed: 0,
    speedUp: 0,
    maxSpeed: 0,
    hasGift: false,
    channels: 0,
    packets: [],
    splId: null,
    accumulatorDiscountType: null,
    accumulator: null,
    name: 'test OTT 8 устройств',
    type: 12,
    id: 'ott0001',
    isConnected: false
  },{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    fee: 120,
    discount: 20,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false,
    isConnected: true
  },
  {
    id: 'tv1',
    type: ServiceTypes.TvTariff,
    fee: 120,
    discount: 20,
    accumulator: 10,
    channels: 300,
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    isConnected: true,
    hasGift: true,
    packets: [{
      id: 'p1',
      name: 'packet 1',
      channels: 10,
      isConnected: true
    },
    {
      id: 'p2',
      name: 'packet 2',
      channels: 30
    }]
  },
  {
    id: 'wifi1',
    name: 'Wifi-router',
    type: ServiceTypes.WifiRent,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false,
    isConnected: true
  },
  {
    id: 'kav1',
    name: 'Антивирус 1',
    type: ServiceTypes.Kasper,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false,
    isConnected: true,
  },
  {
    id: 'firewall1',
    name: 'Firewall 1',
    type: ServiceTypes.Firewall,
    fee: 250,
  },
  {
    id: 'vsu1',
    name: 'Vsu 1',
    type: ServiceTypes.Vsu,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false,
    isConnected: true,
    speedUp: 40,
    maxSpeed: 200
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isConnected: true
  },
  {
    id: 'console2',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console2 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isConnected: true
  },
  {
    id: 'console3',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console3 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isConnected: false
  }]
},
{
  id: 'preset2',
  name: 'Preset 2',
  fee: 650,
  services: [{
    id: 'phone1',
    type: ServiceTypes.Phone,
    isAllow: true,
    name: 'ДТЦ1'
  },
  {
    id: 'support1',
    name: 'support1',
    type: ServiceTypes.Internet,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: true
  },{
    id: 'inet1',
    name: '---- inet1 --- ',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false
  },
  {
    id: 'tv1',
    type: ServiceTypes.TvTariff,
    fee: 120,
    discount: 20,
    accumulator: 10,
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false
  }]
},
{
  id: 'preset3',
  name: 'Preset 3',
  fee: 150,
  services: [{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false
  },{
    id: 'inet2',
    name: 'inet2',
    type: ServiceTypes.Internet,
    speed: 100,
    nightSpeed: 120,
    internetType: InetServiceTypes.N,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'support1',
    name: 'support1',
    type: ServiceTypes.Internet,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: true
  },
  {
    id: 'tv1',
    type: ServiceTypes.TvTariff,
    channels: 110,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false,
    hasGift: true,
    packets: [{
      id: 'p1',
      name: 'packet 1',
      channels: 10,
      isObligatory: false,
      isPreSelected: false,
      type: TvPacketTypes.Concrete,
      saveStatus: TvPacketSaveStatus.Unknow
    },
    {
      id: 'p2',
      name: 'packet 2',
      channels: 30,
      isObligatory: true,
      isPreSelected: false,
      type: TvPacketTypes.Concrete,
      saveStatus: TvPacketSaveStatus.Unknow
    }]
  },
  {
    id: 'wifi1',
    name: 'Wifi-router',
    type: ServiceTypes.WifiRent,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    connected: true,
    serial: '111111',
    chargeInfo: {
      chargeName: 'разовое списание',
      chargePrice: 100
    },
    ownershipType: OwnershipType.Gift
  },
  {
    id: 'wifi2',
    name: 'Wifi-router 2',
    type: ServiceTypes.WifiRent,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    ownershipType: OwnershipType.Gift
  },
  {
    id: 'wifi3',
    name: 'Wifi-router 3',
    type: ServiceTypes.WifiRent,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    ownershipType: OwnershipType.Buyed
  },
  {
    id: 'wifi4',
    name: 'Wifi-router 4',
    type: ServiceTypes.WifiRent,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: false,
    ownershipType: OwnershipType.Buyed
  },
  {
    id: 'eset1',
    name: 'Антивирус 2',
    type: ServiceTypes.Eset
  },
  {
    id: 'kav1',
    name: 'Антивирус 3',
    type: ServiceTypes.Kasper
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'console2',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console4 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'console3',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console3 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  }]
},
{
  id: 'preset4',
  name: 'Preset 4',
  isConnected: false,
  fee: 1550,
  services: [
    {
      id: 'eset1',
      name: 'Антивирус eset 2',
      type: ServiceTypes.Eset,
      isRequired: false,
      isPreInclude: false,
      isLineHolder: false,
      isAllow: true,
      licenseCount: 10,
      description: 'dsdsdsdsdsd'
    },
    {
      id: 'drweb1',
      name: 'Антивирус drweb 2',
      type: ServiceTypes.DrWeb,
      isRequired: false,
      isPreInclude: false,
      isLineHolder: false,
      isAllow: true,
      licenseCount: 12,
      description: 'dsdsdsdsdsd111'
    },
    {
      id: 'kav1',
      name: 'Антивирус kasper 1',
      type: ServiceTypes.Kasper,
      isRequired: false,
      isPreInclude: false,
      isLineHolder: false,
      isAllow: true,
      licenseCount: 11,
      description: 'dsdsdsdsdsd222'
    },
    {
      id: 'kav2',
      name: 'Антивирус kasper 2',
      type: ServiceTypes.Kasper,
      isRequired: false,
      isPreInclude: false,
      isLineHolder: false,
      isAllow: true,
      licenseCount: 3,
      description: 'dsdsdsdsdsd211122'
    },{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    isVsuAllow: true
  },{
    id: 'inet3',
    name: 'inet3',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    isVsuAllow: true
  },{
    id: 'vsu1',
    name: 'vsu1',
    type: ServiceTypes.Vsu,
    speedUp: 0,
    maxSpeed: 150,
    vsuConnectFee: 10,
    vsuMoveDownFee: 5,
    vsuMoveUpFee: 15
  },{
    id: 'vsu2',
    name: 'vsu2',
    type: ServiceTypes.Vsu,
    speedUp: 10,
    maxSpeed: 150,
    fee: 10,
    vsuConnectFee: 10,
    vsuMoveDownFee: 5,
    vsuMoveUpFee: 15
  },{
    id: 'vsu3',
    name: 'vsu3',
    type: ServiceTypes.Vsu,
    speedUp: 20,
    maxSpeed: 150,
    fee: 20,
    vsuConnectFee: 10,
    vsuMoveDownFee: 5,
    vsuMoveUpFee: 15
  },{
    id: 'vsu6',
    name: 'vsu6',
    type: ServiceTypes.Vsu,
    speedUp: 50,
    maxSpeed: 150,
    fee: 50,
    vsuConnectFee: 10,
    vsuMoveDownFee: 5,
    vsuMoveUpFee: 15
  },{
    id: 'vsu4',
    name: 'vsu4',
    type: ServiceTypes.Vsu,
    speedUp: 30,
    maxSpeed: 150,
    fee: 30,
    vsuConnectFee: 10,
    vsuMoveDownFee: 5,
    vsuMoveUpFee: 15
  },{
    id: 'vsu5',
    name: 'vsu5',
    type: ServiceTypes.Vsu,
    speedUp: 40,
    maxSpeed: 150,
    fee: 40,
    vsuConnectFee: 10,
    vsuMoveDownFee: 5,
    vsuMoveUpFee: 15
  },{
    id: 'vsu7',
    name: 'vsu7',
    type: ServiceTypes.Vsu,
    speedUp: 60,
    maxSpeed: 150,
    fee: 60,
    vsuConnectFee: 10,
    vsuMoveDownFee: 5,
    vsuMoveUpFee: 15
  },{
    id: 'inet4',
    name: 'inet4',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'tv1',
    type: ServiceTypes.TvTariff,
    channels: 110,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    hasGift: false,
    isAllow: true
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    isConnected: false
  }]
},
{
  id: 'preset5',
  name: 'Preset 5',
  fee: 1650,
  services: [{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false
  },
  {
    id: 'wifi1',
    name: 'Wifi-router',
    type: ServiceTypes.WifiRent,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'eset1',
    name: 'Антивирус eset 2',
    type: ServiceTypes.Eset,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    licenseCount: 10,
    description: 'dsdsdsdsdsd'
  },
  {
    id: 'drweb1',
    name: 'Антивирус drweb 2',
    type: ServiceTypes.DrWeb,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    licenseCount: 12,
    description: 'dsdsdsdsdsd111'
  },
  {
    id: 'kav1',
    name: 'Антивирус kasper 1',
    type: ServiceTypes.Kasper,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    licenseCount: 11,
    description: 'dsdsdsdsdsd222'
  },
  {
    id: 'kav2',
    name: 'Антивирус kasper 2',
    type: ServiceTypes.Kasper,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    licenseCount: 3,
    description: 'dsdsdsdsdsd211122'
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    isConnected: false
  }]
},
{
  id: 'preset6',
  name: 'Preset 6',
  isConnected: false,
  fee: 1550,
  services: [{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false
  },
  {
    id: 'vsu1',
    name: 'Vsu',
    type: ServiceTypes.Vsu,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    speedUp: 20,
    maxSpeed: 200,
    isAllow: true
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    isConnected: false
  }]
},
{
  id: 'preset7',
  name: 'Preset 7',
  fee: 1750,
  services: [{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: true
  }, {
    id: 'tv1',
    type: ServiceTypes.TvTariff,
    channels: 39,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: false
  }, {
    id: 'inet2',
    name: 'inet2',
    type: ServiceTypes.Internet,
    speed: 120,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    isConnected: false
  }]
},
{
  id: 'preset8',
  name: 'Preset 8',
  fee: 750,
  services: [{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: true
  }, {
    id: 'tv1',
    type: ServiceTypes.TvTariff,
    channels: 39,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  }]
},
{
  id: 'preset9',
  name: 'Preset 9',
  fee: 751,
  services: [{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: true
  }, {
    id: 'tv1',
    type: ServiceTypes.TvTariff,
    channels: 39,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true,
    isTve: true
  }]
},
{
  id: 'preset10',
  name: 'Preset 10',
  fee: 752,
  services: [{
    id: 'inet1',
    name: 'inet1',
    type: ServiceTypes.Internet,
    speed: 100,
    isRequired: true,
    isPreInclude: false,
    isLineHolder: true
  }, {
    id: 'tv1',
    type: ServiceTypes.TvTariff,
    channels: 39,
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'console1',
    type: ServiceTypes.TvConsole,
    shortDescription: 'console1 short description',
    isRequired: false,
    isPreInclude: false,
    isLineHolder: false,
    isAllow: true
  },
  {
    id: 'firewall1',
    type: ServiceTypes.Firewall,
    isAllow: true,
    name: 'firewall1'
  },
  {
    id: 'staticip1',
    type: ServiceTypes.StaticIp,
    isAllow: true,
    name: 'staticip1'
  },
  {
    id: 'wifi1',
    type: ServiceTypes.Wifi,
    isAllow: false,
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    name: 'wifi1'
  },
  {
    id: 'button1',
    type: ServiceTypes.TurboButton,
    isAllow: false,
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    name: 'button1'
  },
  {
    id: 'button2',
    type: ServiceTypes.TurboButton,
    isAllow: false,
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    name: 'button2'
  },
  {
    id: 'button3',
    type: ServiceTypes.TurboButton,
    isAllow: false,
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    name: 'button3'
  },
  {
    id: 'wifirent1',
    type: ServiceTypes.WifiRent,
    isAllow: false,
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    name: 'wifirent1'
  },
  {
    id: 'wifirent2',
    type: ServiceTypes.WifiRent,
    isAllow: false,
    isRequired: false,
    isPreInclude: true,
    isLineHolder: false,
    name: 'wifirent2'
  }]
}];
