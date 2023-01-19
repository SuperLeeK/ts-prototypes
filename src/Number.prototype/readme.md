# Number

## hhmm

- Number to Time string with hh:mm format

  ```
  Number(36400000).hhmm();                   // '10:06'
  ```

## hmm

- Number to Time string with h:mm format

  ```
  Number(36400000).hmm();                    // '10:06'
  ```

## hhmmss

- Number to Time string with hh:mm:ss format

  ```
  Number(36400000).hhmmss();                 // '10:06:40'
  ```

## zf

- Fill with 0 by the specified number

  ```
  Number(123456).zf(8);                      // '00123456'
  ```

## efa

- Fill with empty(' ') by the specified number ( backwards )

  ```
  Number(123456).efa(8);                     // '123456  '
  ```

## ef

- Fill with empty(' ') by the specified number ( forwards )

  ```
  Number(123456).ef(8);                      // '  123456'
  ```

## digitalFormat

- convert numbers to digital format

  ```
  Number(123456).digitalFormat();            // '123,456'
  ```

## fileSizeWithUnit

- File Size with unit

  ```
  Number(123456).fileSizeWithUnit(false, 2); // '120.56KB'
  ```

## commaFormat

- Change the specified number to an expression containing ,

  ```
  Number(123456).commaFormat();              // '123,456'
  ```

## currencyUnit

- (korean) Change the specified number to an expression containing , and return it according to the current unit

  ```
  Number(123456).currencyUnit(true, 2);      // '123,456원'
  ```

## convertNumber

- (korean) convert number

  ```
  Number(123456).convertNumber({
    isUnit: true,
    unitSpace: 1,
    isKorean: true,
    isComma: false
  });                                        // '일십이만 삼천사백오십육'
  ```
