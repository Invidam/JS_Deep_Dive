# 43. Ajax [에이잭스]

## 정리

### Ajax란

- 99년 MS에서 개발
- 구글 맵스에서 App과 비견될 성능을 보여 주목받게 됨
- 장점
- 전통적인 방식

  - 요청마다 모든 HTML을 서버로부터 전송받아 불필요한 통신 발생
  - 모든 부분 렌더링 -> 깜빡임 발생
  - 동기 방식으로 동작 -> 서버 응답 전까지 다음의 처리는 Blocking

- AJAX
  - 요청에 해당하는 부분만 응답해 불필요한 통신 발생 X
  - 필요한 부분만 렌더링 -> 깜빡임 발생 X
  - 비동기 방식으로 동작 -> Blocking 발생 X

### JSON

- HTTP 통신을 위한 데이터 포멧

- JSON.stringify(obj,replacer,space)

  - Object

          {
              name: "Invidam",
              age: 23,
              hobby: ["movie", "game"],
          };

  - JSON `JSON.stringify(Object, null, 2)`

          {
              "name": "Invidam",
              "age": 23,
              "hobby": [
                  "movie",
                  "game"
              ]
          }

  - replacer은 함수 or 배열로 key,value를 받아 해당하는 속성만 JSON화 시킨다.
    - 배열의 경우 key를 목록으로 가지게 될 경우 목록안의 key만 JSON화 한다.
      - e.g. `["name"]`
    - 함수의 경우 key,value 를 인자로 받아들이며 `return value`를 한 요소들만 JSON화 한다.
      - 주의할 점은 첫 번째 인자는 ("",obj)를 받아들이므로 이를 `return value`하지 않으면 `undefined`이 된다.
        - `(key, value) => {return value}`
  - space는 문자열의 간격을 의미한다.
    - `"\t"`를 이용하면 깔끔하다.

- JSON.parse(json) : JSON to String

### XMLHttpRequest

- HTTP 요청 위한 객체
- 생성자 함수: `new XMLHttpRequest()`
  - 참고문서: https://velog.io/@kysung95/%EA%B0%9C%EB%B0%9C%EC%83%81%EC%8B%9D-Ajax%EC%99%80-Axios-%EA%B7%B8%EB%A6%AC%EA%B3%A0-fetch

#### 프로퍼티와 메서드

- 프로토타입 프로퍼티

  - readyState: 요청의 상태를 나타낸다
    - 0: UNSENT
    - 1: OPENED
    - 2: HEADERS_RECEIVED
    - 3: LOADING
    - 4: DONE
  - status 응답 상태 (e.g. 200)
  - statusText: 응답 메시지 (e.g. `"OK"`)
  - responseType: 응답 타입 (e.g. `json,text, ...`)
  - **response: 응답한 몸체**
  - responseText: 응답 문자열

- 이벤트 핸들러

  - onreadystatechange: readyState 프로퍼티가 변경 (응답여부 확인 가능)
  - onerror: 요청 중 에러
  - onload: 요청 성공

- 메서드

  - open: 요청 초기화
  - send: 요청 전송
  - setRequestHeader: 헤더 설정

- 정적 프로퍼티

  - UNSENT: open 메서드 호출 이전
  - OPENED: open 메서드 호출 이후
  - HEADER_RECEIVED: send 메서드 호출 이후
  - LOADING: 서버와 응답 중
  - DONE: 서버 응답 완료

- 요청 전송

  1. open으로 요청을 초기화
  2. sentRequestHeader로 헤더 설정
  3. send로 http 요청 전송

  - `XMLHttpRequest.prototype.open(method,url[,async])`
    - arguments
      - method
      - url
      - async : 비동기 방식 결정 (true : 기본값 )
  - `XMLHttpRequest.prototype.send(payLoad)`

    - payLoad: 전달할 데이터

  - `XMLHttpRequest.prototype.setRequestHeader(header)`
    - 헤더를 설정

- 응답 처리

  - https://jsonplaceholder.typicode.com/ : 테스트 사이트

        const xhr = new XMLHttpRequest();
        xhr.open("get", "https://jsonplaceholder.typicode.com/todos/1");
        xhr.send();
        xhr.onreadystatechange = () => {
          if (xhr.status === 200) {
            const $p = document.querySelector("p");
            console.log(xhr.response);
            $p.textContent = JSON.stringify(xhr.response, null, "\t");
          }
        };

    - `onreadystatechange` 이벤트를 통해 `status === 200` (응답 성공) 인 경우 `response`를 출력한다.

## 느낀점

- axios, fetch 등으로만 이용했던 통신을 근본적인 ajax와 xml http request로 구현하니 재미있었다.
