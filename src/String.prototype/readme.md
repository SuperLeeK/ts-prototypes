# String

## isAbnormal

- Check if string is abnormal

  ```
  'ㄱ가ㅣaZ0 2'.isAbnormal();                                 // false
  ```

## astralLength

- Returns the length of a string according to astral format

  ```
  '홍길동@naver.com'.astralLength();                          // 13
  ```

## astralTrunc

- Leaves the string up to the specified number of digits according to the astral format and returns the rest in the specified unit

  ```
  '홍길동@naver.com'.astralTrunc();                           // 홍길동@naver.com
  ```

## trunc

- Leaves the string up to the specified number of digits and returns the rest in the specified unit

  ```
  '홍길동@naver.com'.trunc(5);                                // 홍길동@n…
  ```

## byteLength

- Returns the length of a string according to the byte format

  ```
  '홍길동@naver.com'.byteLength();                            // 19
  ```

## byteTrunc

- Depending on the byte format, the string is left up to the specified number of digits and the rest is returned in the specified unit.

  ```
  '홍길동@naver.com'.byteTrunc(10);                           // 홍길동@…
  ```

## replaceAt

- Convert the value of the specified index to the set value

  ```
  '닭콩팥훔친집사'.replaceAt(3, '숯');                             // 닭콩팥숯친집사
  ```

## equalsIgnoreCase

- ( english ) Compare case insensitively

  ```
  'abcdefghijklmnopqrstuvwxyz'.equalsIgnoreCase(
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    );                                                     // true
  ```

## toKoreanElements

- ( korean ) All letters are separated into initial consonants, neutral consonants, and final consonants.

  ```
  '닭콩팥훔친집사'.toKoreanElements().join('');            // ㄷㅏㄺㅋㅗㅇㅍㅏㅌㅎㅜㅁㅊㅣㄴㅈㅣㅂㅅㅏ
  ```

## regexLastIndexOf

- lastIndexOf using regex

  ```
  'abcdefghijklmnopqrstuvwxyz'.regexLastIndexOf(/de/, 15); // 3
  ```

## regexIndexOf

- indexOf using regex

  ```
  'abcdefghijklmnopqrstuvwxyz'.regexIndexOf(/def/, 0);     // 3
  ```

## toKoreanFirstElements

- ( korean ) returns only the first consonant of the word

  ```
  '닭콩팥훔친집사'.toKoreanFirstElements();                // ㄷㅋㅍㅎㅊㅈㅅ
  ```

## hasEndKoreanSyllable

- ( english ) Check if there is a base.

  ```
  '닭'.hasEndKoreanSyllable();              // true
  '사'.hasEndKoreanSyllable();              // false
  ```

## k

- ( korean ) Returns a string depending on whether it is supported or excluded.

  ```
  '사'.k('받침있음', '받침없음', true);        // '받침없음'
  ```

## p

- ( korean ) Returns a grammatically correct value depending on whether it is supported according to KoreanFormat.

  - KoreanFormat

    | key  | value  |
    | ---- | ------ |
    | 을를 | '을를' |
    | 은는 | '은는' |
    | 이가 | '이가' |
    | 과와 | '과와' |
    | 으로 | '으로' |

  ```
  '사'.p('을를', true);                        // 를
  ```

## withParticles

- ( korean ) Adds the specified string depending on whether it is supported and returns it.

  ```
  '팥'.withParticles('맛있다', '맛없다');              // 팥맛있다
  ```

## toSignedNumber

- Converts to signed Number and returns it.

  ```
  '1234'.toSignedNumber();                                 // 4660
  ```

## toCapitalize

- ( english ) Changes the first letter of a string to upper case.

  ```
  'abcdefg'.toCapitalize();                                // Abcdefg
  ```

## equals

- Checks if two strings match.

  ```
  'abcdefg'.equals('abcdefg');                             // true
  ```

## queryStringToObject

- Convert querystring to object.

  ```
  JSON.stringify('query?String=yes'.queryStringToObject());       // {"query?String":"yes"}
  ```

## parseNumber

- Convert to number.

  ```
  '123,456,789'.parseNumber();                             // 123456789
  ```

## commaFormat

- Converts to a number format that includes , .

  ```
  '1234567890'.commaFormat();                              // 1,234,567,890
  ```

## format

- Use {%n} to add a string to the specified location.

  ```
  '{%1}김치{%2}찌개'.format('돼지', '고기');               // 돼지김치고기찌개
  ```

## isDecimal

- Check if it is decimal.

  ```
  '1234567890'.isDecimal();                                // true
  ```

## masking

- Leaves only up to the specified number of digits and returns the rest in the specified unit

  ```
  '닭콩팥훔친집사'.masking(0.5, ',');                      // 닭콩팥,,,,
  ```

## versionNormalize

- Returns the version number as a string with the specified length and number

  ```
  '1.0.2'.versionNormalize(4, 3);                          // 001.000.002.000
  ```

## length2

- version number. Excluding , returns the specified length and number

  ```
  '123456감@'.length2();                                    // 9
  ```

## fromBase64

- Decoding a string written in base64 grammar

  ```
  '6rCA6rCA7Zi47Zi4'.fromBase64();                         // 가가호호
  ```

## toBase64

- encoding with base64 syntax

  ```
  '가가호호'.toBase64();                                   // 6rCA6rCA7Zi47Zi4
  ```

## base64ToArrayBuffer

- ```
  JSON.stringify('6rCA6rCA7Zi47Zi4'.base64ToArrayBuffer(); // {}
  ```

## literalText

- String to literalText

  ```
  '닭콩팥\n훔친집사'.literalText();
                                                           // 닭콩팥
  훔친집사
  ```

## getExtension

- Extract and return the extension

  ```
  'ts-prototypes.git'.getExtension();                      // git
  ```
