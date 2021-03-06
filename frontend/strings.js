import { trim, hasOnlyDigits } from 'utils/string';

/** Проверяет, что строка представляет собой неразрывную
 * последовательность цифр
 *
 * @param {string} value строка
 *
 * @returns {boolean} true - если строка представляет собой неразрывную
 * последовательность цифр, иначе false
 *
 * */
export const isDigitsSequence = ({
    value = '',
} = {}) => {
    const str = trim(value);

    if (!hasOnlyDigits({ value: str })) {
        return false;
    }

    const digits = str.split('');

    for (let i = 0; i < digits.length - 1; i++) {
        if (Math.abs(Number(digits[i + 1]) - Number(digits[i])) !== 1) {
            return false;
        }
    }

    return true;
};

/** Проверяет, что строка содержит одни и теже цифры
 *
 * @param {string} value строка
 *
 * @returns {boolean} true - если содержит одни и теже цифры, иначе false
 *
 * */
export const hasOnlyRepeatingDigits = ({
    value = '',
} = {}) => {
    const str = trim(value);

    if (!hasOnlyDigits({ value: str })) {
        return false;
    }

    return new Set(str.split('')).size === 1;
};

/** Проверяет, что строка содержит только цифры
 *
 * @param {string} value строка
 *
 * @returns {boolean} true - если строка содержит только цифры, иначе false
 *
 * */
export const hasOnlyDigits = ({
    value = '',
} = {}) => /^\d+$/.test(value);

/** Получает из строки число
 *
 * @param {string} value строка
 *
 * @returns {string} строка, содержащая число
 *
 * */
export const extractNumber = ({
    value = '',
} = {}) => {
    if (!value) {
        return value;
    }

    return String(value).replace(/[^\d.-]/g, '');
};
