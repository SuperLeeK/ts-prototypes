const isFunction = (f: any) => f && typeof f === 'function';
declare global {
  interface Array<T> {
    map(
      callback: (value: T, index: number, array: T[]) => any,
      thisArg?: any,
      start?: number,
      end?: number
    ): Array<any>;
    pushIfNotExist(e: any): Array<any>;
    copy(): Array<any>;
    unique(simpleUniqueAlgorithm?: boolean): Array<any>;
    diff(a: Array<any>): Array<any>;
    removeObject(e: any): Array<any>;
    bringFirst(arg: any): Array<any>;
    sendBack(arg: any): Array<any>;
    findObject(object: any): any;
    filterObject(object: any): Array<any>;
    sortObject(key: string, desc?: boolean): Array<any>;
    split(array: Array<any>, length: number): Array<any>;
    inArray(array: Array<any>): boolean;
    countIf(callback: () => void): number;
    in(value: any): boolean;
    first(): any;
    last(): any;
    joinArray(array: Array<any>): Array<any>;
    shuffle(): Array<any>;
    IamLucky(): any;
    limit(start: number, end: number): Array<any>;
    max(): number;
    min(): number;
    sum(f?: any | ((c: any, i: number, a: any) => void | number)): number;
    sumTo(to: any, f?: any | ((c: any, i: number, a: any) => void | number)): number;
    avg(): number;
    multiply(): number;
    move(from: number, to: number): Array<any>;
    reduceSome(callback: () => void, initialValue: any): any;
    mapSome(callback: () => void): Array<any>;
  }
  interface ArrayConstructor {
    create(length: number, initiallier: (init: any) => void): Array<any>;
    copy(array: Array<any>): Array<any>;
  }
}

Array.create = (length, initiallier) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    if (typeof initiallier === 'function') {
      array.push(initiallier(i));
    } else {
      array.push(initiallier);
    }
  }
  return array;
};

Array.copy = (array) => {
  if (!array) return [];
  return JSON.parse(JSON.stringify(array));
};

!Array.prototype.copy &&
  Object.defineProperty(Array.prototype, 'copy', {
    value: function () {
      return JSON.parse(JSON.stringify(this));
    },
    enumerable: false
  });
/*
array unique
*/
type ISimpleUniqueAlgorithm = boolean | ((s: any) => void);
!Array.prototype.unique &&
  Object.defineProperty(Array.prototype, 'unique', {
    value: function (simpleUniqueAlgorithm: ISimpleUniqueAlgorithm = true) {
      if (typeof simpleUniqueAlgorithm === 'function')
        return this.reduce(
          (p: any, c: any) =>
            p.find((d: any) => simpleUniqueAlgorithm(d) == simpleUniqueAlgorithm(c)) ? p : [...p, c],
          []
        );
      else if (simpleUniqueAlgorithm) return this.reduce((p: any, c: any) => p.concat(p.indexOf(c) < 0 ? c : []), []);
      else return Array.from(new Set(this.map(JSON.stringify))).map((e: any) => JSON.parse(e));
      // return this.reduce((p,c)=>p.concat(p.map(f).indexOf(f(c))<0?c:[]),[]);
    },
    enumerable: false
  });

!Array.prototype.diff &&
  Object.defineProperty(Array.prototype, 'diff', {
    value: function (a: any[]) {
      return this.filter((i: number) => a.indexOf(i) < 0).concat(a.filter((i: number) => this.indexOf(i) < 0));
    },
    enumerable: false
  });

/*
array remove object
*/
!Array.prototype.removeObject &&
  Object.defineProperty(Array.prototype, 'removeObject', {
    value: function (e: any) {
      // console.warn( `removeObject before - [${this.join('\n')}]}`);
      while (this.indexOf(e) >= 0) {
        const i = this.indexOf(e);
        // console.warn( `find ${e} at ${i}`);
        if (i < 0) break;
        this.splice(i, 1);
      }
      // console.warn( `removeObject after - [${this.join('\n')}]}`);
      return this;
    },
    enumerable: false
  });

