# 38. 브라우저 렌더링 과정

## 정리

- JS는 HTML, CSS와 함께 렌더링된다.
  - 브라우저가 서버에게 필요한 리소르를 요청
  - 서버가 브라우저에게 응답
  - 브라우저의 JS 엔진이 JS를 파싱하여 AST를 생성 후 바이트 코드로 변환
    - 이 때, JS DOM API가 DOM & CSSOM을 변경 가능
  - 렌더 트리를 기반으로 HTML 요소를 페인팅

### 요청과 응답

- 브라우저 url 검색은 정적 요청으로, DNS가 알고있는 IP 주소를 가진 서버에게 요청하는 것이다.
- ajax, REST API 등 동적 요청도 존재한다.

- html, css, js, image 등을 요청한다.

### HTTP 1.1 & 2.0

- 1.1: 개별 요청 개별 전송
- 2.0: 동시 요청 동시 전송
  - 속도 50% 이상 증가

### HTML 파싱 & DOM 생성

- 전달받은 HTML 파일은 파싱 후 DOM을 형성한다.
  1. 서버의 HTML 파일을 전송 위해 바이트로 변경하여 응답
  2. 브라우저는 바이트 형태의 파일을 문자열로 변환(HTML 형식)
  3. 문자열을 문법적 의미를 가지는 토큰으로 분해
  4. 토큰을 객체로 변환하여 노드를 생성
  5. 노드들의 관계를 이용하여 트리 구조를 형성 이가 **DOM**이다.

### CSS 파싱 & CSSOM 생성

- HTML과 동일 과정을 거쳐 CSSOM을 형성한다.

### 렌더 트리 생성

- DOM & CSSOM을 결합하여 렌더 트리 생성
  - 화면에 렌더링되는 노드들만 구성
- 렌더링 과정은 반복될 수 있다.
  - JS에 의한 노드 추가 or 삭제
  - 브라우저 창 크기 변경 -> 뷰포트 변경
  - HTML 요소가 발생시키는 스타일 변경
- 페인팅 처리에 입력됨

### JS 파싱과 실행

- 렌더링 엔진이 아닌 JS 엔진이 담당

- 토크나이징
  - 어휘분석을 통해 토큰으로 분해 (렉싱이라고도 함)
- 파싱
  - 구문 분석하여 AST를 생성
- 바이트코드 생성과 실행
  - 인터프리터가 실행할 수 있는 바이트 코드로 변환되어 실행된다.

### 리플로우 & 리페인트

- DOM API로 변경된 DOM CSSOM은 다시 렌더 트리로 결합되어 렌더링된다. 이를 **리플로우 리페인트** 라고 한다.
  - 리플로우: 레이아웃 다시 계산
  - 리페인트: 렌더트리를 다시 페인팅

### 파싱 중단

- HTML 파싱 중 CSS, JS를 만나면 파싱이 중단되며 CSS, JS 파싱을 시작한다.
  - JS 요소 중에 생성되지 않은 DOM을 조작하는 코드가 있다면 문제가 생긴다.
    - 따라서 `<script></script>`는 마지막에 작성할 것을 권장한다.
      - 렌더링 중단도 되지않아, 로딩시간이 단축된다.

### async / defer

- DOM 중단을 해결위한 어트리뷰트이다.

  - `<script async src="index.js"> , <script defer src="index.js">` 로 사용한다.

- async
  - 비동기 요소: HTML 파싱과 JS 로딩이 비동기적
  - 중단 시점: JS 로딩이 종료된 시점 (JS가 실행되는 시점)
- defer
  - 비동기 요소: HTML 파싱과 JS 로딩
  - 중단 시점: HTML 파싱이 종료된 시점

## 느낀점

- 기존에 공부했던 내용이었으나, 그림을 통해 공부하니 훨씬 이해가 잘되었다.
- 특히 중요한 내용만 간략하게 다루다보니 흐름을 잘 알 수 있었다.