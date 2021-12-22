// function Person(name, age) {
//   this.name = name;
//   let _age = age;

//   this.sayHi = function () {
//     console.log(`Hi I am ${this.name}(${_age}) `);
//   };
// }
const Person = (function () {
  let _age;
  function Person(name, age) {
    this.name = name;
    _age = age;
  }
  Person.prototype.sayHi = function () {
    console.log(`Hi I am ${this.name}(${_age}) `);
  };
  return Person;
})();
const me = new Person("Park", 22);
me.sayHi();
console.log(me.name, me._age); //Park , undefined

const you = new Person("Lee", 27);
you.sayHi();
console.log(you.name, you._age); //Park , undefined

me.sayHi();
