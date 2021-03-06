# 39. DOM

## 정리

### DOM

- 렌더링 엔진은 HTML문서를 파싱하여 DOM을 생성한다.
- `<div class="greet">Hi</div>`
- 위 태그를 노드로 바꾸면
  - 요소 노드: `div`
  - 어트리뷰트 노드: `class="greet"`
  - 텍스트 노드: `"Hi"`
- 노드 객체들을 부자관계를 반영하여 트리구조로 구성시킨다.
  - 이를 DOM이라고 한다.

### 노드 객체의 타입

- 총 12개의 종류가 있다.
  - 문서 노드: 최상위 노드로써, document 객체를 가리킨다.
    - document 객체: HTML 문서 전체를 가리킨다.
      - 문서당 document 객체는 유일하다.
      - js에서 DOM의 노드들을 접근하기 위한 진입점 역할을 한다.
  - 요소 노드: HTML 요소를 가리킨다.
  - 어트리뷰트 노드: 어트리뷰트가 설정된 요소의 노드와 연결되어 있다.
    - 연결되어있을 뿐, 형제관계는 아니며 부모관계도 없다.
  - 텍스트 노드: HTML 요소의 텍스트를 가리킨다.
    - 요소 노드의 자식이다.
    - 자식을 가질 수 없는 리프 노드이다.

### 노드 객체의 상속구조

- DOM의 노드 객체는 브라우저 환경에서 제공하는 호스트 객체이다.
- 모든 노드는 Object, EventTarget, Node 를 상속받는다.
- 각 노드는 특성에 따라 다른 인터페이스를 상속받기도 한다.

- DOM은 HTML 문서를 계층적 구조와 정보로 표현하며, 노드 타입에 따라 필요한 기능을 DOM API로 제공한다.
  - DOM API를 통해 HTML 구조, 내용, 스타일을 동적 조작할 수 있다.

### 요소 노드 취득

- id를 이용: `document.getElementById(idStr)`
  - 반환: Element 객체
  - 에러 처리
    - 존재X -> `null` 반환
  - 암묵적으로 id attr에 해당하는 전역변수가 전역되어, 해당 노드가 할당되는 부수 효과가 있다.
- 태그 이름을 이용: `Document.prototype.getElementsByTagName(tag)`
  - 반환: 여러 노드 객체를 갖는 HTMLCollection 객체
  - 에러 처리
    - 존재X -> 빈 HTMLCollection
  - tag에 \* 입력시 모든 요소 노드 취득
- 클래스 이용: `Document.prototype.getElementsByClassName(class)`

  - 반환: 여러 노드 객체를 갖는 HTMLCollection 객체
  - 에러 처리
    - 존재X -> 빈 HTMLCollection

- 태그, 클래스 이름을 이용한 검색은 `Document.prototype`과 `Element.prototype`을 이용한 검색 모두 가능하다.

  - Document는 DOM의 루트 노드를 통해 호출하여 DOM 전체 노드를 탐색 후 반환한다.
  - Element는 특정 요소 노드를 호출하여 자손 노드에서 탐색 후 반환한다.

- CSS 선택자를 이용: `Document.prototype.querySelector(selector)`
  - 반환: Element 객체
  - 에러 처리
    - 존재X -> `null` 반환
    - 선택자 문법X -> DOMException Error 발생
  - 첫 번째 노드만 반환
    - 모든 요소 검색위해선 `SelectorAll`을 이용
      - 반환: NodeList
- 요소 취득여부 확인: `Element.prototype.matches(selector)`

### HTMLCollection과 NodeList

- 여러 결과값을 반환하기 위한 컬렉션 객체이다.
- 둘 다 이터러블이다.

#### HTMLCollection

- live DOM Collection이다.
  - 실시간 노드 변화를 반영하므로, 순회 도중 변화한다.

#### NodeList

- HTMLCollection의 실시간 문제 해결 위한 객체이다.
- non-live 객체이다.

  - 실시간 상태변경을 반영하지 않는다.
    - **childNodes 프로퍼티는 live 객체로 동작한다.**

