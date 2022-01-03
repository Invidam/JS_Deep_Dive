# 41. 타이머

## 정리

### 용어 정리

- 호출 스케줄링: 타이머 함수를 이용하여 함수 호출을 늦추는 것
- setTimeout, setInterval 등 타이머 함수는 호스트 객체이다.
- JS는 하나의 실행 컨테긋트 스택을 갖기에 두 가지 이상의 업무를 동시에 할 수 없다.
  - 싱글 스레드 방식이다.
  - 따라서 비동기 처리 방식으로 동작한다.

### setTimeout

- `setTimeout(func | code [,delay,params])`
  - `func` | `code`: 타이머 만료후 실행할 콜백 함수
  - `delay`: 만료 시간
    - 단위는 ms이다.
    - 기본값은 0이다.
  - `params`: func에 전달할 인자들
  - `return`: 고유 id
    - 브라우저 환경에서는 숫자이다.
    - Node.js 환경에서는 객체이다.
- `clearTimeout(timeId)`: id에 해당하는 함수를 취소한다.

### setInterval

- `setInterval(func | code [,delay,params])`
  - `func` | `code`: 타이머 반복마다 실행할 콜백 함수
  - `delay`: 반복 시간
    - 단위는 ms이다.
  - `params`: func에 전달할 인자들
  - `return`: 고유 id
    - 브라우저 환경에서는 숫자이다.
    - Node.js 환경에서는 객체이다.
- `clearInterval(timeId)`: id에 해당하는 함수를 취소한다.

        let count = 0;
        const timeId = setInterval(() => {
        console.log(count++);
        if (count === 5) clearInterval(timeId);
        }, 1000);

  - 위처럼 함수 자체에서 id값을 식별해 취소도 가능하다.

### 디바운스

    const debounce = (callback, delay) => {
      let timeId;
      return (event) => {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(callback, delay,event);
      };
    };

- **delay에 해당하는 기간동안 디바운스 함수가 실행되지 않아야만 콜백함수가 실행된다.**
  - timeId는 클로저의 자유변수이다.
  - 반복입력 시 함수가 실행되지 않는다.

### 쓰로틀

    const throttle = (callback, delay) => {
      let timeId;
      return (event) => {
        if (timeId) return;
        timeId = setTimeout(
          () => {
            callback();
            timeId = null;
          },
          delay,
          event
        );
      };
    };

- **delay에 해당하는 기간동안 쓰로틀 함수가 실행되어도 무시한다.**

  - 반복입력시 delay마다 함수가 실행된다.

- 실무에서는 간략한 구현이 아닌 라이브러리 이용을 권장한다.

## 느낀점

- 반복 이벤트 발생으로 어려움을 겪은 적이 있었는데 이렇게 단순한 해결방법이 있다는 것을 알게되었다...