!Array.prototype.bringFirst &&
  Object.defineProperty(Array.prototype, 'bringFirst', {
    value: function (arg: any) {
      const a = [];
      let _foundIndex = -1;
      // find target elementh using callback or index
      this.forEach((e: any, i: number) => {
        if ((arg instanceof Function && arg(this[i], i, this)) || (typeof arg === 'number' && arg == i))
          _foundIndex = i;
        else a.push(this[i]);
      });

      if (_foundIndex > -1) a.unshift(this[_foundIndex]);

      return a;
    },
    enumerable: false
  });

!Array.prototype.sendBack &&
  Object.defineProperty(Array.prototype, 'sendBack', {
    value: function (arg: any) {
      const a = [];
      let _foundIndex = -1;
      // find target elementh using callback or index

      this.forEach((e: any, i: number) => {
        if ((arg instanceof Function && arg(this[i], i, this)) || (typeof arg === 'number' && arg == i))
          _foundIndex = i;
        else a.push(this[i]);
      });
      if (_foundIndex > -1) a.push(this[_foundIndex]);

      return a;
    },
    enumerable: false
  });

!Array.prototype.findObject &&
  Object.defineProperty(Array.prototype, 'findObject', {
    value: function (object: any) {
      return this.find((o: any) => {
        return (
          Object.keys(o).filter((oe) => typeof object[oe] !== 'undefined' && o[oe] == object[oe]).length ==
          Object.keys(object).length
        );
      });
    },
    enumerable: false
  });

!Array.prototype.filterObject &&
  Object.defineProperty(Array.prototype, 'filterObject', {
    value: function (object: any) {
      return this.filter((o: any) => {
        return (
          Object.keys(o).filter((oe) => typeof object[oe] !== 'undefined' && o[oe] == object[oe]).length ==
          Object.keys(object).length
        );
      });
    },
    enumerable: false
  });

!Array.prototype.split &&
  Object.defineProperty(Array.prototype, 'split', {
    value: function (s = 2) {
      const _list: any[] = [];
      this.forEach((e: any, i: number) => {
        const j = parseInt(Math.floor(i / s).toString());
        _list[j] ? _list[j].push(e) : _list.push([e]);
      });
      return _list;
    },
    enumerable: false
  });

!Array.prototype.inArray &&
  Object.defineProperty(Array.prototype, 'inArray', {
    value: function (value: any) {
      for (let i = 0; i < this.length; i++) {
        if (this[i] === value) {
          return true;
        }
      }
      return false;
    },
    enumerable: false
  });

!Array.prototype.countIf &&
  Object.defineProperty(Array.prototype, 'countIf', {
    value: function (v: any) {
      if (typeof v == 'function') return this.filter(v).length;
      else return this.filter((o: any) => v === o).length;
    },
    enumerable: false
  });

!Array.prototype.in &&
  Object.defineProperty(Array.prototype, 'in', {
    value: function (value: any) {
      return this.filter((v: any) => v === value).length > 0;
    },
    enumerable: false
  });

!Array.prototype.first &&
  Object.defineProperty(Array.prototype, 'first', {
    value: function () {
      return this.length > 0 ? this[0] : undefined;
    },
    enumerable: false
  });

!Array.prototype.last &&
  Object.defineProperty(Array.prototype, 'last', {
    value: function () {
      return this.length > 0 ? this[this.length - 1] : null;
    },
    enumerable: false
  });

!Array.prototype.joinArray &&
  Object.defineProperty(Array.prototype, 'joinArray', {
    value: function (joinner: any) {
      this.forEach((e: any, i: number) => {
        if (typeof joinner === 'function') this.splice(i + i + 1, 0, joinner(i));
        else this.splice(i + i + 1, 0, joinner);
      });
      this.pop();
      return this;
    },
    enumerable: false
  });

!Array.prototype.shuffle &&
  Object.defineProperty(Array.prototype, 'shuffle', {
    value: function () {
      const random = this.map((v: any) => ({ v, r: Math.random() }));
      return random.sort((a: any, b: any) => a.r - b.r).map((v: any) => v.v);
    },
    enumerable: false
  });

!Array.prototype.IamLucky &&
  Object.defineProperty(Array.prototype, 'IamLucky', {
    value: function () {
      return this.shuffle().first();
    },
    enumerable: false
  });

!Array.prototype.limit &&
  Object.defineProperty(Array.prototype, 'limit', {
    value: function (start: number, count: number) {
      return this.map((e: any) => e).splice(start, count == -1 ? this.length : count);
    },
    enumerable: false
  });

