# 33. Symbol

## 정리

- Symbol: ES6에서 새로 도입된 원시값 데이터 타입이다.
  - 다른 값과 중복되지않는 유일한 값이다.
  - 충돌 위험이 없는 유일한 값을 나타내기 위해 사용한다.

### 생성자 함수

- `const symbol = Symbol(description);`
  - new 연산자는 사용되지 않는다.
  - 타입변환이 일어나지 않는다.
  - description은 디버깅 용도이다.
    - 값에 영향 X

### Symbol.for

- Symbol.for(key) 메서드는 인수로 받은 문자열을 키로하여, 전역 심벌 레지스트리에서 일치하는 심벌 값을 검색한다.
  - 검색 성공시, 검색된 값을 반환한다.
  - 검색 실패시, 새로운 심벌을 생성한 후 전역 심벌 레지스트리에 등록하며, 그 심벌을 반환한다.
- `Symbol()`로 생성한 심벌은 전역 심벌 레지스트리에 등록되지 않는다.

- Symbol.keyFor(var) : 전역 심벌 레지스트리에 등록된 심벌 값의 키를 추출한다.

### 심벌과 상수

- 값 자체에 의미가 없고 구분하기 위한 상수 자체가 목적인 경우에 중복될 가능성이 없는 심벌을 사용할 수 있다.

  - Ex) UP,DOWN,LEFT,RIGHT / RED, BLUE, BLACK, WHITE 등

### 심벌과 프로퍼티

- 프로퍼티의 키로도 가능하다.

  - `[Symbol.for('desc')]` 처럼 키를 갖는다.

- 은닉가능하다.
  - 단, `Object.getOwnPropertySymbols()` 에 의해 드러난다.

### 빌트인 객체 확장

- 빌트인 객체에 커스텀 메서드를 추가하는 것은 권장되지 않는다.
  - 새로운 버전과 충돌날 수 있기 때문이다.
  - 이러한 경우, 심벌을 키로하여 메서드를 생성할 수 있다.

### 심벌 빌트인

- 빌트인 심벌을 Well known Symbol이라고도 한다.
  - Symbol.iterator 등이 있다.

## 느낀점

- 충돌 위험을 없애는 유일한 방법은 아니다.
  - uuid같은 방법도 존재한다.
- 유일한 점들

  - 유일한 통로
    - 문자열의 경우 `["inde" + "x"]` 같은 방식으로도 접근이 가능하지만 심벌은 하나의 방법만으로 접근이 가능함
  - 값을 가지지 않음

- 빈번히 쓰이진 않는다고 한다.
  - https://ko.javascript.info/symbol 참조

# 34. 이터러블

## 정리

### 이터레이션 프로토콜

```
const iterable = {
  [Symbol.iterator]() {
    let pre = 0,
      cur = 1;
    let max = 100;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { value: cur, done: cur > max };
      },
    };
  },
};

for (const num of iterable) console.log(num);

```

- 간단한 예시이다.
-
- **Iteration** protocol: iterable한 자료구조라면 있어야 하는 규칙

  - **Iterable** protocol: Symbol.iterator을 호출시 **Iterator** 프로토콜을 준수한 이터레이터를 반환할 경우 만족되는 프로토콜
  - **Iterator** protocol: 밑에 언급한 요소를 지닌 next 메서드를 소유하게 되었을 때 만족되는 프로토콜.
    - next 메서드: 호출 시 value, done 프로퍼티를 가진 result 객체를 반환한다.

- 요약: 이터러블 호출 시 이터레이터를 리턴하는데, 이는 포인터와 비슷하다. 이터레이터는 값과 언제끝나는 지를 나타내는 next 메서드를 갖고있다.

### 이터러블

- 이터러블 프로토콜을 준수한 객체

  - Ex) `Array`, `Set`, `Map`
  - for of로 순회가능 & 스프레드 문법 & 배열 디스트럭처링 할당 가능

- 일반 객체도 TC39 stage 4의 스프레드 프로퍼티 제안에 따라 스프레드 문법 사용은 가능하다.
  - Ex) `const obj = {a:1}; const obj2 = {...obj}; // obj의 복사 (주소 공유 X)`

### 이터레이터

- 이터레이터 프로토콜을 준수한 객체
  - Ex) Array, Array는 이터러블 & `Array[Symbol.iterator]()`은 이터레이터

### 빌트인 이터러블

- Array, String, Set, Map, arguments, DOM 컬렉션, TypedArray

### for ... of 문

- [[Enumerable]] 이 참인 프로퍼티를 순회 열거
  - 그 과정에서 iterator의 next()가 사용된다.

### 유사 배열 객체

- 배열 X, length를 가져 인덱스로 접근 가능
- iterator이 없어 `for of`문은 불가능하다.
- arguments, NodeList, HTMLCollection은 유사 배열 객체이나 이터러블이다.
  - ES6에 이터러블 도입되며 이들에게 이터레이터가 구현됨

### 이터레이션 프로토콜이 필요한 이유

- 여러 공급자와 소비자를 연결하는 단 하나의 **통일된 기준**이기 때문이다.
  - 데이터 공급자: `Array`, `Set`, `Map` 등
  - 데이터 소비자: for of, 스프레드 문법 , 배열 디스트럭처링 등
    - 이가 없었으면 각양각색의 방식이 나왔을 것

### 사용자 정의 이터러블

```
const fibonacci(max) = {
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

for (const num of iterable(100)) console.log(num);

```

- 위 처럼 외부에서 인자 전달이 가능하다.
- ```
  const fibonacci(max) = {
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
  for (const num of iterable(100)) console.log(num);
  ```
