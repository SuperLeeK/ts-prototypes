const isFunction = (f: any) => f && typeof f === 'function';

declare global {
  interface Object {
    isEqual: (obj: equalObject, depth: number) => boolean;
    deepCopy: () => unknown;
    toQueryString: () => string;
    omap: (callback: (value: any, key: string, origin: any) => void) => unknown;
    reduceObject: (callback: (prev: any, value: any, key: string, origin: any) => void, initial: any) => unknown;
    refactor: (callback: (value: any, key: string, origin: any) => void) => unknown;
  }
}

export {};

interface equalObject {
  [key: string]: number;
}
!Object.prototype.isEqual &&
  Object.defineProperty(Object.prototype, 'isEqual', {
    value: function (o: equalObject, _depth = 0) {
      if (o === null || o === undefined) return false;

      const keys1 = Object.keys(this).sort();
      const keys2 = Object.keys(o).sort();
      if (keys1.length !== keys2.length) return false; // check keys length
      if (JSON.stringify(keys1) !== JSON.stringify(keys2)) return false; // check keys same

      // compare each value
      const r1 = keys1.filter((key) => {
        // console.log( key, this[key], o[key] );
        if (typeof this[key] === 'number' && typeof o[key] === 'number' && isNaN(this[key]) === isNaN(o[key])) {
          // console.log( key, 'both are NaN');
          return true;
        } else if (this[key] === o[key]) {
          // console.log( key, ' is same' );
          return true;
        } else if (typeof this[key] === 'object' && typeof o[key] === 'object') {
          return this[key].isEqual(o[key], _depth + 1);
        }
        return false;
      }).length;
      const r2 = keys2.length;
      // console.log( {_depth, r1, r2} );
      return r1 == r2;
    },
    enumerable: false
  });

!Object.prototype.deepCopy &&
  Object.defineProperty(Object.prototype, 'deepCopy', {
    value: function () {
      let copiedObject = this;
      try {
        copiedObject = eval('(' + JSON.stringify(this) + ')');
      } catch (e) {
        console.warn(e);
        copiedObject = { ...this };
      }
      return copiedObject;
    },
    enumerable: false
  });

!Object.prototype.toQueryString &&
  Object.defineProperty(Object.prototype, 'toQueryString', {
    value: function () {
      const keys = Object.keys(this);
      return keys.length > 0 ? '?' + keys.map((key) => key + '=' + this[key]).join('&') : '';
    },
    enumerable: false
  });

!Object.prototype.omap &&
  Object.defineProperty(Object.prototype, 'omap', {
    value: function (f: (value: any, key: string, origin: any) => void) {
      if (!isFunction(f)) throw new Error('Object.prototype.omap must provided function for re map object');
      return Object.keys(this).reduce((p, key) => Object.assign(p, f(this[key], key, this)), {});
    },
    enumerable: false
  });

!Object.prototype.reduceObject &&
  Object.defineProperty(Object.prototype, 'reduceObject', {
    value: function (f: (prev: any, value: any, key: string, origin: any) => void, initial: any) {
      if (!isFunction(f)) throw new Error('Object.prototype.reduce must provided function for re map object');
      return Object.keys(this).reduce((p, key) => {
        return f(p, this[key], key, this);
      }, initial);
    },
    enumerable: false
  });

// !Object.prototype.refactor &&
//   Object.defineProperty(Object.prototype, 'refactor', {
//     value: function (f: (value: any, key: string, origin: any) => void) {
//       if (!isFunction(f)) throw new Error('Object.prototype.refactor must provided function for re map object');
//       return Object.keys(this)
//         .map((key) => f(key, this[key], this))
//         .reduce((p, c) => Object.assign(p, c), {});
//     }
//   });

// !Object.prototype.empty && Object.defineProperty(Object.prototype, 'empty',{
//   value:function(){
//     return Object.keys(this).length === 0;
//   },
//   enumerable: false
// } );
