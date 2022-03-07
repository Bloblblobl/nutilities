const FIRST_AAD_YEAR = 2016;

type FullNuDateFormat = 'y-m-d' | 'Py-m-d' | 'm/d/y' | 'Pm/d/y';
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
        const paddedDayExp = '(?<day>(3[01])|([0-2][0-9]))';
        const paddedMonthExp = '(?<month>(1[0-2])|(0[1-9]))';
        switch(fromFormat) {
            case 'y-m-d':
                regExpString = `${yearExp}-${monthExp}-${dayExp}`;
                break;
            case 'Py-m-d':
                regExpString = `${yearExp}-${paddedMonthExp}-${paddedDayExp}`;
                break;
            case 'm/d/y':
                regExpString = `${monthExp}/${dayExp}/${yearExp}`;
                break;
            case 'Pm/d/y':
                regExpString = `${paddedMonthExp}/${paddedDayExp}/${yearExp}`;
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
        const regExpString = '(?<number>-?[0-9]+)(?<unit>[dwmy])';
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
        const paddedDay = day.toString().padStart(2, '0');
        const paddedMonth = month.toString().padStart(2, '0');
        const monthName = this.toLocaleString('default', { month: 'long' });
        switch(format) {
            case 'y-m-d':
                return `${year}-${month}-${day}`;
            case 'Py-m-d':
                return `${year}-${paddedMonth}-${paddedDay}`;
            case 'm/d/y':
                return `${month}/${day}/${year}`;
            case 'Pm/d/y':
                return `${paddedMonth}/${paddedDay}/${year}`;
            case 'm d':
                return`${monthName} ${day}`;
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
                    newDate.setDate(newDate.getDate() + (7 - newDate.getDay()));
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

    getDatesThisWeek(): NuDate[] {
        const thisWeekRange: NuDateRelativeRange = {start: '-0w', end: '0w'};
        return this.getRelativeDateRange(thisWeekRange);
    }
}

export {NuDate};