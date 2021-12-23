class Animal {
  constructor(age, weight) {
    this.age = age;
    this.weight = weight;
  }
  testValue = 123;
  eat() {
    return "eat";
  }
  move() {
    return "move";
  }
  info() {
    return this.age + ", " + this.weight;
  }
}

class Bird extends Animal {
  fly() {
    return "fly";
  }
}
const ani = new Animal(20, 30);
const bird = new Bird(5, 3);
const bird2 = new Bird(6, 30);

// console.log(bird.eat());
// console.log(bird.fly());
// console.log(bird.info());

// console.log(bird.info());
// console.log(bird2.info());

console.log(ani.testValue);
console.log(bird.testValue);
console.dir(ani);
console.dir(bird);

Bird.testValue = 321;

console.log(ani.testValue);
console.log(bird.testValue);

console.dir(ani);
console.dir(bird);

constructor(a,b,c) {super(a,b); this.c = c}