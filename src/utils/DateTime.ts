import { numberToString } from './numberToString';

export class DateTime {
  static convertDayToText = (day: number): string => {
    const daysMap: {[key: number]: string} = {
      1: 'Sunday',
      2: 'Monday',
      3: 'Tuesday',
      4: 'Wednesday',
      5: 'Thursday',
      6: 'Friday',
      7: 'Saturday',
    };

    return daysMap[day] || 'None';
  };
  static dateToDateString = (val: Date) => {
    if (val) {
      const d = new Date(val);

      return `${numberToString(d.getDate())}/${numberToString(
        d.getMonth() + 1,
      )}/${d.getFullYear()}`;
    } else {
      return '';
    }
  };
  static CalendarDate = (val: Date) => {
    const date = new Date(val);

    return `${date.getFullYear()}-${numberToString(
      date.getMonth() + 1,
    )}-${numberToString(date.getDate())}`;
  };
  static CalendarDateTime = (val: Date) => {
    const date = new Date(val);

    return `${date.getFullYear()}-${numberToString(
      date.getMonth() + 1,
    )}-${numberToString(date.getDate())} ${numberToString(
      date.getHours(),
    )}:${numberToString(date.getMinutes())}:${numberToString(
      date.getSeconds(),
    )}`;
  };

  static GetDateTimeString = (num: number) => {
    const date = new Date(num);

    return `${numberToString(date.getHours())}:${numberToString(
      date.getMinutes(),
    )} ${this.dateToDateString(date)}`;
  };
}
