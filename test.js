const iterable = {
  [Symbol.iterator]() {
    let pre = 0,
      curr = 1;
    let max = 100;
    return {
      next() {
        [pre, curr] = [curr, pre + curr];
        return { value: curr, done: curr > max };
      },
    };
  },
};

for (const num of iterable) console.log(num);
