# Array.prototype

## \[static\] Array.create(number, \[generator(index)=>element\])
- Create Array with count

  ```
  Array.create(3);                                            // [ undefined, undefined, undefined ]
  Array.create(3, 0);                                         // [ 0, 0, 0 ]
  Array.create(3, i => i);                                    // [ 0, 1, 2 ]
  ```

## \[static\] Array.copy(array)
- Deep Copy Array using JSON

  ```
  const firstArray = [ 0, 1, 2 ];
  const secondArray = Array.copy( firstArray );
  console.log(firstArray === secondArray);                    // false
  ```

## copy()
- Deep Copy Array using JSON

  ```
  const firstArray = [ 0, 1, 2 ];
  const secondArray = firstArray.copy();
  console.log(firstArray === secondArray);                    // false
  ```

## unique()
- Make Array element be Unique

  ```
  [ 1, 1, 2, 2, 3, 4, 5 ].unique();                           // [ 1, 2, 3, 4, 5 ]
  ```

## diff(Array)
- Check difference with another array.
- Returns an array of different elements.

  ```
  [ 1, 2, 3 ].diff([ 1, 2, 5 ]);                              // [ 3, 5 ]
  ```

## bringFirst
- Bring element as first

  ```
  [ 1, 2, 3 ].bringfirst( 3 );                                // [ 3, 1, 2 ]
  ```

## sendBack( target Index or callback function )
- Send element to Back

  ```
  [ 1, 2, 3 ].sendBack( 1 );                                  // [ 2, 3, 1 ]
  [ 1, 2, 3 ].sendBack((e) => e === 2 );                      // [ 1, 3, 2 ]
  ```

## findObject( target object )
- Check exist target object in this
- Return

  ```
  [ 1, { a: '4' }, 5 ].findObject({ a: '4' });                // { a: '4' }
  ```

## filterObject( target object )
- Create array with find object

  ```
  [ 1, { a: '4' }, 5 ].findObject({ a: '4' });                // [ { a: '4' } ]
  ```

## removeObject
- Remove all matched element as input.

  ```
  [ 1, 2, 3, 1, 2 ].removeObject( 1 );                        // [ 2, 3, 2 ]
  ```

## split
- Create 2-dimensional array with split each target length

  ```
  [ 1, 2, 3, 4, 5, 6 ].split(2);                              // [ [ 1, 2 ], [ 3, 4 ], [ 5, 6 ] ]
  [ 1, 2, 3, 4, 5, 6 ].split(4);                              // [ [ 1, 2, 3, 4 ], [ 5, 6 ] ]
  ```

## inArray
- Check target is exist in array or not

  ```
  [ 'a', 'b', 'c' ].inArray('c');                             // true
  [ 'a', 'b', 'c' ].inArray('g');                             // false
  ```
## countIf
- Count matched elements

  ```
  [ 1, 2, 3 ].countIf( 3 );                                   // 1
  [ 1, 2, 3 ].countIf((e) => e % 2 === 0 );                   // 1
  ```
## in
- Check array has element

  ```
  [ 1, 2, 3 ].in( 4 );                                        // false
  ```
## first
- Get array's first element

  ```
  [ 1, 2, 3 ].first();                                        // 1
  ```
## last
- Get array's last element

  ```
  [ 1, 2, 3 ].last();                                         // 3
  ```
## joinArray
- It works like Array.prototypes.join
- But return array

  ```
  [ 1, 2, 3 ].joinArray('kim');                               // [ 1, 'kim', 2, 'kim', 3 ]
  ```
## shuffle
- Mix randomly array

  ```
  [ 1, 2, 3 ].shuffle();                                      // [ 3, 2, 1 ]
  [ 1, 2, 3 ].shuffle();                                      // [ 2, 1, 3 ]
  ```
## IamLucky
- Get some element by randomly

  ```
  [ 1, 2, 3 ].IamLucky();                                     // 2
  [ 1, 2, 3 ].IamLucky();                                     // 1
  ```
## limit
- Limit the length of the array

  ```
  [ 1, 2, 3, 4, 5 ].limit(2);                                 // [ 1, 2 ]
  ```
## max
- Returns the element with the largest value in an array.

  ```
  [ 2, 1, 5, 4 ].max();                                       // 5
  ```
## min
- Returns the element with the smallest value in an array.

  ```
  [ 2, 1, 5, 4 ].min();                                       // 1
  ```
## sum
- Add all the values in an array

  ```
  [ 2, 1, 5, 4 ].sum();                                       // 12
  ```
## sumTo
- Adds all values in an array up to the specified index position according to the specified condition.

  ```
  [ 2, 1, 5, 4 ].sumTo(0, (v) => (v % 2 === 0 ? v + 1 : v));  // 3
  [ 2, 1, 5, 4 ].sumTo(1, (v) => (v % 2 === 0 ? v + 1 : v));  // 4
  [ 2, 1, 5, 4 ].sumTo(2, (v) => (v % 2 === 0 ? v + 1 : v));  // 9
  [ 2, 1, 5, 4 ].sumTo(3, (v) => (v % 2 === 0 ? v + 1 : v));  // 14
  ```
## avg
- Averages the elements of an array

  ```
  [ 1, 2, 3 ].avg();                                          // 2
  ```
## multiply
- Returns an array multiplied by n times

  ```
  [ 1, 2, 3 ].multiply(2);                                    // [ 1, 2, 3, 1, 2, 3 ]
  ```
## move
- Moves the element of the array from index p to index c.

  ```
  [ 1, 2, 3 ].move(0, 2);                                     // [ 2, 3, 1 ]
  ```
## reduceSome
- educe array until return undefined

  ```
  [ 6, 2, 1, 5 ].reduceSome((acc, item) => acc + item, 0);    // 14
  ```
## mapSome
- Map new array until return undefined

  ```
  [ 6, 2, 1, 5 ].mapSome((item) => item * 2);                 // [ 12, 4, 2, 10 ]
  ```
