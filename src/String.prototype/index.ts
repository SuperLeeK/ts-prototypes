declare global {
  interface String {
    parseNumber: (value?: string, defaultValue?: number) => number;
    isAbnormal: () => boolean;
    astralLength: () => number;
    astralTrunc: (n?: number, e?: string) => string;
    trunc: (n?: number, e?: string) => string;
    byteLength: () => number;
    byteTrunc: (length: number) => string;
    replaceAt: (index: number, replacement: string) => string;
    equalsIgnoreCase: (str: string) => boolean;
    toKoreanElements: () => Array<string>;
    regexLastIndexOf: (regex: RegExp, startpos?: number) => number;
    regexIndexOf: (regex: RegExp, startpos?: number) => number;
    toKoreanFirstElements: () => Array<string>;
    hasEndKoreanSyllable: () => boolean;
    k: (includeText: string, excludeText: string, isExclude: boolean) => string;
    p: (format: KoreanFormat, exclude: boolean) => string;
    withParticles: (hasSyllable: string, hasNotSyllable: string) => string;
    toSignedNumber: () => number;
    toCapitalize: () => string;
    equals: (str: string) => boolean;
    queryStringToObject: () => any;
    commaFormat: (n?: number | any[], comma?: string) => string;
    format: (...args: any) => string;
    isDecimal: () => boolean;
    masking: (r?: number, mask?: string) => string;
    versionNormalize: (l: number, d: number) => string;
    versionToNumber: (l: number, d: number) => number;
    length2: () => number;
    fromBase64: () => string;
    toBase64: () => string;
    base64ToArrayBuffer: () => ArrayBuffer;
    literalText: () => string;
    getExtension: () => string;
    isNumber: () => boolean;
    hhmmss: () => string;
    hhmm: () => string;
    hmm: () => string;
    dateFromFormat: (format: string) => Date;
    toDate: (format?: string) => Date;
    zf: (len: number) => string;
    ef: (len: number) => string;
    efa: (len: number) => string;
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
  interface StringConstructor {
    parseNumber: (value?: string, defaultValue?: number) => number;
    koreanMix: (first: string, middle: string, last: string) => string;
  }
}

export {};

const UnicodeAstralRange =
  /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/g;

Object.defineProperty(String.prototype, 'isAbnormal', {
  value: function () {
    return this.search(/[^가-힣ㄱ-ㅎㅏ-ㅣa-z0-9 ]/im) >= 0;
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'astralLength', {
  value: function () {
    if (this.length == 0) return '';
    const arr = this.match(UnicodeAstralRange) || [];
    return arr.length;
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'astralTrunc', {
  value: function (n: any, e = '…') {
    if (this.length == 0) return '';
    const arr = this.match(UnicodeAstralRange) || [];
    if (arr.length > n) {
      return arr.limit(0, n).join('') + e;
    }
    return arr.join('');
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'trunc', {
  value: function (n: any, e = '…') {
    if (this.length == 0) return '';
    const arr = this.match(UnicodeAstralRange);
    if (!arr) return '';
    return arr.slice(0, n).join('') + (arr.length > n ? e : '');
  },
  enumerable: false
});

//   value:function(n, e = '…'){
//     return (this.length > n) ? this.substr(0,n)+e : this;
//   },
//   enumerable: false
// });

Object.defineProperty(String.prototype, 'byteLength', {
  value: function () {
    let s = this.length;
    for (let i = this.length - 1; i >= 0; i--) {
      const code = this.charCodeAt(i);
      if (code > 0x7f && code <= 0x7ff) s++;
      else if (code > 0x7ff && code <= 0xffff) s += 2;
      if (code >= 0xdc00 && code <= 0xdfff) i--; //trail surrogate
    }
    return s;
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'byteTrunc', {
  value: function (n: any, e = '…') {
    let byteLength = 0;
    const arr = this.match(UnicodeAstralRange);
    return (
      (arr || [])
        .map((s: any) => {
          byteLength += s.byteLength();
          return byteLength <= n ? s : '';
        })
        .join('') + (this.byteLength() > n ? e : '')
    );
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'replaceAt', {
  value: function (index: number, character: string) {
    return this.substr(0, index) + character + this.substr(index + character.length);
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'equalsIgnoreCase', {
  value: function (s: string) {
    return this.toLowerCase() === s.toLowerCase();
  },
  enumerable: false
});

const Firsts = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
const Middles = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ';
const MiddleSplits = '2459aefhijoqstuvwxyzABCDEFGHIJKOPQSTUVWXYZ';
const Lasts = 'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ';
const KOREAN = {
  Firsts: Firsts.split(''),
  Middles: [...Middles.split(''), ...MiddleSplits.split('')],
  Lasts: [''].concat(Lasts.split(''), '13678bcdgklmnprgBCGKLMNPRG'.split('')),
  Specials: '℃㎥%'.split('')
};

// if (!String.koreanMix) {
//   String.koreanMix = function (first, middle, last) {
//     const fi = Firsts.indexOf(first);
//     const mi = Middles.indexOf(middle);
//     let li = Lasts.indexOf(last);
//     if (li < 0) li = 0;
//     if (li > 0) li += 1;
//     console.log(fi, mi, li);
//     return String.fromCharCode(0xac00 + 21 * 28 * fi + 28 * mi + li);
//   };

//   // String.koreanMix( 'ㄱ','ㅏ','ㅇ' ) + String.koreanMix('ㅅ','ㅡ','ㄹ') + String.koreanMix('ㄱ','ㅣ');
//   // String.koreanMix( 'ㄱ','ㅣ','ㅁ' ) + String.koreanMix('ㅈ','ㅐ') + String.koreanMix('ㅇ','ㅜ');
//   // String.koreanMix( 'ㄱ','ㅣ','ㅁ' ) + String.koreanMix('ㅈ','ㅐ') + String.koreanMix('ㅇ','ㅜ');
// }

Object.defineProperty(String.prototype, 'toKoreanElements', {
  value: function () {
    let first, middle, last;

    const str = this.normalize();
    const cnt = str.length;
    const chars = [];
    let cCode;

    for (let i = 0; i < cnt; i++) {
      cCode = str.charCodeAt(i);

      if (cCode == 32) {
        continue;
      }

      // case of not korean
      if (cCode < 0xac00 || cCode > 0xd7a3 || KOREAN.Specials.inArray(str)) {
        chars.push(str.charAt(i));
        continue;
      }

      cCode = str.charCodeAt(i) - 0xac00;

      last = cCode % 28; // get element of last
      middle = ((cCode - last) / 28) % 21; // get element of middle
      first = ((cCode - last) / 28 - middle) / 21; // get element of first

      chars.push(KOREAN.Firsts[first], KOREAN.Middles[middle]);
      if (KOREAN.Lasts[last] !== '') {
        chars.push(KOREAN.Lasts[last]);
      }
    }

    return chars;
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'regexLastIndexOf', {
  value: function (regex: RegExp, startpos: number) {
    regex = regex.global
      ? regex
      : new RegExp(regex.source, 'g' + (regex.ignoreCase ? 'i' : '') + (regex.multiline ? 'm' : ''));
    if (typeof startpos == 'undefined') {
      startpos = this.length;
    } else if (startpos < 0) {
      startpos = 0;
    }
    const stringToWorkWith = this.substring(0, startpos + 1);
    let lastIndexOf = -1;
    let nextStop = 0;
    let result;
    while ((result = regex.exec(stringToWorkWith)) != null) {
      lastIndexOf = result.index;
      regex.lastIndex = ++nextStop;
    }
    return lastIndexOf;
  }
});

Object.defineProperty(String.prototype, 'regexIndexOf', {
  value: function (regex: RegExp, startpos: number) {
    const indexOf = this.substring(startpos || 0).search(regex);
    return indexOf >= 0 ? indexOf + (startpos || 0) : indexOf;
  }
});

Object.defineProperty(String.prototype, 'toKoreanFirstElements', {
  value: function () {
    let syllableIndex;
    const cnt = this.length;
    const syllables = [];
    let cCode;

    for (let i = 0; i < cnt; i++) {
      cCode = this.charCodeAt(i);
      if (cCode == 32 || cCode < 0xac00 || cCode > 0xd7a3) {
        syllables.push(this.charAt(i));
        continue;
      }
      cCode = cCode - 0xac00;

      syllables.push(KOREAN.Firsts[((cCode - (cCode % 28)) / 28 - (((cCode - (cCode % 28)) / 28) % 21)) / 21]);
    }
    return syllables.join('');
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'hasEndKoreanSyllable', {
  value: function () {
    return KOREAN.Lasts.inArray(this.toKoreanElements().last());
    // return !KOREAN.Middles.inArray(this.toKoreanElements().last());
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'k', {
  value: function (includeText: string, excludeText: string, isExclude: boolean) {
    if (isExclude) return this.hasEndKoreanSyllable() ? includeText : excludeText;
    return this + (this.hasEndKoreanSyllable() ? includeText : excludeText);
  },
  enumerable: false
});

export enum KoreanFormat {
  을를 = '을를',
  은는 = '은는',
  이가 = '이가',
  과와 = '과와',
  으로 = '으로'
}
const _formats = {
  을를: ['을', '를'],
  은는: ['은', '는'],
  이가: ['이', '가'],
  과와: ['과', '와'],
  으로: ['으로', '로']
};

Object.defineProperty(String.prototype, 'p', {
  value: function (format: KoreanFormat, exclude: boolean) {
    if (!_formats[format]) {
      console.error(
        format + ' is unkonwn postpostional format. Please use one of [' + Object.keys(_formats).join(', ') + ']'
      );
      return null;
    }
    return this.k(..._formats[format], exclude);
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'withParticles', {
  value: function (hasSyllable: string, hasNotSyllable: string) {
    return this + (this.hasEndKoreanSyllable() ? hasSyllable : hasNotSyllable);
  }
});

Object.defineProperty(String.prototype, 'toSignedNumber', {
  value: function () {
    let hex = this;
    if (hex.length % 2 != 0) hex = '0' + hex;
    let num = parseInt(hex, 16);
    const maxVal = Math.pow(2, (hex.length / 2) * 8);
    if (num > maxVal / 2 - 1) num = num - maxVal;
    return num;
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'toCapitalize', {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'equals', {
  value: function (s: string) {
    return this === s;
  },
  enumerable: false
});

interface IqsArray {
  [Symbol.iterator](): Iterator<string>;
  [key: string]: string | string[];
}
Object.defineProperty(String.prototype, 'queryStringToObject', {
  value: function () {
    if (this.length == 0) return {};
    return this.replace(/^\?/, '')
      .split('&')
      .map((kv: string) => kv.split('='))
      .reduce((p: object, [k, v]: IqsArray) => Object.assign(p, { [k]: v }), {});
  },
  enumerable: false
});

!String.prototype.parseNumber &&
  Object.defineProperty(String.prototype, 'parseNumber', {
    value: function (value: any, defaultValue = 0) {
      if (!value) value = this;
      if (typeof value == 'string') value = parseFloat((value || '0').replace(/,/gi, ''));
      if (isNaN(value)) return defaultValue;
      if (typeof value == 'number') return value;
      else return defaultValue;
    },
    enumerable: false
  });

Object.defineProperty(String.prototype, 'commaFormat', {
  value: function (...args: any[]) {
    if (args.length === 0) return this.parseNumber(`${this}`).commaFormat();
    return this.parseNumber(`${this}`).commaFormat(args[0], args[1]);
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'format', {
  value: function (...args: string[]) {
    let r = new String(this);
    for (let i = 0; i < args.length; i++) {
      r = r.replace(new RegExp('{%' + (i + 1) + '}', 'g'), args[i]);
    }
    return r;
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'isDecimal', {
  value: function () {
    return /^[+-]?\d+(\.\d+)?$/.test(this);
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'masking', {
  value: function (r = 0.3, mask = '*') {
    return this.split('')
      .map((e: string, i: number, a: Array<string>) => (i >= Math.floor(a.length - a.length * r) ? mask : e))
      .join('');
  }
});

Object.defineProperty(String.prototype, 'versionNormalize', {
  value: function (l = 3, d = 2) {
    return (
      '0'.repeat(d * l) +
      this.replace(/ /gi, '.')
        .replace(/\.+/gi, '.')
        .split('.')
        .filter((_: any, i: number) => i < l)
        .reduce((p: number, c: number, i: number) => p + Number(c) * Math.pow(Math.pow(10, d), l - 1 - i), 0)
    )
      .slice(-d * l)
      .match(new RegExp('.{1,' + d + '}', 'g'))
      ?.join('.');
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'versionToNumber', {
  value: function (l = 3, d = 2) {
    return this.versionNormalize(l, d)
      .split('.')
      .splice(0, l)
      .reduce((p: number, c: number, i: number) => p + Number(c) * Math.pow(Math.pow(10, d), l - 1 - i), 0);
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'length2', {
  value: function () {
    return Array.create(this.length, (i) => (escape(this.charAt(i)).length == 6 ? 2 : 1)).sum();
  },
  enumerable: false
});

const BASE64_TABLE_STRING = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const BASE64_TABLE = BASE64_TABLE_STRING.split('');

function atob(base64: string) {
  if (/(=[^=]+|={3,})$/.test(base64)) throw new Error('String contains an invalid character');
  base64 = base64.replace(/=/g, '');
  const n = base64.length & 3;
  if (n === 1) throw new Error('String contains an invalid character');
  const bin: any[] = [];
  for (let i = 0, j = 0, len = base64.length / 4; i < len; ++i) {
    const a = BASE64_TABLE_STRING.indexOf(base64[j++] || 'A'),
      b = BASE64_TABLE_STRING.indexOf(base64[j++] || 'A');
    const c = BASE64_TABLE_STRING.indexOf(base64[j++] || 'A'),
      d = BASE64_TABLE_STRING.indexOf(base64[j++] || 'A');
    if ((a | b | c | d) < 0) throw new Error('String contains an invalid character');
    bin[bin.length] = ((a << 2) | (b >> 4)) & 255;
    bin[bin.length] = ((b << 4) | (c >> 2)) & 255;
    bin[bin.length] = ((c << 6) | d) & 255;
  }
  return String.fromCharCode.apply(null, bin).substr(0, bin.length + n);
}

function btoa(bin: string) {
  const base64: any[] = [];
  for (let i = 0, j = 0, len = bin.length / 3; i < len; ++i) {
    const a = bin.charCodeAt(j++),
      b = bin.charCodeAt(j++),
      c = bin.charCodeAt(j++);
    if ((a | b | c) > 255) throw new Error('String contains an invalid character');
    base64[base64.length] =
      BASE64_TABLE[a >> 2] +
      BASE64_TABLE[((a << 4) & 63) | (b >> 4)] +
      (isNaN(b) ? '=' : BASE64_TABLE[((b << 2) & 63) | (c >> 6)]) +
      (isNaN(b + c) ? '=' : BASE64_TABLE[c & 63]);
  }
  return base64.join('');
}

function hexToBase64(str: any) {
  return btoa(
    String.fromCharCode.apply(
      null,
      str
        .replace(/\r|\n/g, '')
        .replace(/([\da-fA-F]{2}) ?/g, '0x$1 ')
        .replace(/ +$/, '')
        .split(' ')
    )
  );
}

function base64ToHex(base64: string) {
  const raw = atob(base64);
  let hex = '';
  for (let i = 0; i < raw.length; i++) {
    const _hex = raw.charCodeAt(i).toString(16);
    hex += _hex.length == 2 ? _hex : '0' + _hex;
  }
  return hex;
}

Object.defineProperty(String.prototype, 'fromBase64', {
  value: function () {
    return decodeURIComponent(
      atob(this)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'toBase64', {
  value: function () {
    return btoa(
      encodeURIComponent(this).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(`0x${p1}`, 16)))
    );
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'base64ToArrayBuffer', {
  value: function () {
    const binary_string = atob(this);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary_string.charCodeAt(i);
    return bytes.buffer;
  },
  enumerable: false
});

Object.defineProperty(String.prototype, 'literalText', {
  value: function () {
    return this.split('\n')
      .filter((e: string) => e)
      .map((v: string) => v.trim())
      .join('\n');
  }
});

Object.defineProperty(String.prototype, 'getExtension', {
  value: function () {
    return this.split('/').reverse()[0].split('.')[1];
  }
});
