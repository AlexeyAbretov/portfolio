/** Возвращает список дат по периоду
 *
 * @param {string} startDate дата начала периода
 * @param {string} endDate дата окончания периода
 *
 * @returns {Array<string>} массив дат
 *
*/
export function getDateList({
    endDate = '', startDate = '',
} = {}) {
    if (!startDate || !endDate) {
        return [];
    }

    let dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);

    const result = [];

    if (dateStart === 'Invalid date' || dateEnd === 'Invalid date') {
        return result;
    }

    while (dateEnd >= dateStart) {
        // TODO: вынести в отдельный метод
        result.push(dateStart.toISOString().split('T')[0]);
        dateStart = new Date(
            dateStart
                .getTime() + MillisecondsInDay
        );
    }

    return result;
}
