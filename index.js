require('./src/index.ts');

console.log(`'ㄱ가ㅣaZ0 2'.isAbnormal(); // ${'ㄱ가ㅣaZ0 2'.isAbnormal()} ::: false`);
console.log(`'홍길동@naver.com'.astralLength(); // ${'홍길동@naver.com'.astralLength()} ::: 13`);
console.log(`'홍길동@naver.com'.astralTrunc(); // ${'홍길동@naver.com'.astralTrunc()} ::: '홍길동@naver.com'`);
console.log(`'홍길동@naver.com'.trunc(5); // ${'홍길동@naver.com'.trunc(5)} ::: '홍길동@n…'`);
console.log(`'홍길동@naver.com'.byteLength(); // ${'홍길동@naver.com'.byteLength()} ::: 19`);
console.log(`'홍길동@naver.com'.byteTrunc(10); // ${'홍길동@naver.com'.byteTrunc(10)} ::: '홍길동@…'`);
console.log(`'닭콩팥훔친집사'.replaceAt(3, '숯'); // ${'닭콩팥훔친집사'.replaceAt(3, '숯')} ::: '닭콩팥숯친집사'`);
console.log(
  `'abcdefghijklmnopqrstuvwxyz'.equalsIgnoreCase('ABCDEFGHIJKLMNOPQRSTUVWXYZ'); // ${'abcdefghijklmnopqrstuvwxyz'.equalsIgnoreCase(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  )} ::: true`
);
console.log(
  `'닭콩팥훔친집사'.toKoreanElements().join(''); // ${'닭콩팥훔친집사'
    .toKoreanElements()
    .join('')} ::: 'ㄷㅏㄺㅋㅗㅇㅍㅏㅌㅎㅜㅁㅊㅣㄴㅈㅣㅂㅅㅏ'`
);
console.log(
  `'abcdefghijklmnopqrstuvwxyz'.regexLastIndexOf(/de/, 15); // ${'abcdefghijklmnopqrstuvwxyz'.regexLastIndexOf(
    /de/,
    15
  )} ::: 3`
);
console.log(
  `'abcdefghijklmnopqrstuvwxyz'.regexIndexOf(/def/, 0); // ${'abcdefghijklmnopqrstuvwxyz'.regexIndexOf(/def/, 0)} ::: 3`
);
console.log(
  `'닭콩팥훔친집사'.toKoreanFirstElements(); // ${'닭콩팥훔친집사'.toKoreanFirstElements()} ::: 'ㄷㅋㅍㅎㅊㅈㅅ'`
);
console.log(`'닭콩팥훔친집사'[0].hasEndKoreanSyllable(); // ${'닭콩팥훔친집사'[0].hasEndKoreanSyllable()} ::: true`);
console.log(
  `'닭콩팥훔친집사'.k('받침있음', '받침없음', true); // ${'닭콩팥훔친집사'.k(
    '받침있음',
    '받침없음',
    true
  )} ::: '받침없음'`
);
console.log(`'닭콩팥훔친집사'.p('을를', true); // ${'닭콩팥훔친집사'.p('을를', true)} ::: '를'`);
console.log(
  `'닭콩팥'.withParticles('맛있다', '맛없다'); // ${'닭콩팥'.withParticles('맛있다', '맛없다')} ::: '닭콩팥맛있다'`
);
console.log(`'1234'.toSignedNumber(); // ${'1234'.toSignedNumber()} ::: 4660`);
console.log(`'abcdefg'.toCapitalize(); // ${'abcdefg'.toCapitalize()} ::: 'Abcdefg'`);
console.log(`'abcdefg'.equals('abcdefg'); // ${'abcdefg'.equals('abcdefg')} ::: true`);
console.log(
  `JSON.stringify(stringQuery.queryStringToObject()); // ${JSON.stringify(
    'query?String=yes'.queryStringToObject()
  )} ::: JSON.stringify({ 'query?String': 'yes' })`
);
console.log(`'123,456,789'.parseNumber(); // ${'123,456,789'.parseNumber()} ::: 123456789`);
console.log(`'1234567890'.commaFormat(); // ${'1234567890'.commaFormat()} ::: '1,234,567,890'`);
console.log(
  `'{%1}김치{%2}찌개'.format('돼지', '고기'); // ${'{%1}김치{%2}찌개'.format('돼지', '고기')} ::: '돼지김치고기찌개'`
);
console.log(`'1234567890'.isDecimal(); // ${'1234567890'.isDecimal()} ::: true`);
console.log(`'닭콩팥훔친집사'.masking(0.5, ','); // ${'닭콩팥훔친집사'.masking(0.5, ',')} ::: '닭콩팥,,,,'`);
console.log(`'1.0.2'.versionNormalize(4, 3); // ${'1.0.2'.versionNormalize(4, 3)} ::: '001.000.002.000'`);
console.log(`'1.0.2'.versionToN Number('001000002'); // ${'1.0.2'.versionToNumber(3, 3)}`);
console.log(`'123456감@'.length2(); // ${'123456감@'.length2()} ::: 9`);
console.log(`'6rCA6rCA7Zi47Zi4'.fromBase64(); // ${'6rCA6rCA7Zi47Zi4'.fromBase64()} ::: '가가호호'`);
console.log(`'가가호호'.toBase64(); // ${'가가호호'.toBase64()} ::: '6rCA6rCA7Zi47Zi4'`);
console.log(
  `JSON.stringify('6rCA6rCA7Zi47Zi4'.base64ToArrayBuffer(); // ${JSON.stringify(
    '6rCA6rCA7Zi47Zi4'.base64ToArrayBuffer()
  )} ::: '{}'`
);
console.log(`'닭콩팥\\n훔친집사'.literalText(); // ${'닭콩팥\n훔친집사'.literalText()} ::: \`닭콩팥\\n훔친집사\``);
console.log(`'ts-prototypes.git'.getExtension(); // ${'ts-prototypes.git'.getExtension()} ::: 'git'`);

process.exit();
