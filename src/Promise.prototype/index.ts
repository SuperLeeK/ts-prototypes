export {};

declare global {
  interface PromiseConstructor {
    delay: (ms: number) => Promise<any>;
  }
}

Promise.delay = function (delay) {
  if (delay <= 0) return Promise.resolve();
  return new Promise((r) => {
    const t = setTimeout(() => {
      r(undefined);
      clearTimeout(t);
    }, delay);
  });
};
