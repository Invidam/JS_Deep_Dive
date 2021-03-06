# 21. 빌트인 객체

## 정리

### 자바스크립트 객체 종류

- 표준 빌트인 객체: ES에 정의된 객체이며, 모든 JS 런타임에서 전역 변수처럼 사용 가능.
- 호스트 객체: 브라우저 환경 혹은 Node.js 환경 등에서 제공하는 객체. `Ex) DOM, XMLHttpRequest`
- 사용자 정의 객체: 사용자가 직접 정의한 객체.

### 빌트인 객체

- 원시값은 객체가 아니므로 프로퍼티, 메서드를 가질 수 없다. 하지만 `str.length` 나 `str.toUpperCase()` 등을 보면 String은 원시값임에도 마치 객체로 동작한다.
  - 이는 원시값에 대해 객체처럼 접근하면 JS 엔진이 임시로 **래퍼 객체**를 생성해 프로퍼티 접근 & 메서드 호출을 시키기 때문이다.
  - 값의 변경가능성: 임시로 생성하고 다시 원시값으로 되돌리기에 원시값에 프로퍼티 or 메서드를 통해 무언가를 할당하면 래퍼 객체에 할당되고 원시값에는 변화가 생기지 않는다.
- 래퍼 객체로 사용될 수 있는 원시값들: `String, Number, Boolean` + `Symbol`

### 전역 객체

- JS엔진이 객체 중 가장 먼저 생성하는 특수한 객체
- globalThis: 환경에 따라 제각각인 전역 객체의 이름을 통일한 것 (브라우저: window / Node: global)

- 특징
  - 개발자가 생성 불가
  - 프로퍼티 참고시 이름 생략가능 (globalThis, window, global을 생략가능)
  - 빌트인 객체를 프로퍼티로 가짐
  - 실행 환경에 따라 추가적인 프로퍼티 & 메서드를 가짐
  - var로 선언한 전역 변수 & 암묵적 전역 & 전역 함수를 프로퍼티로 가진다.
- var vs let & const
  - let & const는 전역으로 선언하더라도 전역 객체가 아닌 다른 곳에 존재한다.

#### 빌트인 전역 프로퍼티

- Infinity, NaN, undefined

#### 빌트인 전역 함수

- eval: JS코드를 인자로 받아 평가하여 값을 생성하거나 동작시키는 함수
  - 동작시점: 속한 스코프의 런타임에 인자인 코드내용을 동적으로 수정한다.
    - strict mode에서는 동적 수정하지 않고, 자신만의 스코프를 생성한다.
- 금지이유

  - 보안 취약
  - 속도 느림

- isFinite
  - 유한수 검사하는 함수
  - Nan, Inf, undefined은 숫자가 아니므로 `false`
- isNan: 숫자가 아닌지 확인 (숫자가 아니면 숫자로 변환 후 검사)
- parseFloat: 실수로 해석
- parseInt(str,X): X진수인 str를 10진수로 변환
  - 0x 로 된 문자열은 16진수로 해석하여 10진수로 변환
  - 10진수를 X진수로 변환하는 방법 `Ex) Num.toString(X);`
  - 공백으로 구분된 문자열은 공백 이전 문자열만 취급
- encodeURI & decodeURI: URI 인코딩 & 디코딩
- encodeURIComponent & decodeURIComponent: URI 구성 요소를 인코딩 & 디코딩
  - encodeURI는 쿼리스트링을 인코딩 X

#### 암묵적 전역

- 암묵적 전역으로 생성된 전역 객체의 프로퍼티는 삭제가 가능하다.

### NaN, undefined, null 정리

|         |     NaN      |  undefined   |          null           |
| :-----: | :----------: | :----------: | :---------------------: |
|  의미   | 숫자가 아님. | 정의가 안됨. | 아무것도 나타내지 않음. |
| Boolean |   `false`    |   `false`    |         `false`         |
| Number  |    `NaN`     |    `NaN`     |           `0`           |
| String  |    `NaN`     | `undefined`  |         `null`          |