- 안전하게 DOM Collection을 사용하기 위해선, 객체를 배열로 변환하여 사용할 것을 권장한다.

### 노드 탐색

#### 프로퍼티

- Node.prototype: parentNode, previousSibling,firstChild,childNodes 프로퍼티 제공
- Element.prototype: previousElementSibling,nextElementSibling,children 프로퍼티 제공
- 모두 접근자 프로퍼티이다.

#### 공백 텍스트 노드

- HTML 요소 사이의 공백문자는 텍스트 노드를 생성한다.

#### 자식 노드 탐색

|       프로토타입        |    Node    |      Element      |
| :---------------------: | :--------: | :---------------: |
| 텍스트 노드 포함 가능성 |     O      |         X         |
|        자식 노드        | childNodes |     children      |
|      첫 자식 노드       | firstChild | firstElementChild |
|    마지막 자식 노드     | lastChild  | lastElementChild  |

- 자식 노드 존재 확인: `Node.prototype.hasChildNodes(node)`
  - 텍스트 노드 제외: `children.length` or `childElementCount`

#### 부모 노드 탐색

- `Node.prototype.parentNode(selector)`

#### 형제 노드 탐색

|       프로토타입        |      Node       |        Element         |
| :---------------------: | :-------------: | :--------------------: |
| 텍스트 노드 포함 가능성 |        O        |           X            |
|     이전 형제 노드      | previousSibling | previousElementSibling |
|     다음 형제 노드      |   nextSibling   |   nextElementSibling   |

#### 노드 정보 탐색

- `Node.prototype.nodeType(Node)`: 노드 타입을 나타내는 상수를 반환
  1. ELEMENT_NODE
  2. TEXT_NODE
  3. DOCUMENT_NODE
- `Node.prototype.nodeType(Node)`: 노드 이름을 문자열로 반환
  - 요소 노드: 대문자 문자열의 태그이름
  - 텍스트 노드: #text
  - 문서 노드: #document

### 텍스트 조작

- `Node.prototype.nodeValue`: 접근 & 할당 가능

  - 방법: 요소 노드의 텍스트 노드를 취득 후 nodeValue 프로퍼티 이용

- `Node.prototype.textContent`: 접근 & 할당 가능
  - 방법: 요소 노드 취득 후 textContent 프로퍼티 이용
  - 단점: 하위 요소들도 텍스트로 취급된다.
  - `innerText`도 비슷하나, css를 고려해야 하여 권장 X

### DOM 조작

- `innerHTML`: 요소 노드 안에 포함된 HTML 마크업을 문자열로 반환

  - 사용자의 입력을 그대로 innerHTML 프로퍼티에 할당하면 문제가 발생할 수 있으므로 위험하다.
    - XSS: Cross-Site Scripting Attacks
  - 기존 자식 노드가 유지되지 않고 새롭게 생성되므로 비효율적이다.

