import moment from 'moment';
import numeral from 'numeral';

import {
  Locales,
  DateMeasure,
  ServiceTypes,
  DataTypes,
  SortDirection,
  OperationStatus
} from 'consts';

numeral.register('locale', Locales.Ru, {
  delimiters: {
    thousands: ' ',
    decimal: ','
  },
  abbreviations: {
    thousand: 'тыс.',
    million: 'млн.',
    billion: 'млрд.',
    trillion: 'трлн.'
  },
  ordinal() {
    // not ideal, but since in Russian it can taken on
    // different forms (masculine, feminine, neuter)
    // this is all we can do
    return '.';
  },
  currency: {
    symbol: 'руб.'
  }
});

/* eslint-disable */
const decimal = {
  base: 1048576,
  suffixes: ['МБ']
};

const allSuffixes = decimal.suffixes;

let unformatRegex = allSuffixes.join('|');
unformatRegex = `(${unformatRegex.replace('МБ', 'МБ(?!PS)')})`;

numeral.register('format', 'bytes2', {
  regexps: {
    format: /([0\s]МБ)/,
    unformat: new RegExp(unformatRegex)
  },

  format: function (value, format, roundingFunction) {
    let output,
      bytes = decimal,
      suffix = numeral._.includes(format, ' МБ') ? ' ' : '',
      power,
      min,
      max;

    format = format.replace(/\s?МБ/, '');

    value = value / bytes.base;

    if (value <= 0.1) {
      value = 0;
    }

    suffix += bytes.suffixes[0];

    output = numeral._.numberToFormat(value, format, roundingFunction);

    return output + suffix;
  },

  unformat: function (string) {
    return string;
  }
});

numeral.register('format', 'time2', {
  regexps: {
    format: /(врм)/,
    unformat: /(врм)/
  },

  format: function (value, format, roundingFunction) {
    let hours = Math.floor(value / 60 / 60),
      minutes = Math.floor((value - (hours * 60 * 60)) / 60),
      seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

    let result = '';
    if (hours) {
      return `${hours} ч. ${minutes} мин. ${seconds} сек.`;
    } else {
      return `${minutes} мин. ${seconds} сек.`;
    }

    return;
  },

  unformat: function (string) {
    return string;
  }
});

/* eslint-enable */

export default class Utils {
  static formatDate(val, format, locale = Locales.Ru) {
    if (!format || !val) {
      return val;
    }

    moment.locale(locale);

    const date = moment(val);

    const result = date.format(format);

    return result;
  }

  static formatNum(val, format, locale = Locales.Ru) {
    if (!format || !val) {
      return val;
    }

    numeral.locale(locale);

    const num = numeral(val);

    const result = num.format(format);

    return result;
  }

  static stringToDateTime(str, locale = Locales.Ru) {
    moment.locale(locale);

    const date = moment(str);

    return date;
  }

  static addSeconds(str, seconds, locale = Locales.Ru) {
    moment.locale(locale);

    let date = moment(str);

    date = date.add(seconds, 's');

    return date;
  }

  static today(offset = 0, locale = Locales.Ru, type = DateMeasure.Day) {
    moment.locale(locale);

    return moment().add(offset, type);
  }

  static getNameByServiceType(type) {
    switch (type) {
      case ServiceTypes.Internet:
        return 'Интернет';
      default:
        return '';
    }
  }

  static sort(items, sortOrder, prop, type, locale) {
    const result = items.sort((a, b) => {
      const first = Utils.getTypedValue(a, prop, type, locale);
      const second = Utils.getTypedValue(b, prop, type, locale);

      if (sortOrder === SortDirection.Ascending) {
        if (first > second) {
          return 1;
        }

        return first < second ? -1 : 0;
      }

      if (first < second) {
        return 1;
      }

      return first > second ? -1 : 0;
    });

    return result;
  }

  static getValue(data, prop, type, format, locale) {
    let val = data[prop];

    if (type === DataTypes.DateTime && format) {
      val = Utils.formatDate(val, format, locale);
    } else if (type === DataTypes.Numeric && format) {
      val = Utils.formatNum(val, format, locale);
    }

    return val;
  }

  static getTypedValue(data, prop, type, locale) {
    const val = data[prop];

    if (type === DataTypes.DateTime) {
      return Utils.stringToDateTime(val, locale);
    }

    return val;
  }

  static getMonth(val) {
    const date = Utils.stringToDateTime(val);
    if (date) {
      return (date.month() + 1);
    }

    return -1;
  }

