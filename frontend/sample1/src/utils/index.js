export const format = (...args) => {
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
};

export const getRussianPluralForm = (wordForm = {}, number) => {
  const forms = [
    wordForm.rusFirstPlural || '{0}',
    wordForm.rusSecondPlural || '{0}',
    wordForm.rusThirdPlural || '{0}'
  ];
  
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
};

export const getPluralFormFormatted = (wordForm, number) =>
  format(getRussianPluralForm(wordForm, number), number);

export const clone = source => JSON.parse(JSON.stringify((source || [])));