- https://weicomes.tistory.com/132 참고

- undefined는 왜 Number에서 NaN일까?
  - 문맥상 아직 정의되지 않았기에 숫자가 아니므로 `NaN`이라고 처리한 것 같다.
  - null은 아무것도 나타내지 않겠다 즉 무(無)라는 상태(숫자에서는 0)를 정의했기에 `0`이라고 처리한 것 같다.

## 느낀점

- 자주사용하던 parseInt 등이 전역 객체의 축약표현이라는 것을 처음 알게되었다.
- undefined가 NaN 취급되는 이유를 스스로 정리해보았는데 꽤나 납득할 만한 것 같다.

# 22. this

## 정리

### 용어 정리

- 자신이 속한 객체를 가리키는 식별자
  - 생성자가 생성할 인스턴스를 가리키는 자기 참조 변수이다.
- 호출 방식에 따라 가리키는 대상이 다르다.

### 함수 호출방식에 따른 this 바인딩 결정

#### 1. 일반 함수 호출

- **전역 객체**가 바인딩된다.
- strict mode에서는 undefined가 바인딩된다.
- 중첩함수, 콜백함수도 이 경우에 해당된다.
  - 이들의 this를 메서드의 것과 일치시키기 위해서는 `Function.prototype.(apply, call, bind)`를 사용한다.
  - 혹은 화살표 함수를 이용한다.

#### 2. 메서드 호출

- 메서드는 프로퍼티에 바인딩된 함수이다.

  - 프로퍼티가 함수 객체를 가리키는 개념이다.

- 메서드 내부의 this는 메서드를 **정의한 객체**가 아닌 메서드를 **호출한 객체**에 바인딩된다.

  - Ex)

  ```
   const cir1 = {
     rad: 3,
     getDiameter() {
       return this.rad * 2;
     },
   };

   const cir2 = {
     rad: 5,
   };
   cir2.getDiameter = cir1.getDiameter;
   console.log(cir1.getDiameter()); // 6
   console.log(cir2.getDiameter()); // 10
  ```

  - `cir2.getDiameter()`는 정의한 cir1.rad이 아닌 호출한 cir2.rad를 이용한 값을 리턴한다.
    - 이는 this 바인딩은 **호출시점**에 결정되기 때문이다.

### 3. 생성자 함수 호출

- 가장 일반적인 경우이며, C++, JAVA는 언제나 이 경우만을 고려한다.
- **생성할 인스턴스**가 바인딩된다.
- new 연산자 없이 호출하면 전역 객체를 가리킨다.

### 4. `Function.prototype.(apply, call, bind)` 이용

- `Function.prototype.apply(thisArg[,argsArray])`
- `Function.prototype.call(thisArg[,arg1[, ...]])`

  - `thisArg` 을 this로 전달한다.
  - 두 번째 인자들부터 함수의 인자로 전달한다.
  - 함수를 실행한다. (`Function.prototype`) - apply는 배열로, call은 쉼표로 구분된 인자를 전달하는 것만이 다르다.

    ```
    function getArgs() {
    console.log(arguments);
    const slice = Array.prototype.slice;
    console.log(slice);
    const arr = slice.call(arguments);
    console.log(arr, this);
    return arr;
    }

    console.log(getArgs(1, 2, 3));
    ```

    - slice는 배열을 복사하는 함수로 사용되었고, `(1,2,3)`이 인자로 들어와 이들을 이용해 배열을 만들었다.

- `Function.prototype.bind(thisArg[,arg1[, ...]])`
  - 전의 두 함수와는 달리 함수를 호출하지 않고 this로 사용할 객체만을 전달한다.
  - 중첩함수와 콜백 함수등에서 **this 불일치 문제를 해결**하기에 유용하다.

## 느낀점

- 개인적으로 어렵다고 생각했던 bind에 대해 알게되었다.
  - 검색해봤을 때는 무슨 말인지 전혀 이해못하였는데 this 불일치 문제를 해결할 때 사용된다고 하니 감이 잡혔다.
