declare global {
  interface Function {
    ubind: (who: any, i: number, ...vi: any[]) => () => void;
  }
}

// ubind - unique bind
!Function.prototype.ubind &&
  Object.defineProperty(Function.prototype, 'ubind', {
    value: function (who: any, i = 1000, ...v1: any[]) {
      const f = this;
      if (!who) who = f;
      return function (...v2: any[]) {
        if (f.__ut__) return;
        f.__ut__ = setTimeout(function () {
          clearTimeout(f.__ut__);
          delete f.__ut__;
        }, i);
        f.apply(
          who,
          [undefined].concat(v1, v2).filter((e) => e !== undefined)
        );
      };
    },
    enumerable: false
  });
export {};
