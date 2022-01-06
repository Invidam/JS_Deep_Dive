# 44. REST API

## 정리

- JSON Server을 이용한 실습을 진행하였다.
- 새로 알게된 내용
  - PATCH를 이용한 내용 일부 수정
  - 헤더 지정에 따라 결과값이 바뀜

## 느낀점

- 구매했던 네트워크 관련 서적을 꼭 읽어봐야 겠다. 아직 이해하지 못한 것 같다.

# 45. 프로미스

## 정리

- 비동기 처리가 필요한 이유
  - <a href="../Research/Async.md"> 참고 </a>
  - 비동기 함수가 실행된 시점에는 콜스택이 비어있는 상태이다. 즉 상위 스코프나 다른 함수가 종료된 상태이므로 비동기 함수의 동작이나 반환값을 이용하기 위해선 **특별한 처리**가 필요하다.

### 전통적인 비동기 처리방법 (콜백 패턴)

- <a href="../Research/Async.md"> 참고 </a>
- 비동기 함수 내부의 콜백 함수를 통해 비동기 함수의 동작을 이용한다.
- 단점
  - 콜백 함수 호출이 중첩되면 복잡도가 올라간다.
    - 가시성 ↓
  - 에러 처리의 한계
    - 비동기 함수를 호출한 상위 실행 컨텍스트가 종료된 후 비동기 함수가 실행된다.
      - 호출자 방향으로 전파되는 에러는 호출자인 상위 실행 컨텍스트가종료되었으므로 상위 실행 컨텍스트에서 감지가 안된다.

### 프로미스

- 콜백 패턴의 단점을 해결하기 위해 ES6에서 도입되었다.
- e.g. `new Promise((resolve,reject) => {})`
  - 프로미스 객체를 생성자 함수로 생성한다.
  - 콜백함수를 인자로 받는다.
    - 콜백함수의 인자
      - resolve: 비동기 처리 성공시 호출
        - 호출 시 프로미스를 fulfilled 상태로 변경
      - reject: 비동기 처리 실패시 호출
        - 호출 시 프로미스를 rejected 상태로 변경

### 프로미스 상태

- pending: 비동기 처리 수행되지 않음
  - 기본값
  - 밑의 두 상태를 settled 상태 라고도 함
- fulfilled: 비동기 처리 성공
- rejected: 비동기 처리 실패

### 후속 처리 메서드

- 프로미스의 상태가 변화하면 후속 처리 메서드의 콜백 함수가 호출되어 결과를 처리한다.

- `Promise.prototype.then()`

  - 첫 번째 인자
    - 호출 시기: fulfilled 상태일 때 호출
    - 인자: 비동기 처리 결과를 인자로 받는다.
  - 두 번째 인자
    - 호출 시기: rejected 상태일 때 호출
    - 인자: 프로미스 에러를 인자로 받는다.

- `Promise.prototype.catch()`

  - 호출 시기: rejected 상태 일때 호출
  - 인자: 프로미스 에러를 인자로 받는다.

- `Promise.prototype.finally()`
  - 호출 시기: 성공여부 관계없이 무조건 한 번

### 프로미스의 에러 처리

- then, catch를 이용한다.
  - then의 두 번째 인자의 경우 then의 첫 번째 인자의 에러를 감지하지 못하므로 catch 사용을 권장한다.

### 프로미스 체이닝

- 콜백 헬은 발생 X
- 콜백 패턴은 사용 -> 가독성 ↓

### 프로미스의 정적 메서드

- `Promise.resolve / reject`

  - 이미 존재하는 값을 래핑하여 프로미스를 생성한다.
  - e.g. : `const promise = Promise.resolve([1,2,3])`
    - new 연산자를 붙여도 동일하다.

- `Promise.all`
  - 여러 개의 비동기 처리를 병렬 처리한다.
  - 가장 늦게 fulfilled 상태가 되는 요소의 시간만큼만 소요되므로 시간은 절약된다.
  - e.g. `Promise.all([asyncFun, ...]) // [asyncFunc 's return, ...]`
  - 하나라도 rejected되면 즉시 reject하는 프로미스를 반환하며 종료한다.
  - 프로미스가 아닌 요소를 받을 경우 Promise.resolve로 래핑한다.
- `Promise.race`
  - 여러 개의 비동기 처리를 병렬 처리한다.
  - 가장 먼저 fulfilled 상태는 요소 하나만 resolve 결과로 반환한다.
  - 하나라도 rejected되면 즉시 reject하는 프로미스를 반환하며 종료한다.
- `Promise.allSettled`
  - 여러 개의 비동기 처리를 병렬 처리한다.
  - 모든 요소가 settled (resolve or reject)되면 반환한다.
  - 리턴값은 배열로, 각 처리결과가 value (resolve) or reason (reject) 인 배열이다.

### 마이크로태스크 큐

- 프로미스의 후속 처리 메서드들은 마이크로태스크 큐에 저장되며 이는 태스크 큐보다 우선순위가 높다.

### fetch

- `XMLHttpRequest`와 같은 HTTP 요청 전송 기능 제공 Web API 이다.

- 응답을 래핑한 Promise 객체를 반환한다.
  - `fetch(url[, options]).then(response => fun(response))`
  - response 객체는 HTTP 응답을 나타내는 다양한 프로퍼티가 존재한다.
