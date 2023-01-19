declare global {
  interface Date {
    format(format: string): string;
    add: (unit: DateUnit, interval: number) => Date;
    isToday: () => boolean;
    inMonth: (f: Date, t: Date) => boolean;
    inDate: (f: Date, t: Date) => boolean;
    isEqualYear: (d: Date) => boolean;
    isEqualMonth: (d: Date) => boolean;
    isEqualDay: (d: Date) => boolean;
    toLunarDate: () => { year: number; month: number; day: number };
  }
  interface DateConstructor {
    format(format: string): string;
    WeekName: Array<string>;
    WeekShortName: Array<string>;
    AM: string;
    PM: string;
    min: (a: Date, b: Date) => Date;
    max: (a: Date, b: Date) => Date;
    commonDateFormat: string;
    today: () => Date | null;
    _today: Date | null;
    refreshToday: () => void;
    _refreshToday: () => void;
    julianday: (time: any) => number;
  }
}

type DateUnit =
  | 'y'
  | 'year'
  | 'q'
  | 'quarter'
  | 'mon'
  | 'm'
  | 'month'
  | 'w'
  | 'week'
  | 'd'
  | 'day'
  | 'h'
  | 'hour'
  | 'i'
  | 'min'
  | 'minute'
  | 's'
  | 'sec'
  | 'second';

export {};

Date.WeekName = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
Date.WeekShortName = ['일', '월', '화', '수', '목', '금', '토'];
Date.AM = '오전';
Date.PM = '오후';

if (!Date.min) Date.min = (d1, d2) => (d1.getTime() < d2.getTime() ? d1 : d2);
if (!Date.max) Date.max = (d1, d2) => (d1.getTime() > d2.getTime() ? d1 : d2);

Date.commonDateFormat = 'yyyy-MM-dd HH:mm:ss';

!Date.prototype.format &&
  Object.defineProperty(Date.prototype, 'format', {
    value: function (f: string) {
      if (!this.valueOf()) return ' ';
      const d = this;
      let h;

      return f.replace(/(yyyy|yy|MM|dd|EEE|E|hh|mm|ss|ap|a|zzz|z|M|d|H|h|m|s)/gi, function ($1) {
        switch ($1) {
          case 'yyyy':
            return d.getFullYear();
          case 'yy':
            return (d.getFullYear() % 1000).zf(2);
          case 'MM':
            return (d.getMonth() + 1).zf(2);
          case 'dd':
            return d.getDate().zf(2);
          case 'EEE':
            return Date.WeekName[d.getDay()];
          case 'E':
            return Date.WeekShortName[d.getDay()];
          case 'HH':
            return d.getHours().zf(2);
          case 'hh': {
            h = d.getHours() % 12;
            return (h ? h : 12).zf(2);
          }
          case 'mm':
            return d.getMinutes().zf(2);
          case 'ss':
            return d.getSeconds().zf(2);

          case 'M':
            return d.getMonth() + 1;
          case 'd':
            return d.getDate();
          case 'H':
            return d.getHours();
          case 'h': {
            h = d.getHours() % 12;
            return (h ? h : 12).zf(2);
          }
          case 'm':
            return d.getMinutes();
          case 's':
            return d.getSeconds();

          case 'a':
          case 'ap':
            return d.getHours() < 12 ? Date.AM : Date.PM;
          case 'zzz':
          case 'z':
            return (d.getTime() % 1000).zf(3);
          default:
            return $1;
        }
      });
    },
    enumerable: false
  });

// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
!String.prototype.isNumber &&
  Object.defineProperty(String.prototype, 'isNumber', {
    value: function () {
      return /^\d+$/.test(this);
    },
    enumerable: false
  });

function _isInteger(val: any) {
  return /^\d+$/.test(val);
}

function _getInt(str: any, i: any, minlength: any, maxlength: any) {
  for (let x = maxlength; x >= minlength; x--) {
    const token = str.substring(i, i + x);
    if (token.length < minlength) return null;
    if (_isInteger(token)) return token;
  }
  return null;
}

!Number.prototype.hhmm &&
  Object.defineProperty(Number.prototype, 'hhmm', {
    value: function () {
      const hh = Math.floor(this / 1000 / 3600);
      const mm = Math.floor(this / 1000 / 60 - hh * 60).zf(2);
      return hh.zf(2) + ':' + mm.zf(2);
    },
    enumerable: false
  });

