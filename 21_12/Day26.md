# 28. Number

## 정리

### 생성자 함수

- `new Number()`
- [[NumberData]] 값에 0이 할당된다. (ES5에서는 [[PrimitiveValue]]라고 부름)
- 숫자가 아닌 값을 숫자로 변경하기도 한다.

### 프로퍼티

- `Number.EPSILON` : 표현가능한 가장 작은 수
  - 2.2e-16 이다.
  - 0.1 + 0.2 ! == 0.3 이다.
    - (부동소수점 표현으로 인한 오차)
    - 이를 `Math.abs(0.3 - (0.1 + 0.2)) < Number.EPSILON` 으로 오차를 잡을 수 있다.
- `Number.MAX_VALUE`: 가장 큰 수이다. (1.7e308)
- `Number.MIN_VALUE`: 가장 작은 수이다. (-1.7e308)
- `Number.MAX_SAFE_INTEGER` : 안전하게 표현할 수 있는 가장 큰 정수값이다. (9007199254740991)
- `Number.MIN_SAFE_INTEGER` : 안전하게 표현할 수 있는 가장 작은 정수값이다. (-9007199254740991)
- `Number.POSITIVE_INFINITY` : + ∞
- `Number.NEGATIVE_INFINITY` : - ∞
- `Number.NaN` : NaN

### 메서드

#### 정적 메서드

- `Number.isInfinity(value)` : ± ∞ 이면 참 아니면 거짓

- `Number.isInteger(value)`: 정수 확인
- `Number.isNaN(value)` : NaN인지 확인
  - 전역함수 isNaN은 숫자가 아닌 인자에 대해 암묵적 타입변환을 하여 검사하지만, Math.isNaN은 숫자가 아니라면 무조건 false이다.
- `Number.isSafeInteger(value)`: MAX_SAFE_INTEGER ~ MIN_SAFE_INTEGER 의 수인지 확인

#### 프로토타입 메서드

- `Number.prototype.toExponential(number)` : 지수 표기법 문자열로 반환
  - `(77.1234).toExponential() //'7.71234e+1'`
  - 인자는 소수점 표현할 자릿수 전달
  - 숫자 리터럴과 전달시 에러
    - 숫자뒤에 붙는 .이 소수점인지 객체 접근인지 애매하기 때문에 `()`을 붙여야 한다.
- `Number.prototype.toFixed(number)`: 인자 뒤의 수를 반올림하여 문자열로 전달
- `Number.prototype.toPrecision(number)`: 유효 숫자를 인자로 하여 나머지는 반올림 후 문자열로 반환
  ```
  > 12345.6789.toPrecision(1)
  '1e+4'
  > 12345.6789.toPrecision(2)
  '1.2e+4'
  > 12345.6789.toPrecision(3)
  '1.23e+4'
  > 12345.6789.toPrecision(4)
  '1.235e+4'
  > 12345.6789.toPrecision(5)
  '12346'
  > 12345.6789.toPrecision(6)
  '12345.7'
  ```
  - 참고
- `Number.prototype.toString(number)` : 인자로 전달된 숫자 N진수로 수를 변경하여 문자열로 전달

## 느낀점

-
