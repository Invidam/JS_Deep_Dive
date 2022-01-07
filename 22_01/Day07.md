# 46. 제너레이터와 async/await

## 정리

### 제너레이터

- 코드를 일시 중지했다가 필요한 시점에 재개할 수 있는 특수함수.
- 특징
  1. 함수 호출자에게 실행 제어권을 양도가능하다.
  2. 함수 호출자와 함수의 상태를 주고받을 수 있다.
     - 함수 내부의 값을 바깥에 줄 수 있고, 바깥의 값을 안으로 줄 수도있다.
  3. 호출 시 제너레이터 객체를 반환한다.
     - 이터러블이며 이터레이터인 객체이다.
- 사용 예제

        const fibonacci = function* (breakNum) {
        let [pre, cur] = [0, 1];
        while (1) {
            [pre, cur] = [cur, pre + cur];
            if (cur > breakNum) return;
            yield cur;
        }
        };

        const generator = fibonacci(100);
        while (1) {
        const next = generator.next();
        console.log(next);
        if (next.done) break;
        }

- 설명 예제

        function* getFun() {
        const x = yield 1;
        const y = yield x + 10; // 5 + 10
        return x + y; // 5 + 13
        }
        const generator = getFun();
        let res = generator.next(); // (1). yield의 값인 1이 result.value
        console.log(res); //{ value: 1, done: false }


        res = generator.next(5); // (2). x에 5가 할당
        console.log(res); //{ value: 15, done: false }  (3). 5 + 10인 15가 yield 값

        res = generator.next(13); // (4). y에  13이 할당
        console.log(res); //{ value: 18, done: true } // (5). 5 + 13인 18이 return 값

  - 위와 같이 `function * ()` 로 선언한다.
  - yield가 제어하는 역할을 한다.
  - return으로 종료한다.
  - 이터러블로 동작한다.
    - `next()` 호출 시 yield 표현식 까지 실행하며, `{value: yield 값, done: false}` 을 result로 반환한다.
      - next의 인자는 yield 표현식을 할당받는 변수에 할당된다.
    - `return()` 호출 시 `{value: 인자, done: true}` 을 result로 반환한다.
    - `throw` 호출 시 `{value: undefined, done: true}` 을 result로 반환한다.

- yield 평가식 까지만 동작하고 할당은 하지않는다.
- `const x = yield val`는 `return val`과 비슷하다고 생각했는데 `askToCallerFun(val)` 같은 느낌이다.

  - 즉 변수 x에 yield 표현식의 val과 무관한 값이 할당될 수 있으며, 이는 호출자 함수가 결정할 일이다.

- 이를 이용해 비동기처리도 가능하다.

### async/ await

- 후속처리 방식이 아닌 동기처리와 유사하게 프로미스를 사용하는 방법

#### async

- 함수에 정의되며, 정의된 함수는 프로미스 함수가 된다.
- 클래스의 생성자에는 불가능하다.
- 프로미스함수이므로, 항상 프로미스를 반환한다.

#### await

- 코드의 프로미스가 settled 상태가 될 때까지 대기 후 프로미스의 처리 결과를 반환한다.
- await 키워드는 async가 정의된 함수 안에만 존재 가능하다.
- 프로미스 반환 값을 읽어 변수에 일반 값으로 할당이 가능하다.
  - resolve(3) -> 3으로 할당 가능

### 에러 처리

- 콜백 방식이 아니기에 try catch 문을 사용하여 에러 처리가 가능하다.

- async 함수 내에서 reject하는 프로미스를 반환하기 위해서 catch문 사용이 필요하다.

## 느낀점

- 어렵게 느꼈던 비동기 처리를 자세히 이해해서 만족스럽다.
