# 35. 스프레드 문법

## 정리

- 스프레드 문법: 여러 집합을 펼쳐, 개별적인 값들의 목록으로 만든다.
  - 값이 아닌 값들의 목록이므로 **변수에 할당할 수 없다.**
  - 사용 용도
    - 함수의 인수 목록
    - 배열 리터럴의 요소 목록
    - 객체 리터럴의 프로퍼티 목록

### 함수의 인수 목록으로써의 사용

- 기존에는 apply를 이용하여 배열을 인자 목록으로 바꾸어 전달했다.
  - Function.prototype.apply(thisArg,[argsArray]) : thisArg를 this로하고 argsArray를 인자로하여 함수 실행
  - `Mat.max.apply(null,arr)`
- 스프레드 문법 사용
  - `Math.max(...arr)`

### 배열 리터럴 내부에서 요소로써의 사용

- 배열 결합
  - concat을 이용
    - `[1,2].concat([3,4])`
  - 스프레드 문법 사용
    - [...[1,2], ...[3,4]]
- 배열 중간에 배열 추가
  - arr1 = [1,4] / arr2 = [2,3]
  - apply 이용
    - `Array.prototype.splice.apply(arr1, [1,0].concat(arr2));`
  - 스프레드 문법 사용
    - arr1.splice(1,0,...arr2)
- 배열 복사
  - slice() 이용
    - `var copy = origin.slice();`
  - 스프레드 문법 사용
    - `const copy = [...origin];`
- 이터러블을 배열로의 변환

  - `arr = Array.prototype.slice.call(iterable)`
  - `arr = [...iterable]`

  - 단, 이터러블이 아니라면 스프레드 문법 대상이 되지 못한다.

### 객체 리터럴 프로퍼티로써의 사용

- TC39 stage 4에 제안되어 있는 스프레드 프로퍼티
- `const copy = {...obj}` 로의 객체 프로퍼티 추가

## 느낀점

- 사용은 자주 했으나, 정확히 배운 적은 없었는데 이터러블과 함께 배우며 잘 알게 되었다.

# 36. 디스트럭처링 할당

## 정리

- 디스트럭처링 할당: 이터러블 or 객체를 구조 파괴하여 변수에 개별적으로 할당하는 것

### 배열 디스트럭처링 할당

- ES5
  ```
  var arr = [1,2,3];
  var one = arr[0];
  .
  .
  .
  var three = arr[2];
  ```
- ES6

  ```
  const arr = [1,2,3];
  const [one, two, three] = arr;
  ```

  ```
  const [a, b, c = 3] = [1, 2, ,];

  console.log(a, b, c);
  ```

  - [,,] 로 건너뛰기 가능
  - c = 3 처럼 기본값 설정 가능

### 객체 디스트럭처링 할당

    const user = { firstName: "Hansu", lastName: "Park" };
    const { firstName, lastName } = user; //1
    const { firstName: first, lastName: last } = user; //2
    console.log(firstName, lastName, first, last);

- 2처럼 다른 변수에 할당도 가능하다.
