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

## 느낀점

    let [pre, cur] = [0, 1];
    console.log(pre, cur);
    let n = 10;
    while (n--) {
    [pre, cur] = [cur, pre + cur];
    console.log(pre, cur);
    }
    //0 1
    //1 1
    //1 2
    //2 3
    //3 5

- 간단한 피보나치 수열 예제인데, `[pre, cur] = [cur, pre + cur];` 에서
  - 내가 생각한 동작
    - `pre = cur // pre = 1`
    - `cur = pre + cur // cur = 1 + 1 = 2`
  - 실제 동작
    - `pre = cur // pre = 1`
    - `cur = pre + cur // cur = 0 + 1 = 1`
      - cur에 들어가는 pre가 1로 변경된 pre가 아닌, 변경되기 전 0이 들어간다.
        - 즉 디스트럭처링 할당은 동시에 일어나는 것 같다.

# 37. Set & Map

## 정리

### Set

- 생성자함수: `new Set(array) `
- 사이즈 확인: `Set.prototype.size `
  - 수정불가능함 getter만 존재
- 요소 추가: `Set.prototype.add(elem)`
  - 중복 허용 X (무시)
  - 해당 객체를 반환함으로, 반복 추가 가능
- 요소 존재 확인: `Set.prototype.has(elem)`
- 요소 삭제: `Set.prototype.delete(elem)`
- 일괄 삭제: `Set.prototype.clear()`
- 요소 순회: `Set.prototype.forEach(elem,elem,set)`
  - 첫 번째와 두 번째 인자는 동일한 값이다.
    - Array.forEach와 인터페이스 통일을 위해 존재한다.
  - 순회 순서는 추가된 순서이다.
- 이터러블임으로for of 문으로도 순회가 가능하다.

      const set1 = new Set([1, 2, 3, 5]);
      const set2 = new Set([2, 3, 4, 6]);
      const subSet1 = new Set([1, 2]);

      //교집합
      Set.prototype[Symbol.for("intersection")] = function (set) {
        return new Set([...this].filter((value) => set.has(value)));
      };

      console.log(set1[Symbol.for("intersection")](set2)); //Set(2) { 2, 3 }

      //합집합
      Set.prototype[Symbol.for("union")] = function (set) {
        return new Set([...this, ...set].sort());
      };

      console.log(set1[Symbol.for("union")](set2)); //Set(6) { 1, 2, 3, 4, 5, 6 }

      //여집합
      Set.prototype[Symbol.for("difference")] = function (set) {
        return new Set([...this].filter((value) => !set.has(value)));
      };


      //상위 집합
      console.log(set1[Symbol.for("difference")](set2)); //Set(2) { 1, 5 }
      Set.prototype[Symbol.for("isSuperSet")] = function (subset) {
        return [...subset].every((value) => this.has(value));
      };


      console.log(set1[Symbol.for("isSuperSet")](subSet1)); //Set(2) { 1, 5 }

### Map

- 생성자 함수: `const map = new Map([["key1","value1"],["key2","value2"]])`
- 사이즈 확인: `Map.prototype.size `
  - 수정불가능함 getter만 존재
- 요소 추가: `Map.prototype.set(key,value)`
  - 중복 허용 X (무시)
  - 해당 객체를 반환함으로, 반복 추가 가능
  - 객체와 달리 모든 타입을 키로 사용 가능
- 요소 존재 확인: `Map.prototype.has(key)`
- 요소 삭제: `Map.prototype.delete(key)`
- 일괄 삭제: `Map.prototype.clear()`
- 요소 순회: `Map.prototype.forEach(key,value,set)`
  - 순회순서: 추가 순서
- 이터러블이다.
- `Map.prototype.keys()`: Map의 key를 값으로 가지는 이터러블이며 이터레이터인 객체 반환
- `Map.prototype.values()`: Map의 value를 값으로 가지는 이터러블이며 이터레이터인 객체 반환
- `Map.prototype.entries()`: Map의 key, value 쌍을 값으로 가지는 이터러블이며 이터레이터인 객체 반환
