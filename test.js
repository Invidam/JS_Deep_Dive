let [pre, cur] = [0, 1];
console.log(pre, cur);
let n = 10;
while (n--) {
  [pre, cur] = [cur, pre + cur];
  console.log(pre, cur);
}
const fibonacci = function (max) {
  return {
    [Symbol.iterator]() {
      let pre = 0,
        cur = 1;
      return {
        next() {
          [pre, cur] = [cur, pre + cur];
          return { value: cur, done: cur > max };
        },
      };
    },
  };
};

for (const num of fibonacci(100)) console.log(num);
