# 20. strict mode

## 정리

### strict mode가 필요한 이유

- 암묵적 전역: `x = 10` 을 선언하면 암묵적으로 전역 변수로써 사용할 수 있다.
  - strict mode를 적용하면 선언 시 에러로 표현된다.

### 적용 규칙

- 전역에 적용 X

  - `use strict`는 스크립트 단위로 적용된다.
  - 스크립트 마다 strict 여부를 혼용하면 혼란이 생긴다.
  - 라이브러리와 충돌할 수 있다.

- 함수 단위의 적용

  - 적용된 함수와 적용되지 않은 함수가 둘 다 존재하므로 혼란스럽다.

- **결론: 즉시 실행 함수를 감싸며, 스크립트 단위로 실행한다.**
  - ES6부터는 모듈이 모두 strict모드가 적용되어졌다.
    - https://stackoverflow.com/questions/31685262/not-recommended-to-use-use-strict-in-es6

### 잡아내는 에러들

- 암묵적 전역
- delete 연산: 변수, 함수, 매개변수 삭제할 때, 에러로 처리
- 매개변수 이름 중복: `fun(x,x)` 같은 경우 에러 처리
- with 문의 사용: 자제 권고되는 with문 사용시 에러 처리

### 적용되는 변화

- 일반 함수의 this
  - 생성자 함수가 아니므로 쓸모없는 일반함수의 this는 undefined를 가리킨다.
- arguments 객체
  - 전달받은 매개변수를 변경해도 arguments 객체는 변치않는다.

## 느낀점

- ES6부터 기본값이 되었더라도 알야아 하는 부분인 것 같다.