!Number.prototype.hmm &&
  Object.defineProperty(Number.prototype, 'hmm', {
    value: function () {
      const hh = Math.floor(this / 1000 / 3600);
      const mm = Math.floor(this / 1000 / 60 - hh * 60).zf(2);
      return hh + ':' + mm.zf(2);
    },
    enumerable: false
  });

!Number.prototype.hhmmss &&
  Object.defineProperty(Number.prototype, 'hhmmss', {
    value: function () {
      const hh = Math.floor(this / 1000 / 3600);
      const mm = Math.floor(this / 1000 / 60 - hh * 60);
      const ss = Math.floor(this / 1000 - hh * 60 * 60 - mm * 60);
      return hh.zf(2) + ':' + mm.zf(2) + ':' + ss.zf(2);
    },
    enumerable: false
  });

!String.prototype.hhmm &&
  Object.defineProperty(String.prototype, 'hhmm', {
    value: function () {
      if (this.length != 4) {
        console.warn(this, ' String.prototype.hhmm function working only 4 length string ');
        return '';
      }
      const [hh, mm] = this.match(/.{1,2}/gi);
      return hh.zf(2) + ':' + mm.zf(2);
    },
    enumerable: false
  });

!String.prototype.hhmmss &&
  Object.defineProperty(String.prototype, 'hhmmss', {
    value: function () {
      if (this.length != 6) {
        console.warn(this, ' String.prototype.hhmmss function working only 6 length string ');
        return '';
      }
      const [hh, mm, ss] = this.match(/.{1,2}/gi);
      return hh.zf(2) + ':' + mm.zf(2) + ':' + ss.zf(2);
    },
    enumerable: false
  });

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MONTH_NAMES = [' Jan', ' Feb', ' Mar', ' Apr', ' May', ' Jun', ' Jul', ' Aug', ' Sep', ' Oct', ' Nov', ' Dec'];

/**
 * format support symbols
 *
 * yyyy  : 4 digit year ex 2020
 * yy    : 2 digit year ex 20
 * y     : 2 or 4 digit year ex 20 or 2020
 * EE,E  : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
 * MM,M  : 2 digit of Month of year
 * dd,d  : 2 digit of days of month
 * hh,h  : 12 hour base 2 digit
 * HH,H  : 24 hour base 2 digit
 * mm,m  : minutes
 * ss,s  : seconds
 * zzz,z : micro seconds 3 digit
 * a     : [am, pm]
 */

