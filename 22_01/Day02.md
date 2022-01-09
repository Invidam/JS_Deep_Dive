# 40. 이벤트

## 정리

### 이벤트 드리븐 프로그래밍

- 브라우저는 특정 사건이 일어나면 를 감지하여 이벤트를 발생시킨다.
- 이벤트 핸들러: 특정 이벤트가 일어났을 때 발생시키고자 하는 함수
  - 브라우저에게 위임하며, 브라우저가 이벤트를 감지하여 호출한다.
- 이벤트와 이벤트 핸들러를 이용하는 프로그래밍 방식을 이벤트 드리븐 프로그래밍 이라고 한다.

### 이벤트 타입

- https://developer.mozilla.org/ko/docs/Web/Events 참조
  - 이벤트 버블링: 이벤트가 일어났을 때, 상위 요소까지 이벤트가 전달되는 특성

### 이벤트 핸들러 등록

1. 어트리뷰트 방식
   ```
   <body>
   <button id="btn" onclick="sayHi('User')">BTN</button> // 호출문
   //sayHi 였다면, 함수 참조 였을 것
   </body>
   <script>
   function sayHi(name) {
     alert(`Hi ${name}`);
   }
   </script>
   ```
   - on 접두사 + 이벤트 타입
   - 함수호출문과 같은 **문**을 할당하면 등록된다.
   - 일반적으로, 핸들러 등록은 함수 참조를 등록해야 한다.
     - 어트리뷰트 방식에서 호출문을 할당하면 호출된 함수의 몸체가 핸들러 프로퍼티에 할당된다.
       - 따라서 함수 대신 문을 여러줄 전달하는 것도 가능하다.
         - `<button id="btn" onclick="console.log("hi"); console.log("user");">`
   - HTML과 JS를 혼재하는 것은 권장치 않는다.
     - 관심사가 다르기 때문이다.
   - 하지만,CBD 방식의 프레임워크에서는 이 방식으로 처리한다.
     - 뷰 구성요소로 생각하여 관심사가 다르다고 여기지 않는다.
2. 이벤트 핸들러 프로퍼티 방식

   ```
     <body>
     <button id="btn" ">BTN</button>
   </body>
   <script>
     const $btn = document.getElementById("btn");
     $btn.onclick = function () {
       alert(`Hi ${name}`);
     };
   </script>
   ```

   - `$btn`: 이벤트 타겟
   - `onclick`: on + 이벤트 타입
   - `function () {} `: 이벤트 핸들러
   - 하나의 이벤트만 할당 가능하다는 단점 존재

3. addEventListener 메서드 방식

   ```
     <body>
     <button id="btn" ">BTN</button>
   </body>
   <script>
     const $btn = document.getElementById("btn");
     $btn.addEventListener("click",function () {
       alert(`Hi ${name}`);
     })
   </script>
   ```

   - `EventTarget.addEventListener('eventType,eventHandler[,useCapture])`
   - 프로퍼티 방식과 같이 사용가능하다.
   - 이 방식으로도 하나의 이벤트만 할당이 가능하다.

### 이벤트 핸들러 제거

- 프로퍼티 방식으로 등록한 이벤트는 null을 할당하여 제거 가능하다.
- 메서드 방식은 `removeEventListener`로 제거할 수 있다.
  - 단, 인자가 완전히 같아야만 제거된다.
    - 따라서, 이벤트 핸들러를 변수나 자료구조에 저장해놓아야 한다.

### 이벤트 객체

- 이벤트 핸들러의 첫 인자로 이벤트 객체가 전달된다.

  - 어트리뷰트 방식은 함수의 첫 인자로 `event`를 줘야만 한다.
    - 함수 몸체를 감싸는 암묵적 함수가 `event`를 인자로 받기 때문이다.

