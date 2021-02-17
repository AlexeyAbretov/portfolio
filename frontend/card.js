import {
    extractNumber,
} from '../string';

/** Проверяет номер карты по указанному алгоритму,
 *  по умолчанию используется алгоритм Лу́на
 *
 * @param{string} value номер карты
 * @param{function} customChecker пользовательская реализация проверки карты
 *
 * @returns{boolean} true - если проверка успешна, иначе false
*/
export const checkCardNumber = ({
    value = '',
    customChecker,
} = {}) => {
    if (typeof customChecker === 'function') {
        return customChecker({
            value,
        });
    }

    if (!value) {
        return false;
    }

    const realCardNumber = extractNumber({
        value,
    });

    if (realCardNumber.length !== 16) {
        return false;
    }

    const sum = realCardNumber
        .split('')
        .reduce((acc, curr, index, arr) => {
            let cardNum = parseInt(curr, 10);

            if ((arr.length - index) % 2 === 0) {
                cardNum *= 2;

                if (cardNum > 9) {
                    cardNum -= 9;
                }
            }

            return acc + cardNum;
        }, 0);

    return sum % 10 === 0;
};