!String.prototype.dateFromFormat &&
  Object.defineProperty(String.prototype, 'dateFromFormat', {
    value: function (_format: string) {
      const val = this + '';
      const format = _format + '';
      let i_val = 0;
      let i_format = 0;
      let c = '';
      let token = '';
      let year = null;
      let month = 1;
      let date = 1;
      let hh = 0;
      let mm = 0;
      let ss = 0;
      let z = 0;
      let ampm = '';
      let x, y;

      while (i_format < format.length) {
        // Get next token from format string
        c = format.charAt(i_format);
        token = '';
        while (format.charAt(i_format) == c && i_format < format.length) {
          token += format.charAt(i_format++);
        }
        // Extract contents of value based on format token
        if (token == 'yyyy' || token == 'yy' || token == 'y') {
          if (token == 'yyyy') {
            x = 4;
            y = 4;
          }
          if (token == 'yy') {
            x = 2;
            y = 2;
          }
          if (token == 'y') {
            x = 2;
            y = 4;
          }
          year = _getInt(val, i_val, x, y);
          if (year == null) {
            console.warn(this + ' is invalid date for ' + format + ' year');
            return 0;
          }
          i_val += year.length;
          if (year.length == 2) {
            if (parseInt(year) > 70) {
              year = 1900 + (parseInt(year) - 0);
            } // if 2070
            else {
              year = 2000 + (parseInt(year) - 0);
            }
          }
        } else if (token == 'EE' || token == 'E') {
          for (let i = 0; i < DAY_NAMES.length; i++) {
            const day_name = DAY_NAMES[i];
            if (val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) {
              i_val += day_name.length;
              break;
            }
          }
        } else if (token == 'MM' || token == 'M') {
          month = _getInt(val, i_val, token.length, 2);
          if (month == null || month < 1 || month > 12) {
            console.warn(this + ' is invalid date for ' + format + ' about month');
            return 0;
          }
          i_val += String(month).length;
        } else if (token == 'dd' || token == 'd') {
          date = _getInt(val, i_val, token.length, 2);
          if (date == null || date < 1 || date > 31) {
            console.warn(this + ' is invalid date for ' + format + ' about month of days');
            return 0;
          }
          i_val += String(date).length;
        } else if (token == 'hh' || token == 'h') {
          hh = _getInt(val, i_val, token.length, 2);
          if (hh == null || hh < 1 || hh > 12) {
            console.warn(this + ' is invalid date for ' + format + ' hour');
            return 0;
          }
          i_val += String(hh).length;
        } else if (token == 'HH' || token == 'H') {
          hh = _getInt(val, i_val, token.length, 2);
          if (hh == null || hh < 0 || hh > 23) {
            console.warn(this + ' is invalid date for ' + format + ' hour');
            return 0;
          }
          i_val += String(hh).length;
        } else if (token == 'mm' || token == 'm') {
          mm = _getInt(val, i_val, token.length, 2);
          if (mm == null || mm < 0 || mm > 59) {
            console.warn(this + ' is invalid date for ' + format + ' minute');
            return 0;
          }
          i_val += String(mm).length;
        } else if (token == 'ss' || token == 's') {
          ss = _getInt(val, i_val, token.length, 2);
          if (ss == null || ss < 0 || ss > 59) {
            console.warn(this + ' is invalid date for ' + format + ' second');
            return 0;
          }
          i_val += String(ss).length;
        } else if (token == 'a') {
          if (val.substring(i_val, i_val + 2).toLowerCase() == 'am') {
            ampm = 'AM';
          } else if (val.substring(i_val, i_val + 2).toLowerCase() == 'pm') {
            ampm = 'PM';
          } else {
            console.warn(this + ' is invalid date for ' + format + ' ap/pm');
            return 0;
          }
          i_val += 2;
        } else if (token == 'zzz' || token == 'z') {
          z = _getInt(val, i_val, 3, 3);
          if (z == null) {
            console.warn(this + ' is invalid date for ' + format + ' microsecond');
            return 0;
          }
          z = parseInt(String(z));
          i_val += 3;
        } else {
          if (val.substring(i_val, i_val + token.length) != token) {
            console.warn(this + ' is invalid date for ' + format + ' unknown token "' + token + '"');
            return 0;
          } else {
            i_val += token.length;
          }
        }
      }
      // If there are any trailing characters left in the value, it doesn't match
      // if (i_val != val.length) {
      //   console.warn( this + ' is invalid date for ' + format + '');
      //   return 0;
      // }
      // Is date valid for month?
      if (month == 2) {
        // Check for leap year
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
          // leap year
          if (date > 29) {
            console.warn(this + ' is invalid date for ' + format + ' leap year date');
            return 0;
          }
        } else {
          if (date > 28) {
            return 0;
          }
        }
      }
      if (month == 4 || month == 6 || month == 9 || month == 11) {
        if (date > 30) {
          console.warn(this + ' is invalid date for ' + format + '');
          return 0;
        }
      }
      // Correct hours value
      if (hh < 12 && ampm == 'PM') {
        hh = hh - 0 + 12;
      } else if (hh > 11 && ampm == 'AM') {
        hh -= 12;
      }
      return new Date(year, month - 1, date, hh, mm, ss, z);
    },
    enumerable: false
  });

!String.prototype.toDate &&
  Object.defineProperty(String.prototype, 'toDate', {
    value: function (format: string) {
      return this.dateFromFormat(format);
    },
    enumerable: false
  });

// String.prototype.string = function(len){const s = '', i = 0; while (i++ < len) { s += this; } return s;};
!String.prototype.zf &&
  Object.defineProperty(String.prototype, 'zf', {
    value: function (len: number) {
      return this.length > len ? this : '0'.repeat(len - this.length) + this;
    },
    enumerable: false
  });
!Number.prototype.zf &&
  Object.defineProperty(Number.prototype, 'zf', {
    value: function (len: number) {
      return this.toString().zf(len);
    },
    enumerable: false
  });

!String.prototype.efa &&
  Object.defineProperty(String.prototype, 'efa', {
    value: function (len: number) {
      return this.length > len ? this : this + ' '.repeat(len - this.length);
    },
    enumerable: false
  });
!Number.prototype.efa &&
  Object.defineProperty(Number.prototype, 'efa', {
    value: function (len: number) {
      return this.toString().efa(len);
    },
    enumerable: false
  });

!String.prototype.ef &&
  Object.defineProperty(String.prototype, 'ef', {
    value: function (len: number) {
      return this.length > len ? this : ' '.repeat(len - this.length) + this;
    },
    enumerable: false
  });
