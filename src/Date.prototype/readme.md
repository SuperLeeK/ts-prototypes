# Date

## add

- Returns after adding or subtracting the specified unit and number from one date (changing the existing data)

  ```
  new Date().add('y', 3);                          // Sun Jan 18 2026 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('year', 3);                       // Sun Jan 18 2026 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('q', 3);                          // Wed Oct 18 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('quarter', 3);                    // Wed Oct 18 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('mon', 3);                        // Tue Apr 18 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('m', 3);                          // Tue Apr 18 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('month', 3);                      // Tue Apr 18 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('w', 3);                          // Wed Feb 08 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('week', 3);                       // Wed Feb 08 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('d', 3);                          // Sat Jan 21 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('day', 3);                        // Sat Jan 21 2023 17:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('h', 3);                          // Wed Jan 18 2023 20:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('hour', 3);                       // Wed Jan 18 2023 20:42:53 GMT+0900 (대한민국 표준시)
  new Date().add('i', 3);                          // Wed Jan 18 2023 17:45:53 GMT+0900 (대한민국 표준시)
  new Date().add('min', 3);                        // Wed Jan 18 2023 17:45:53 GMT+0900 (대한민국 표준시)
  new Date().add('minute', 3);                     // Wed Jan 18 2023 17:45:53 GMT+0900 (대한민국 표준시)
  new Date().add('s', 3);                          // Wed Jan 18 2023 17:42:56 GMT+0900 (대한민국 표준시)
  new Date().add('sec', 3);                        // Wed Jan 18 2023 17:42:56 GMT+0900 (대한민국 표준시)
  new Date().add('second', 3);                     // Wed Jan 18 2023 17:42:56 GMT+0900 (대한민국 표준시)
  ```

## format

- Specifies the notational data format of a date and returns it as a string

  ```
  new Date().format('yyyy-MM-dd');                 // 2023-01-18
  ```

## isToday

- check if it's today

  ```
  new Date('2023-01-18').isToday();                // true
  ```

## inMonth

- Check if it is between two specified dates ( up to months )

  ```
  new Date().inMonth(
    new Date('2023-01-01'),
    new Date('2023-12-31')
  );                                               // false
  ```

## inDate

- Check if falls between two specified dates (up to days)

  ```
  new Date().inDate(
    new Date('2023-01-01'),
    new Date('2023-12-31')
  );                                               // false
  ```

## isEuqalYear

- Check if the specified date and year are the same

  ```
  new Date().isEqualYear(new Date('2023-09-18'));  // true
  ```

## isEqualMonth

- Check if the specified date and month are the same

  ```
  new Date().isEqualMonth(new Date('2002-01-18')); // false
  ```

## isEqualDay

- Check if the specified date and Day are the same

  ```
  new Date().isEqualDay(new Date('2002-09-18'));   // false
  ```
