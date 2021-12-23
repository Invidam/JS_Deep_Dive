// function Person(name, age) {
//   this.name = name;

//   this.sayHi = function () {
//     console.log(`Hi I am ${this.name}`);
//   };
// }

// const me = new Person("Park", 22);
// me.sayHi();
// console.log(me.name, me._age);

class Person {
  constructor(name = "person") {
    this.name = name;
  }
  sayHi() {
    console.log(`Hi I am ${this.name}`);
  }
  static sayHello() {
    console.log("HI");
  }
}
const me = new Person();
me.sayHi();