!Number.prototype.ef &&
  Object.defineProperty(Number.prototype, 'ef', {
    value: function (len: number) {
      return this.toString().ef(len);
    },
    enumerable: false
  });

!Date.prototype.add &&
  Object.defineProperty(Date.prototype, 'add', {
    value: function (unit: DateUnit, interval: number) {
      switch (unit.toLowerCase()) {
        case 'y':
        case 'year':
          this.setFullYear(this.getFullYear() + interval);
          break;
        case 'q':
        case 'quarter':
          this.setMonth(this.getMonth() + 3 * interval);
          break;
        case 'mon':
        case 'm':
        case 'month':
          this.setMonth(this.getMonth() + interval);
          break;
        case 'w':
        case 'week':
          this.setDate(this.getDate() + 7 * interval);
          break;
        case 'd':
        case 'day':
          this.setDate(this.getDate() + interval);
          break;
        case 'h':
        case 'hour':
          this.setTime(this.getTime() + interval * 3600 * 1000);
          break;
        case 'i':
        case 'min':
        case 'minute':
          this.setTime(this.getTime() + interval * 60 * 1000);
          break;
        case 's':
        case 'sec':
        case 'second':
          this.setTime(this.getTime() + interval * 1000);
          break;
        default:
          console.warn(
            `'${unit}' is not valid value. Date.prototype.add first Parameter must one of [year(y),quarter(q),month(mon,m),week(w),day(d),hour(h),minute(min,i),second(sec,s)].\n Date adding has been failed.`
          );
          break;
      }
      return this;
    },
    enumerable: false
  });

!Date.prototype.isToday &&
  Object.defineProperty(Date.prototype, 'isToday', {
    value: function () {
      return this.isEqualDay(Date._today);
    },
    enumerable: false
  });

!Date.prototype.inMonth &&
  Object.defineProperty(Date.prototype, 'inMonth', {
    value: function (f: Date, t: Date) {
      if (!f || !t) return false;
      const d = this.getFullYear() * 100 + this.getMonth();
      return f.getFullYear() * 100 + f.getMonth() <= d && t.getFullYear() * 100 + t.getMonth() >= d;
    }
  });

!Date.prototype.inDate &&
  Object.defineProperty(Date.prototype, 'inDate', {
    value: function (f: Date, t: Date) {
      if (!f || !t) return false;
      const d = this.getFullYear() * 100 * 100 + this.getMonth() * 100 + this.getDate();
      return (
        f.getFullYear() * 100 * 100 + f.getMonth() * 100 + f.getDate() <= d &&
        t.getFullYear() * 100 * 100 + t.getMonth() * 100 + t.getDate() >= d
      );
    }
  });

!Date.prototype.isEqualYear &&
  Object.defineProperty(Date.prototype, 'isEqualYear', {
    value: function (d: Date) {
      return d.getFullYear() == this.getFullYear();
    }
  });

!Date.prototype.isEqualMonth &&
  Object.defineProperty(Date.prototype, 'isEqualMonth', {
    value: function (d: Date) {
      return d.getFullYear() * 100 + d.getMonth() == this.getFullYear() * 100 + this.getMonth();
    }
  });

!Date.prototype.isEqualDay &&
  Object.defineProperty(Date.prototype, 'isEqualDay', {
    value: function (d: Date) {
      return (
        this.getFullYear() === d.getFullYear() && this.getMonth() === d.getMonth() && this.getDate() === d.getDate()
      );
    }
  });

