# 24. 클로저

## 정리

### 정의

> 클로저는 함수와 그 함수가 선언된 렉시컬 환경과의 조합이다.

- 중요 키워드: **함수가 선언된 렉시컬 환경**

### 렉시컬 스코프

- 어디서 정의했는지에 따라 상위 스코프를 결정하는 것.

  - 어디서 호출했는지가 X
  - 정적 스코프라고도 함.
  - (낳은사람이 부모 O / 키운사람이 부모 X) 같은 느낌
  - 상위 스코프는 외부 렉시컬 환경에 대한 참조에 저장할 값이다.

- [[Environment]] 내부 슬롯
  - 상위 스코프를 참조하여 저장한다.
  - 함수를 정의한 실행중인 실행 컨텍스트의 렉시컬 환경을 가리킨다.
    - 정의될 때 실행중인 실행 컨텍스트가 상위 스코프이기 때문이다.
  - **상위 스코프의 평가 단계**에서 함수를 정의할 때 결정되며, **본인의 함수 평가 단게**때 **외부 렉시컬 환경에 대한 참조 결정**에 [[Environment]] 이 할당된다.

### 클로저 재정의

- 외부함수보다 중첩함수가 더 오래 유지될 때, 생명 주기 종료된 외부함수 변수 참조 가능하다. 이 때의 중첩함수를 클로저라고 한다.
- 상위 스코프 식별자 참조 필요가 없어 기억하지 않으면 클로저가 아니다.
- 외부함수가 더 오래 유지되면 일반적으로 클로저 아니다.
  - 디버깅할 때는 클로저이지만, 개념에는 부합하지 않는다.
- 상위 스코프 중 본인이 참조할 즉 필요한 식별자만 기억한다.

  - 메모리 걱정이 줄어든다.

- 클로저가 참조하는 상위 스코프의 변수: 자유 변수
- 클로저: 자유변수에 의해 묶여있는(closed) 함수

### 클로저의 활용

- 클로저는 상태를 안전하게 변경 & 유지하기위해 사용된다.
  - 상태 은닉 & 특정함수에게만 상태 변경을 허용한다.

```
//Case1. num이 은닉 X 모든 함수가 접근 가능
let num = 0;
const increase = function () {
  return ++num;
};

```

```
//Case2. num이 은닉 O increase 함수만 접근 가능
const increase = (function () {
let num = 0;
return function () {
return ++num;
};
})();
//increase 함수는 외부함수가 리턴한 중첩함수를 즉시 실행하는 함수이다. 즉 중첩함수 자체이다.

```

```

//Case3. 생성자 함수를 이용
const Counter = (function () {
let num = 0;
function Counter() {}
Counter.prototype.increase = function () {
return ++num;
};
Counter.prototype.decrease = function () {
return num !== 0 ? --num : num;
};
return Counter;
})();
const counter = new Counter();

```

```

//Case4. 함수형 프로그래밍
const increase = function (num) {
return ++num;
};
function makeCounter(predicate) {
let counter = 0;
return function () {
return (counter = predicate(counter));
};
}
const increaser = makeCounter(increase);
const decreaser = makeCounter(decrease);
console.log(increaser());
console.log(increaser());
//makeCounter함수가 반환하는 함수는 makeCounter안에서 정의되었으므로 counter을 자유 변수로 갖는다.

```

#### 캡슐화와 정보 은닉

- 캡슐화: 상태인 프로퍼티와 상태의 조작인 메서드를 하나로 묶은 것
  - 정보 은닉: 특정 프로퍼티 & 메서드를 감출 목적으로 사용할 때 부르는 용어
    - 적절치못한 접근 방지 -> 정보 보호
    - 객체 간의 결합도를 낮춘다.
- 대부분의 객체지향 언어는 private, protected, public등의 접근 제한자를 선언하여 공개 범위를 한정할 수 있다.
  - JS에서는 접근 제한자가 없다.

```
function Person(name, age) {
  this.name = name;
  let _age = age;

  this.sayHi = function () {
    console.log(`Hi I am ${this.name}(${_age}) `);
  };
}

const me = new Person("Park", 22);
me.sayHi();
console.log(me.name, me._age); // Park undefined

```

- sayHi 함수가 인스턴스마다 동일한 내용임에도 반복적으로 선언된다.
- \_age는 정보 은닉이 된다.

```
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
me.sayHi(); // Park, 22
console.log(me.name, me._age); //Park , undefined

const you = new Person("Lee", 27);
you.sayHi(); // Lee 27
console.log(you.name, you._age); //Park , undefined

me.sayHi(); // Park 27
```

- sayHi 함수를 prototype으로 교체하였더니, 인스턴스가 생성될 때마다 sayHi의 상위 스코프가 바뀌어 모든 인스턴스의 자유 변수인 age 값이 같이 바뀐다.

- 즉 JS 생성자함수에서는 `같은 함수 1번만 사용(prototype 이용) && 정보 은닉(클로저 활용) === false`이었다.
  - private 필드 정의할 수 있는 표준 사양이 제안되어 있다.

### 자주 발생하는 실수

- var은 함수 레벨 스코프이므로, 자유 변수화가 안될 수도 있다.
  - 이 때는 중첩 함수 - 외부 함수의 매개변수로 넘겨줘서 외부 함수의 스코프로 취급되게 한다.

## 느낀점

- live server & debugger; 이용한 디버깅을 배웠다.
- 클로저가 뭔지는 알고 있었지만 실행 컨텍스트와 연계하여 배우니 더욱 잘 이해하였고 3가지 예제로 살펴보며 소멸된 상위 스코프의 값을 참조할 경우에만 스코프라는 정확한 정의와 값의 안전을 위해 활용되는 지 알게되었다.
