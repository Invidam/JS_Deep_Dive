# 48. 모듈

## 정리

### 모듈 개념

- 모듈은 앱을 구성하는 요소이다.
- 자신만의 파일 스코프를 가져야 한다.
- 다른 모듈에서는 import / export 를 통해서만 접근 가능하다.

### JS의 모듈

- JS는 모듈이 존재하지 않았다. (독자적인 파일 스코프가 X)

  - 이를 해결하기 위해 CommonJS, AMD (Asynchronous Module Definition) 가 제안되었다.

- Node.js에서는 CommonJS를 따르고 있다. (ES 표준은 아니다.)

### EMS

- ES6에서 모듈인 `EMS`이 추가되었다.

  - `<script type="module" src="app.mjs"></script>` 로 사용한다.
    - `type="module"` : 모듈로써 동작함을 의미
    - `app.mjs` : 일반 JS파일이 아닌 ESM임을 명시하기 위해 사용

- foo.js와 bar.js를 HTML에서 로드한다면

  - 하나의 전역을 공유하여 값이 덮어쓰여진다.

- foo.mjs와 bar.mjs를 HTML에서 모듈로써 로드한다면
  - 독자적인 모듈 스코프를 제공해 전역을 공유하지 않는다.
    - 전역인 window가 존재하지 않는다.

#### export

- 변수, 클래스, 함수 등을 외부에 공개하기 위해 사용한다.

- 사용방법
  1. 선언문 앞에 `export` 를 붙여 사용한다.
  2. `export {내보낼 요소들}` 로 하나의 객체로 구성하여 공개할 수 있다.

#### import

- 공개된 타 모듈의 식별자를 자신의 모듈 스코프로 가져오기 위해 사용한다.
  - e.g. `import {가져올 요소들} from "파일 경로"`
- import문에 의해서 로드되는 파일(모듈 파일)은 script 태그로 로드하지 않아도 된다.
- 사용방법

  - 식별자 객체로 취급
    - `import * as lib` : 모든 export요소들을 lib 객체의 프로퍼티로 가져온다.
  - 식별자 이름 변경
    - `import {pi as PI, ...}` : pi를 PI로 가져온다.

- `export default` : 하나의 모듈에서 하나의 파일만을 내보낼 때 사용가능
  - e.g. `export default x => x*x;`
  - 변수 키워드 사용 불가
  - import시 {} 없이 한다.
    - e.g. `import square from "~~.js"`

## 느낀점

- JS 모듈을 처음 배울 때 다른 언어에 비해 각기 다른 방식이 존재해서 당황했었다.
- 이렇게 정리하니 쉽게 알 수 있어 좋은 것 같다.