- `insertAdjacentHTML(위치,HTML)

  - 기존 요소 영향X
    - 효율적 빠름
  - 공격에 취약

        $foo.insertAdjacentHTML("beforebegin", "<p>beforebegin</p>");
        $foo.insertAdjacentHTML("afterbegin", "<p>afterbegin</p>");
        $foo.insertAdjacentHTML("beforeend", "<p>beforeend</p>");
        $foo.insertAdjacentHTML("afterend", "<p>afterend</p>");

- 노드 생성

  - `Document.prototype.createElement(tagName)`
  - `Document.prototype.createTextNode(text)`

- 노드 삽입
  - `Node.prototype.appendChild(childNode)` : 마지막 자식을 추가
    - 리플로우 리페인트가 실행된다.
  - 복수의 삽입
    - 요소에 컨테이너를 자식으로 추가한 후 컨테이너에 삽입한 뒤 컨테이너를 삽입하면 1번만 DOM이 변경된다.
      - `ul -> div -> li x 3`
    - 컨테이너 추가가 문제가 된다.
      - DocumentFragment 노드로 해결 가능하다.
        - DOM과 별도로 존재하며, 자식 추가시 DOM에 영향 X
        - DOM에 위 노드를 추가하면 자신은 제거되고 자식만 DOM에 추가
  - `Node.prototype.insertBefore(newNode,childNode)` : childNode 앞에 newNode를 추가
- 노드 이동

  - 존재하는 노드를 append,insert하면 제거 후 추가된다. 이를 이용해 이동가능하다.

- 노드 복사

  - `Node.prototype.cloneNode(isDeep)` : 노드 사본 복사
    - isDeep으로 깊은 복사 얕은 복사(자식 X) 결정

- 노드 교체
  - `Node.prototype.replaceChild(new,old)` : 노드 교체
- 노드 제거
  - `Node.prototype.removeChild(child)` : 노드 제거

### 어트리뷰트

- 글로벌 어트리뷰트: id, class, style, ...
- 이벤트 핸들러 어트리뷰트: onClick, onChange, ...
- NamedNodeMap 객체에 담겨 attributes 프로퍼티에 저장된다.

  - getter만 존재한다.

- `Element.prototype.getAttribute(attributeName)` 로 참조가 가능하다.
- `Element.prototype.setAttribute(attributeNam,value)` 로 변경이 가능하다.
- `Element.prototype.hasAttribute(attributeName)` 로 존재확인이 가능하다.
- `Element.prototype.removeAttribute(attributeName)` 로 삭제가 가능하다.

#### HTML attribute vs DOM property

- DOM 프로퍼티는 HTML 어트리뷰트를 초기값으로 가진다.
  - getter, setter 모두 가능하다.
- HTML 어트리뷰트: 초기 상태를 관리
- DOM 프로퍼티: 최신 상태를 관리

  - 사용자가 상태 변경 시 DOM만 반영한다.

    |  어트리뷰트   | HTML 어트리뷰트 | DOM 프로퍼티 |
    | :-----------: | :-------------: | :----------: |
    | 유지하는 상태 |    초기 상태    |  최신 상태   |
    |   값의 타입   |     문자열      |  여러 타입   |

- data attribute
  - HTML 요소에서 정의한 데이터와 JS의 데이터를 상호간 교환 & 참조 가능하다.
    - HTML에서는 `data-{name}`으로 접근 가능
    - JS에서는 `HTMLElement.dataset`에서 접근 가능
      - JS의 카멜케이스 <-> HTML의 케밥케이스로 자동변경

### 스타일

- `HTMLElement.prototype.style`로 접근 & 변경 가능
  - css의 케밥케이스를 이용하려면 `Element.style['background-color']` 로 접근해야 함
  - 기존 카멜케이스를 이용하려면 `Element.style.backgroundColor`로 접근하면 됨
  - 값의 할당은 "100px" 처럼 값+단위를 문자열로 전달

### 클래스 조작

- `Element.prototype.className`
  - 접근 & 변경 가능
- `Element.prototype.classList`
  - class attr의 정보를 DOMTokenList 객체로 반환한다.
    - 위 객체는 이터러블이다.
  - 메서드들
    - `add(className)`: 클래스 이름 추가 (1개 이상)
    - `remove(className)`: 클래스 이름 제거 (1개 이상)
    - `item(index)`: index번 째의 클래스 네임 리턴
    - `contains(className)`: 존재 확인
    - `replace(old, new)`: 클래스 변경
    - `toggle(className[,force])`: 존재 O -> 제거 & 존재 X -> 추가
      - force 인자가 있을 경우 true -> 추가 false -> 삭제로 논리를 변경한다.결정한다.

### 적용된 CSS 스타일 참조

- style 프로퍼티는 인라인 스타일만 반환한다.
- `window.getComputedStyle(element[,pseudo])` : 요소에 **적용된** 모든 스타일 참조가능
  - 두 번째 인자: 의사 요소를 지정 가능 (:after,:before 등)

## 느낀점

- 프로토타입 공부하니 객체의 프로퍼티 메서드를 이해하게 되었는데 이를 통해 DOM API를 잘 이해할 수 있었다.
  - getter, setter & `Element vs Node vs HTMLElement` 등
- 자주 사용하였지만, 원리는 알지 못했는데 이번에 배울 수 있었다.
