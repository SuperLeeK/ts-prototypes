# Object

## deepCopy
- Deep copy the object (same)

  ```
  const newObj = { foo: 'bar', hello: 'world' }.deepCopy(); // { foo: 'bar', hello: 'world' }
  ```
## isEqual
- Compare objects A and B to see if they are equal.

  ```
  { foo: 'bar', hello: 'world' }.isEqual(newObj);           // true
  ```
## toQueryString
- Make json to queryString style

  ```
  { foo: 'bar', hello: 'world' }.toQueryString();           // ?foo=bar&hello=world
  ```
## omap
- It works like Array.prototype.map as object

  ```
  - {
    return { [value]: key };
  });                                                       // { bar: 'foo', world: 'hello' }
  ```
## reduceObject
- It works like Array.prototype.reduce as object

  ```
  - {
    prev[value] = key;
    return prev;
  }, {});                                                   // { '2948': 'bar', '34534': 'foo' }
  ```
