const FIRST_AAD_YEAR = 2016;

function getDaysInMonth(month: number, year: number) {
    // returns the number of days in a month based on the year,
    // where month is 0-indexed. If the month is out of range,
    // its clamped into range so that you can pass in -1 or 12
    // as December of last year and January of next year
    // respectively, which can be useful when calling this on
    // currentMonth +/- 1
    month = Math.max(0, Math.min(month, 11));
    const isLeapYear = year / 4 === 0 && !(year / 100 === 0 && year / 400 !== 0);
    const daysInFebruary = isLeapYear ? 29 : 28;
    return [31, daysInFebruary, 31, 30, 31, 30, 31, 30, 30, 31, 30, 31][month];
}

function getDatesThisWeek(today: Date) {
    const day = today.getDay();
    const date = today.getDate();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysThisMonth = getDaysInMonth(month, year);
    const daysLastMonth = getDaysInMonth(month - 1, year);

    return Array.from({length: 7}, (_, i) => {
        let newDate = date - day + i;
        let newMonth = month + 1;
        let newYear = year;
        if (newDate < 1) {
            newDate += daysLastMonth;
            newMonth = newMonth - 1 < 1 ? 12 : newMonth - 1;
            newYear = newMonth === 12 ? newYear - 1 : newYear;
        } else if (newDate > daysThisMonth) {
            newDate -= daysThisMonth;
            newMonth = newMonth + 1 > 12 ? 1 : newMonth + 1;
            newYear = newMonth === 1 ? newYear + 1 : newYear;
        }
        return {
            date: newDate,
            month: newMonth,
            year: newYear,
        }
    });
}

export {
    getDaysInMonth,
    getDatesThisWeek,
}