- 생성자 함수를 가지는 객체이다.
- 이벤트 객체의 공통 프로퍼티들
  - type: 이벤트의 타입
  - target: 이벤트를 발생시킨 DOM 요소
  - currentTarget: 핸들러가 바인딩된 DOM 요소
  - eventPhase: 이벤트 전파단계
    - 0: X
    - 1: 캡처링
    - 2: 타깃
    - 3: 버블링
  - bubbles: 버블링 전파여부
  - cancelable: preventDefault를 호출하여 이벤트의 기본동작을 취소할 수 있는지 여부
  - defaultPrevented: preventDefault를 호출하여 이벤트 기본동작을 취소했는지 여부
  - isTrusted: 사용자 행위로 인한 발생인지의 여부
  - timeStamp: 이벤트 발생 시각
    - 1970.1.1.0:00:00 으로부터의 밀리초

#### 마우스 정보 취득

- mouse 관련 이벤트가 발생되면 생성되는 `MouseEvent`타입의 객체이다.
- 고유 프로퍼티들
  - https://developer.mozilla.org/ko/docs/Web/API/MouseEvent 참조

#### 키보드 정보 취득

- keyboard 관련 이벤트가 발생되면 생성되는 `KeyboardEvent`타입의 객체이다.
- 고유 프로퍼티들
  - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent 참조
- 입력한 키의 해당하는 프로퍼티 값
- https://keycode.info/ 참조
- key up: 한글 두번 이벤트 발생 -> key down 사용

### 이벤트 전파

- window - document - html - body - ul - li를 클릭했을 경우
  - 캡처링 단계: 이벤트가 상위 → 하위로 전파
    - window → document → html → body → ul → li
  - 타겟 단계: 이벤트가 타겟에 도달
  - 버블링 단계: 이벤트가 상위 ← 하위로 전파
    - window ← document ← html ← body ← ul ← li
- addEventListener을 제외하고는 타겟, 버블링 단계만 캐치한다.

  - addEventListener의 세 번째 인자를 true로 전달해야 캡처링 단계를 캐치한다.

- 대부분의 이벤트는 버블링단계에서 상위 DOM에서도 캐치가능하다.
  - event.bubbles가 false인 요소는 불가능하므로, 캡처링 단계를 캐치해야한다.

### 이벤트 위임

- 모든 자식들에게 이벤트를 발생시키면 성능 저하 & 코드 복잡성 증가된다.
- 따라서, 부모에게 위임을 한다.

### DOM 요소의 기본 동작 조작

- 기본 동작 중단: `event.preventDefault()`
- 이벤트 전파 방지: `event.stopPropagation()`
  - 해당 이벤트의 버블링 캡처링을 막는다.

### 이벤트 핸들러에서의 this

- 어트리뷰트 방식은 일반함수로써 호출되므로 전역 객체를 가리킨다.
  - 인자로 this를 전달하면 바인딩한 DOM 요소를 가리킨다.
- 프로퍼티 방식과 메서드 방식: 바인딩한 DOM 요소를 가리킨다.

### 이벤트 핸들러에 인수 전달

- 어트리뷰트 방식을 제외한 방식들은 핸들러에 함수 자체를 전달해야 하기에 인자 전달이 까다롭다.
- 방법1: `.onblur = () => sayHi(name)`
- 방법2: `.onblur = name => () => console.log('Hi ${name}')`

### 커스텀 이벤트 생성

- 키보드 커스텀 이벤트 생성: `new KeyboardEvent(keyboard event)`
- 새로운 타입의 커스텀 이벤트 생성: `new CustomEvent(event type)`

  - bubbles & cancelable 이 false로 설정
    - 변경 위해서는 두 번째 인자로 조정
    - `new CustomEvent(event type, {bubbles: true, cancelable: true})`
    - isTrusted 프로퍼티가 언제나 false이다.

- 이벤트 디스패치
  - `Element.dispatchEvent(customEvent)`:
  - 두 번째 인자로 디테일한 정보를 전달 가능하다.
  - 동기적으로 처리하므로 등록 후 디스패치해야한다.

## 느낀점

- 브라우저 - JS에서 이벤트가 어떻게 동작하는 지 알게되었다.
