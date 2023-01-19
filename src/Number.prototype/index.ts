export {};

declare global {
  interface Number {
    commaFormat: (n?: number, comma?: string) => string;
    hhmmss: () => string;
    hhmm: () => string;
    hmm: () => string;
    zf: (len: number) => string;
    ef: (len: number) => string;
    efa: (len: number) => string;
    digitalFormat: () => string;
    fileSizeWithUnit: (full: boolean, fixedNumber: number) => string;
    currencyUnit: (isComma: boolean, maxDigitValue: number) => string;
    convertNumber: ({
      isUnit,
      unitSpace,
      isKorean,
      isComma
    }: {
      isUnit?: boolean;
      unitSpace?: number;
      isKorean?: boolean;
      isComma?: boolean;
    }) => string;
  }
  interface NumberConstructor {
    commaFormat: (n?: number, comma?: string) => string;
    CurrencyUnit: string[];
    CurrencyDigit: number[];
  }
}

const CURRENCY_UNIT = {
  KOR: '₩',
  USD: '$',
  JPY: '¥',
  EUR: '€',
  GBP: '£',
  CNY: '¥',
  KWN: '₩'
};

Number.CurrencyUnit = ['억원', '천만원', '백만원', '만원', '원'];
Number.CurrencyDigit = [8, 7, 6, 4, 0];

const digitsOfUnit = ['', '만', '억', '조', '경', '해'];
const digitsOfNumber = ['', '십', '백', '천'];
interface INumberToKorean {
  [key: number]: string;
}
const numberToKorean: INumberToKorean = {
  1: '일',
  2: '이',
  3: '삼',
  4: '사',
  5: '오',
  6: '육',
  7: '칠',
  8: '팔',
  9: '구'
};

!Number.prototype.digitalFormat &&
  Object.defineProperty(Number.prototype, 'digitalFormat', {
    value: function () {
      return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    enumerable: false
  });

const ByteUnits = [
  ['', ''],
  ['K', 'Killo '],
  ['M', 'Mega '],
  ['G', 'Giga '],
  ['T', 'Tera '],
  ['P', 'Peta '],
  ['E', 'Exa '],
  ['Z', 'Zetta '],
  ['Y', 'Yotta '],
  ['X', 'Xona ']
];

const SizeUnit = {
  full: 'Byte',
  short: 'B'
};

!Number.prototype.fileSizeWithUnit &&
  Object.defineProperty(Number.prototype, 'fileSizeWithUnit', {
    value: function (full = false, fixedNumber = 2, again = 0) {
      if (this < Math.pow(1024, again + 1)) {
        const byteUnit = ByteUnits[again][full ? 1 : 0];
        const sizeUnit = full ? SizeUnit.full : SizeUnit.short;
        return (this / Math.pow(1024, again)).toFixed(fixedNumber) + byteUnit + sizeUnit;
      } else return this.fileSizeWithUnit(full, fixedNumber, again + 1);
    },
    enumerable: false
  });

// comma formatted string, number
// if (!Number.parseNumber) {

!Number.prototype.commaFormat &&
  Object.defineProperty(Number.prototype, 'commaFormat', {
    value: function (n = 3, comma = ',') {
      if (this == 0) return '0';

      const reg = new RegExp('(^[+-]?\\d+)(\\d{' + n + '})');
      let s = this + '';

      while (reg.test(s)) s = s.replace(reg, '$1' + comma + '$2');

      return s;
    },
    enumerable: false
  });

// formatted currency unit, digit
!Number.prototype.currencyUnit &&
  Object.defineProperty(Number.prototype, 'currencyUnit', {
    value: function (isComma = true, maxDigitValue = Number.MAX_SAFE_INTEGER) {
      let _value = this,
        _digitIndex = 0,
        unit = Number.CurrencyUnit,
        digit = Number.CurrencyDigit;

      if (digit) {
        if (typeof digit === 'string' || typeof digit === 'number') digit = [digit];
        _digitIndex = digit.findIndex(
          (d, i) => (maxDigitValue >= Math.pow(10, d) && this / Math.pow(10, d) >= 1) || i === digit.length - 1
        );
        _value = Math.round((_value / Math.pow(10, digit[_digitIndex])) * 10) / 10;
      }

      if (isComma) {
        _value = _value.commaFormat();
      }

      if (unit) {
        if (typeof unit === 'string') unit = [unit];
        _value += unit[_digitIndex];
      }

      return _value;
    },
    enumerable: false
  });

const splitNumber = (number: number): Array<string> => {
  const mok = Math.floor(number / 10000);
  const left = number % 10000;
  if (mok >= 10000) return [splitNumber(mok), `${left}`.zf(4)].flat();
  return [`${mok}`, `${left}`.zf(4)].flat();
};

!String.prototype.convertNumber &&
  Object.defineProperty(String.prototype, 'convertNumber', {
    value: function ({ isUnit = false, unitSpace = 0, isKorean = false, isComma = false }) {
      if (!this || unitSpace < 0) return null;

      const number = parseInt(this.replace(/,/g, ''));

      return splitNumber(number)
        .reverse()
        .map((unit, unitIndex, arr) => {
          if (parseInt(unit) === 0) return;
          let newNum, newUnit;

          if (isComma && isUnit && !isKorean) newNum = Array.from(`${unit}`).join('');
          else newNum = `${unit}`;

          if (isKorean) {
            newNum = Array.from(newNum)
              .reverse()
              .map((digit: any, digitIndex) => {
                if (digit == '0') return null;
                return numberToKorean[digit] + digitsOfNumber[digitIndex];
              })
              .filter((e) => e)
              .reverse()
              .join('');
          }

          if (isUnit) newUnit = digitsOfUnit[unitIndex];
          else newUnit = '';

          if (isComma) return newNum.commaFormat() + newUnit;
          else return newNum + newUnit;
        })
        .reverse()
        .filter((n) => n !== undefined)
        .join(' '.repeat(unitSpace));
    },
    enumerable: false
  });

!Number.prototype.convertNumber &&
  Object.defineProperty(Number.prototype, 'convertNumber', {
    value: function ({ isUnit = false, unitSpace = 0, isKorean = false, isComma = false }) {
      return this.toString().convertNumber({
        isUnit,
        unitSpace,
        isKorean,
        isComma
      });
    },
    enumerable: false
  });