  static format(...args) {
    const params = [];
    for (let i = 0; i < (args.length - 0); i += 1) {
      params[i] = args[i + 0];
    }
    if (params.length === 0 || typeof params[0] !== 'string') {
      throw new Error('Invalid arguments!');
    }
    const str = params[0];
    const origArgs = params;
    return str.replace(/\{(\d+)\}/g, (whole, m) => {
      const ind = parseInt(m, 10) + 1;
      if (ind >= origArgs.length) {
        throw new Error('Invalid arguments!');
      }
      return origArgs[ind];
    });
  }

  static getRussianPluralForm(wordForm, number) {
    const forms = [wordForm.rusFirstPlural, wordForm.rusSecondPlural, wordForm.rusThirdPlural];
    let num = number;
    if (num < 0) {
      num *= -1;
    }

    if (num % 10 === 1 &&
      number % 100 !== 11) {
      return forms[0];
    }

    if (number % 10 >= 2 &&
      number % 10 <= 4 &&
      (number % 100 < 10 || number % 100 >= 20)) {
      return forms[1];
    }

    return forms[2];
  }

  static getPluralFormFormatted(wordForm, number) {
    return Utils.format(Utils.getRussianPluralForm(wordForm, number), number);
  }

  static getLoginTitleString(val = '') {
    let title;
    if (val.indexOf('FTTB/') >= 0 || (val.match(/^0[0-9]{9}$/g))) {
      title = val.replace('FTTB/', '');
      if (title.match(/^[0-9]{10}$/g)) {
        title = `${title.substr(0, 3)}-${title.substr(3, 3)}-${title.substr(6, 4)}`;
      }
    } else if (val.match(/^9[0-9]{9}$/g)) {
      title = `+7 ${val.substr(0, 3)} ${
        val.substr(3, 3)}-${
        val.substr(6, 2)}-${
        val.substr(8, 2)}`;
    } else {
      title = val;
    }
    return title;
  }

  static parsePhone(phone) {
    if (!phone) {
      return { phoneCode: '', phoneNumber: '' };
    }
    const phoneCode = phone.substring(0, 3);
    const phoneNumber = phone.substring(3);
    return { phoneCode, phoneNumber };
  }

  static combinePhone(phone) {
    if (!phone) {
      return '';
    }
    const phoneNumber = phone.phoneNumber.replace(/-/g, '');
    return phone.phoneCode + phoneNumber;
  }

  static formatPhone(phone) {
    if (!phone) {
      return '';
    }

    if (phone.length === 10) {
      return Utils.format('+7 {0} {1}-{2}-{3}',
        phone.substr(0, 3),
        phone.substr(3, 3),
        phone.substr(6, 3),
        phone.substr(8, 2));
    }

    return phone;
  }

  static confirmPopup(message, textOk, textCancel, funcOk) {
    const commonPopup = document.getElementById('commonPopup');
    commonPopup.style.display = 'block';
    commonPopup.classList.remove('hidden');
    const scrollY = window.scrollY;
    window.scrollTo(0, scrollY + 1);
    window.scrollTo(0, scrollY);
    const popupContent = commonPopup.querySelector('div[id=popup-content]');
    popupContent.innerHTML = `
    <div class="widgetPlatformPopup">
      <span class="popup-close">Закрыть</span>
      <h4>
        <strong>${message}</strong>
      </h4>
      <div class="form-line" style="text-align:center;">
        <a href="javascript:void(0)" class="btn-link" style="position: relative;width: 50px;margin: 0 auto;">
          ${textOk}
        </a>
        <a href="javascript:void(0)" class="dynamic officina" style="margin-left:22px;">${textCancel}</a>
      </div>
    </div>
    `;
    const close = () => {
      commonPopup.style.display = 'none';
      commonPopup.classList.add('hidden');
    };
    popupContent.querySelector('span[class=popup-close]').addEventListener('click', close);
    popupContent.querySelector('a[class="dynamic officina"]').addEventListener('click', close);
    popupContent.querySelector('a[class=btn-link]').addEventListener('click', () => {
      funcOk();
      close();
    });
  }

  static getAwaiterMessage(status, message) {
    switch (status) {
      case OperationStatus.Pending:
        return message.Loading;
      case OperationStatus.Success:
        return message.Success;
      case OperationStatus.Fail:
        return message.Error;
      default:
        return '';
    }
  }
}
