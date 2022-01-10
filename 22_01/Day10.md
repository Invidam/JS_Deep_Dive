# 49. Babel & Webpack을 이용한 ES.NEXT 환경 구축

## 정리

- IE를 포함한 구형 브라우저는 최신 ES과 ESM을 반영하지 않는다.

  - 트랜스파일러인 Babel과 모듈러인 WebPack을 이용하여 호환성 문제를 해결할 수 있다.
  - 트랜스파일러: 소스코드를 다른 언어로 변환하는 것
    - Babel: ES6 문법을 ES5 (IE 이해 가능)으로 바꿔준다.
  - 모듈러: Web App의 자원들 (HTML,CSS,JS) 를 병합하여 하나의 결과로 만들어내는 것
    - WebPack

### Babel

- 제안 단계의 사양을 트랜스파일링하기 위해서는 Babel 플러그인을 추가 설치해야한다.

### WebPack

- `webpack -w` 실행시 `webpack.config.js` 에 따라 트랜스파일링 후 번들링을 진행한다.

### Babel-polyfill

- Promise, Array.from, Object.assign 등 변경 불가능한 요소를 구현해준다.

## 느낀점

- 클론코딩을 하며 따라는 해봤지만 어떠한 역할을 하는 지 알지못했던 두 개념들을 알게되었다.
