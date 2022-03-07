const FIRST_AAD_YEAR = 2016;

type FullNuDateFormat = 'y-m-d' | 'm/d/y';
type PartialNuDateFormat = 'm d';
type NuDateFormat = FullNuDateFormat | PartialNuDateFormat;

type NuDateRelativeDistance = `${number}d` | `${number}w` | `${number}m` | `${number}y`;
type NuDateRelativeRange = { start: NuDateRelativeDistance, end: NuDateRelativeDistance };

class NuDate extends Date {
    static translateFormattedString(
        formattedString: string,
        fromFormat: FullNuDateFormat,
        toFormat: FullNuDateFormat
    ): string | null {
        let regExpString;
        const dayExp = '(?<day>(3[01])|([12][0-9])|[1-9])';
        const monthExp = '(?<month>(1[0-2])|[1-9])';
        const yearExp = '(?<year>[0-9]{1,4})';
        switch(fromFormat) {
            case 'y-m-d':
                regExpString = `${yearExp}-${monthExp}-${dayExp}`;
                break;
            case 'm/d/y':
                regExpString = `${monthExp}/${dayExp}/${yearExp}`;
                break;
            default:
                return null;
        }
        const regExp = new RegExp(regExpString);
        const match = formattedString.match(regExp);
        if (match === null) {
            return null;
        }
        const {day, month, year} = match.groups;
        return NuDate.getFormattedString(
            parseInt(day),
            parseInt(month) - 1,
            parseInt(year),
            toFormat
        );
    }

    static getFormattedString(
        day: number,
        month: number,
        year: number,
        format: NuDateFormat
    ): string {
        return new NuDate(year, month - 1, day).toFormattedString(format);
    }

    static parseDateDistance(
        distance: NuDateRelativeDistance
    ): {number: number, unit: string, isNegative: boolean} {
        const regExpString = '(?<number>-?[0-9]+)(?<unit>)[dmy]';
        const regExp = new RegExp(regExpString);
        const match = distance.match(regExp);
        if (match === null) {
            return null;
        }
        const rawNumber = match.groups.number;
        return {
            number: parseInt(rawNumber),
            unit: match.groups.unit,
            isNegative: rawNumber.startsWith('-'),
        };
    }

    clone(): NuDate {
        return new NuDate(this.getFullYear(), this.getMonth(), this.getDate());
    }

    isEqual(other: NuDate): boolean {
        if (this.getFullYear() !== other.getFullYear()) {
            return false;
        }
        if (this.getMonth() !== other.getMonth()) {
            return false;
        }
        if (this.getDate() !== other.getDate()) {
            return false;
        }
        return true
    }

    isLessThan(other: NuDate): boolean {
        if (this.getFullYear() !== other.getFullYear()) {
            return this.getFullYear() < other.getFullYear();
        }
        if (this.getMonth() !== other.getMonth()) {
            return this.getMonth() < other.getMonth();
        }
        if (this.getDate() !== other.getDate()) {
            return this.getDate() < other.getDate();
        }
        return true;
    }

    toFormattedString(format: NuDateFormat): string {
        const day = this.getDate();
        const month = this.getMonth() + 1;
        const year = this.getFullYear();
        switch(format) {
            case 'y-m-d':
                return `${year}-${month}-${day}`;
            case 'm/d/y':
                return `${month}/${day}/${year}`;
            default:
                return null;
        }
    }

    getDateFromDistance(distance: NuDateRelativeDistance): NuDate | null {
        const parsedDistance = NuDate.parseDateDistance(distance);
        if (parsedDistance === null) {
            return null;
        }
        const {number, unit, isNegative} = parsedDistance;
        let newDate = this.clone();
        switch(unit) {
            case 'd':
                newDate.setDate(newDate.getDate() + number);
                break;
            case 'w':
                // adjust the current date to the first or last day of the week
                if (isNegative) {
                    newDate.setDate(newDate.getDate() - newDate.getDay());
                } else {
                    newDate.setDate(newDate.getDate() + (6 - newDate.getDay()));
                }
                newDate.setDate(newDate.getDate() + (7 * number));
                break;
            case 'm':
                newDate.setMonth(newDate.getMonth() + number);
                break;
            case 'y':
                newDate.setMonth(newDate.getMonth() + number);
                break;
        }
        return newDate;
    }

    getRelativeDateRange(range: NuDateRelativeRange): NuDate[] {
        const startDate = this.getDateFromDistance(range.start);
        const endDate = this.getDateFromDistance(range.end);
        const dateRange = [];
        if (endDate.isLessThan(startDate)) {
            return dateRange;
        }
        let dateIterator = startDate;
        while (!dateIterator.isEqual(endDate)) {
            dateRange.push(dateIterator);
            dateIterator = dateIterator.clone();
            dateIterator.setDate(dateIterator.getDate() + 1);
        }
        return dateRange;
    }
}

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

type SimpleDate = {
    date: number;
    month: number;
    year: number;
    sortFormat: string;
    displayFormat: string;
};
function getDatesThisWeek(today: Date): SimpleDate[] {
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
            // chronological sort order date format to store in db
            sortFormat: `${newYear}-${newMonth}-${newDate}`,
            // American date format for display
            displayFormat: `${newMonth}/${newDate}/${newYear}`,
        }
    });
}

function getDateString(d: Date) {
    // return YYYY-MM-DD formatted date string from a Date
    const date = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${d.getFullYear()}-${month}-${date}`
}

export {
    NuDate,
    getDaysInMonth,
    getDatesThisWeek,
    getDateString,
}