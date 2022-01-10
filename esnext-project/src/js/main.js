import "@babel/polyfill";
import { pi, power, Foo } from "./lib.js";

console.log(pi);
console.log(power(3, 4));
const f = new Foo();
console.log(f.foo(), f.bar());

console.log(
  new Promise((resolve) => {
    setTimeout(() => resolve(777), 100);
  })
);

console.log(Object.assign({}, { x: 1 }, { y: 2 }));
console.log(Array.from([1, 2, 3], (v) => v + v));