!Date.prototype.toLunarDate &&
  Object.defineProperty(Date.prototype, 'toLunarDate', {
    value: function () {
      /*  음력 달력 배열
            음력은 모든 달이 29일 ~ 30일 으로만 이루어짐
            음력에도 윤달이 있을 경우 2월에 1일이 추가되는 식이 아니라
            한달이 추가되어짐
            1-> 29일, 2->30일
            3, 4, 5, 6은 윤달이 추가로 생성됨
            3-> 29일 + 윤29일, 4-> 29일 + 윤30일
            5-> 30일 + 윤29일, 6-> 30일 + 윤30일
        */
      const LUNAR_LAST_YEAR = 1939;
      const lunarMonthTable = [
        [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2] /* 양력 1940년 1월은 음력 1939년에 있음 그래서 시작년도는 1939년*/,
        [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1] /* 1941 */,
        [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
        [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
        [1, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
        [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
        [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
        [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
        [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2] /* 1951 */,
        [1, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1, 2],
        [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
        [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
        [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
        [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
        [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
        [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2] /* 1961 */,
        [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
        [1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
        [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 1, 5, 2, 1, 2, 1, 2],
        [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
        [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2] /* 1971 */,
        [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
        [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
        [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
        [2, 2, 1, 2, 1, 2, 1, 5, 2, 1, 1, 2],
        [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
        [2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
        [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
        [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2] /* 1981 */,
        [2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2, 2],
        [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
        [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
        [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
        [2, 1, 2, 2, 1, 5, 2, 2, 1, 2, 1, 2],
        [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
        [1, 2, 1, 1, 5, 1, 2, 1, 2, 2, 2, 2],
        [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2] /* 1991 */,
        [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
        [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
        [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
        [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
        [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
        [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
        [2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2] /* 2001 */,
        [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
        [1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1],
        [2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
        [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
        [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
        [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 2011 */,
        [2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1],
        [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
        [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
        [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
        [2, 1, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
        [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
        [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1] /* 2021 */,
        [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
        [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
        [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
        [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
        [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
        [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
        [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
        [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
        [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1] /* 2031 */,
        [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
        [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
        [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
        [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
        [2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
        [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
        [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
        [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
        [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
        [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 2041 */,
        [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
        [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2]
      ];

      const that = this;
      // 음력 계산을 위한 객체
      function myDate(year: string, month: string, day: string, leapMonth: string) {
        that.year = year;
        that.month = month;
        that.day = day;
        that.leapMonth = leapMonth;
      }

      // 양력을 음력으로 계산
      function lunarCalc(year: string, month: string, day: string, type: number, leapmonth?: number) {
        let solYear, solMonth, solDay;
        let lunYear, lunMonth, lunDay;

        // lunLeapMonth는 음력의 윤달인지 아닌지를 확인하기위한 변수
        // 1일 경우 윤달이고 0일 경우 음달
        let lunLeapMonth, lunMonthDay;
        let i, lunIndex;

        const solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        /* range check */
        if (parseInt(year) < 1940 || parseInt(year) > 2040) {
          console.warn('Check Year Scope (1940 ~ 2040)');
          return;
        }

        /* 속도 개선을 위해 기준 일자를 여러개로 한다 */
        if (parseInt(year) >= 2000) {
          /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
          solYear = 2000;
          solMonth = 1;
          solDay = 1;
          lunYear = 1999;
          lunMonth = 11;
          lunDay = 25;
          lunLeapMonth = 0;

          solMonthDay[1] = 29; /* 2000 년 2월 28일 */
          lunMonthDay = 30; /* 1999년 11월 */
        } else if (parseInt(year) >= 1970) {
          /* 기준일자 양력 1970년 1월 1일 (음력 1969년 11월 24일) */
          solYear = 1970;
          solMonth = 1;
          solDay = 1;
          lunYear = 1969;
          lunMonth = 11;
          lunDay = 24;
          lunLeapMonth = 0;

          solMonthDay[1] = 28; /* 1970 년 2월 28일 */
          lunMonthDay = 30; /* 1969년 11월 */
        } else {
          /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
          solYear = 1940;
          solMonth = 1;
          solDay = 1;
          lunYear = 1939;
          lunMonth = 11;
          lunDay = 22;
          lunLeapMonth = 0;

          solMonthDay[1] = 29; /* 1940 년 2월 28일 */
          lunMonthDay = 29; /* 1939년 11월 */
        }

        lunIndex = lunYear - LUNAR_LAST_YEAR;

        // type이 1일때는 입력받은 양력 값에 대한 음력값을 반환
        // 2일 때는 입력받은 음력 값에 대한 양력값을 반환
        // 반복문이 돌면서 양력 값들과 음력 값들을 1일 씩 증가시키고
        // 입력받은 날짜값과 양력 값이 일치할 때 음력값을 반환함
        // while (true) {

        if (type == 1 && parseInt(year) == solYear && parseInt(month) == solMonth && parseInt(day) == solDay) {
          return new (myDate as any)(lunYear, lunMonth, lunDay, lunLeapMonth);
        } else if (
          type == 2 &&
          parseInt(year) == lunYear &&
          parseInt(month) == lunMonth &&
          parseInt(day) == lunDay &&
          leapmonth == lunLeapMonth
        ) {
          return new (myDate as any)(solYear, solMonth, solDay, 0);
        }

        // 양력의 마지막 날일 경우 년도를 증가시키고 나머지 초기화
        if (solMonth == 12 && solDay == 31) {
          solYear++;
          solMonth = 1;
          solDay = 1;

          // 윤년일 시 2월달의 총 일수를 1일 증가
          if (solYear % 400 == 0) solMonthDay[1] = 29;
          else if (solYear % 100 == 0) solMonthDay[1] = 28;
          else if (solYear % 4 == 0) solMonthDay[1] = 29;
          else solMonthDay[1] = 28;
        }
        // 현재 날짜가 달의 마지막 날짜를 가리키고 있을 시 달을 증가시키고 날짜 1로 초기화
        else if (solMonthDay[solMonth - 1] == solDay) {
          solMonth++;
          solDay = 1;
        } else solDay++;

        // 음력의 마지막 날인 경우 년도를 증가시키고 달과 일수를 초기화
        if (
          lunMonth == 12 &&
          ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) ||
            (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30))
        ) {
          lunYear++;
          lunMonth = 1;
          lunDay = 1;

          if (lunYear > 2043) {
            console.warn('Check Month');
            // break;
          }

          // 년도가 바꼈으니 index값 수정
          lunIndex = lunYear - LUNAR_LAST_YEAR;

          // 음력의 1월에는 1 or 2만 있으므로 1과 2만 비교하면됨
          if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) lunMonthDay = 30;
        }
        // 현재날짜가 이번달의 마지막날짜와 일치할 경우
        else if (lunDay == lunMonthDay) {
          // 윤달인데 윤달계산을 안했을 경우 달의 숫자는 증가시키면 안됨
          if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3 && lunLeapMonth == 0) {
            lunDay = 1;
            lunLeapMonth = 1;
          }
          // 음달이거나 윤달을 계산 했을 겨우 달을 증가시키고 lunLeapMonth값 초기화
          else {
            lunMonth++;
            lunDay = 1;
            lunLeapMonth = 0;
          }

          // 음력의 달에 맞는 마지막날짜 초기화
          if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) lunMonthDay = 30;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3) lunMonthDay = 29;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 4 && lunLeapMonth == 0) lunMonthDay = 29;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 4 && lunLeapMonth == 1) lunMonthDay = 30;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 5 && lunLeapMonth == 0) lunMonthDay = 30;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 5 && lunLeapMonth == 1) lunMonthDay = 29;
          else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6) lunMonthDay = 30;
        } else lunDay++;
        // }
      }

      // 양력을 음력날짜로 변환
      function solarToLunar(solYear: string, solMonth: string, solDay: string) {
        // 날짜 형식이 안맞을 경우 공백 반환
        if (
          !solYear ||
          parseInt(solYear) == 0 ||
          !solMonth ||
          parseInt(solMonth) == 0 ||
          !solDay ||
          parseInt(solDay) == 0
        ) {
          return '';
        }

        // 양력의 달마다의 일수
        const solMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // 윤년일 시 2월에 1일 추가
        if (parseInt(solYear) % 400 == 0 || (parseInt(solYear) % 4 == 0 && parseInt(solYear) % 100 != 0))
          solMonthDays[1] += 1;

        if (
          parseInt(solMonth) < 1 ||
          parseInt(solMonth) > 12 ||
          parseInt(solDay) < 1 ||
          parseInt(solDay) > solMonthDays[parseInt(solMonth) - 1]
        ) {
          return '';
        }

        /* 양력/음력 변환 */
        const date = lunarCalc(solYear, solMonth, solDay, 1);

        return [date.year, date.month, date.day];
      }

      return solarToLunar(this.getFullYear(), this.getMonth() + 1, this.getDate());
    }
  });

if (!Date.today) {
  Date._today = null;
  Date._refreshToday = () => {
    Date._today = new Date();
    Date._today.setHours(0, 0, 0, 0);
    const delay = 86400 * 1000 - (Date.now() - Date._today.getTime());
    console.log(`Today ${Date._today.format('yyyy-MM-dd')} will be changed after ${delay.hhmmss()}`);
    const t = setTimeout(() => {
      clearTimeout(t);
      Date._refreshToday();
    }, delay);
  };
  Date._refreshToday();
  Date.today = () => Date._today;
}

const UNIXTIME_START_FOR_JULIANDAY = 2440587.5;
Date.julianday = (time) => {
  return Math.floor((time || Date.now()) / 86400000 + UNIXTIME_START_FOR_JULIANDAY);
};