!Array.prototype.flat &&
  Object.defineProperty(Array.prototype, 'flat', {
    value: function (deep: number) {
      return deep > 0
        ? this.reduce((acc: any, val: any) => acc.concat(Array.isArray(val) ? val.flat(deep - 1) : val), [])
        : this.slice();
    },
    enumerable: false
  });

!Array.prototype.max &&
  Object.defineProperty(Array.prototype, 'max', {
    value: function (f: any) {
      return isFunction(f)
        ? this.reduce((p: any, c: any, i: number, a: any[]) => {
            const v = f(c, i, a);
            return v !== undefined ? Math.max(p, c) : p, Number.MIN_SAFE_INTEGER;
          })
        : this.reduce((p: any, c: any) => (c !== undefined ? Math.max(p, c) : p), Number.MIN_SAFE_INTEGER);
    },
    enumerable: false
  });

!Array.prototype.min &&
  Object.defineProperty(Array.prototype, 'min', {
    value: function (f: any) {
      return isFunction(f)
        ? this.reduce((p: any, c: any, i: number, a: any[]) => {
            const v = f(c, i, a);
            return v !== undefined ? Math.min(p, c) : p, Number.MAX_SAFE_INTEGER;
          })
        : this.reduce((p: any, c: any) => (c !== undefined ? Math.min(p, c) : p), Number.MAX_SAFE_INTEGER);
    },
    enumerable: false
  });

!Array.prototype.sum &&
  Object.defineProperty(Array.prototype, 'sum', {
    value: function (f: any | ((c: any, i: number, a: any) => void | number)) {
      return isFunction(f)
        ? this.reduce((p: any, c: any, i: number, a: any[]) => p + f(c, i, a), 0)
        : this.reduce((p: any, c: any) => p + c, 0);
    },
    enumerable: false
  });

!Array.prototype.sumTo &&
  Object.defineProperty(Array.prototype, 'sumTo', {
    value: function (to: any, f: any | ((c: any, i: number, a: any) => void | number)) {
      return isFunction(f)
        ? this.map(f).reduce((p: any, c: any, i: number) => (i - 1 < to ? p + c : p), 0)
        : this.reduce((p: any, c: any, i: number) => (i - 1 < to ? p + c : p), 0);
    },
    enumerable: false
  });

!Array.prototype.avg &&
  Object.defineProperty(Array.prototype, 'avg', {
    value: function (func: any) {
      return this.sum(func) / this.length;
    },
    enumerable: false
  });

!Array.prototype.multiply &&
  Object.defineProperty(Array.prototype, 'multiply', {
    value: function (n: any, f: any) {
      if (this.length == 0) return this;
      return Array.create(n * this.length, (i) => (isFunction(f) ? f(this[i % this.length]) : this[i % this.length]));
    },
    enumerable: false
  });

!Array.prototype.move &&
  Object.defineProperty(Array.prototype, 'move', {
    value: function (from: any, to: any) {
      this.splice(to, 0, this.splice(from, 1)[0]);
      return this;
    },
    enumerable: false
  });

/**
 * reduceSome
 * @author Alex
 * @description reduce array until return undefined
 * @param {function} callback
 * @param {any} initial
 * @returns {any} accumulated
 */
!Array.prototype.reduceSome &&
  Object.defineProperty(Array.prototype, 'reduceSome', {
    value: function (f: any, initial: any) {
      if (!isFunction(f)) {
        throw new Error('reduceSome must provided function');
      }
      let acc = initial;
      this.some((e: any, i: number) => {
        const result = f(acc, this[i], i, this);
        if (result === undefined) return true;
        acc = result;
      });
      return acc;
    }
  });

/**
 * @name mapSome
 * @author Alex
 * @description map new array until return undefined
 * @param {function} callback
 * @returns {Array} mapped Array
 */
!Array.prototype.mapSome &&
  Object.defineProperty(Array.prototype, 'mapSome', {
    value: function (f: any) {
      if (!isFunction(f)) {
        throw new Error('mapSome must provided function');
      }
      const mapped: any[] = [];
      this.some((e: any, i: number) => {
        const result = f(this[i], i, this);
        if (typeof result === 'undefined') return true;
        mapped.push(result);
      });
      return mapped;
    }
  });

export {};
