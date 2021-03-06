# 16 프로퍼티 어트리뷰트

## 정리

- 내부 슬롯과 내부 메서드
  - JS 엔진의 구현 알고리즘을 설명하기 위해 사용된 의사 프로퍼티와 의사 메서드
  - [[]]로 감싸져 있는 것들 ex) `[[Prototype]]`
- 프로퍼티 어트리뷰트
  - 프로퍼티가 생성될 때 어트리뷰트도 자동 정의된다.
  - `Object.getOwnPropertyDescriptor(obj,"key")`로 확인 가능
- 데이터 프로퍼티

  - 일반적, 인스턴스나 메서드

    | Property Attribute |                                      Description                                      |
    | :----------------: | :-----------------------------------------------------------------------------------: |
    |     [[Value]]      |                 프로퍼티 값에 접근시 반환 & 변경 시 재할당되는 속성.                  |
    |    [[Writable]]    |        프로퍼티 값의 변경 가능 경우를 나타내는 속성. (false라면 변경 불가능 )         |
    |   [[Enumerable]]   | 프로퍼티의 열거 가능 여부를 나타내는 속성. (false 라면 Object.keys() 등으로 열거불가) |
    |  [[Configurable]]  |      프로퍼티의 재정의 가능 여부를 나타내는 속성 (false 라면 다시 정의가 불가능)      |

- 접근자 프로퍼티

  - 자체적인 값이 없고, 접근자 함수로만 구성되어 있음
    | Property Attribute | Description |
    | :----------------: | :-----------------------------------------------------------------------------------: |
    | [[Get]] | getter 함수를 호출 -> 프로퍼티 값을 반환 |
    | [[Set]] | setter 함수를 호출 -> 프로퍼티 값으로 저장 |
    | [[Enumerable]] | 프로퍼티의 열거 가능 여부를 나타내는 속성. (false 라면 Object.keys() 등으로 열거불가) |
    | [[Configurable]] | 프로퍼티의 재정의 가능 여부를 나타내는 속성 (false 라면 다시 정의가 불가능) |

    Ex)

    ```
    const date = {
    year : 2021, month : 12, day : 17 ,
    get fullDate() {return `${this.year}-${this.month}-${this.day}`;},
    set fullDate(date) {[this.year,this.month,this.day]= date.split("-").map(elem => elem * 1);}
    };
    ```

- 프로퍼티 어트리뷰트 확인
  - 하나의 프로퍼티: `Object.getOwnPropertyDescriptor(obj,"key")`
  - 모든 프로퍼티: `Object.getOwnPropertyDescriptors(obj)`
- 프로퍼티 정의
  - 하나: `Object.defineProperty(obj,key,{ ...atr})`
  - 전체:
  ```
    Object.defineProperties(obj,{
        key1:{
            ...atr1
            },
        key2:{
            ...atr2
            },
        ...
        })
  ```
  - 생략된 속성은 false, undefined로 초기화 된다.
- 객체 변경 방지

  |     구분      |          메서드          | 추가 | 삭제 | 값 읽기 | 값 쓰기 | 속성 재정의 |
  | :-----------: | :----------------------: | :--: | :--: | :-----: | :-----: | :---------: |
  | 객체 확장금지 | Object.preventExtensions |  X   |  O   |    O    |    O    |      O      |
  |   객체 밀봉   |       Object.seal        |  X   |  X   |    O    |    O    |      X      |
  |   객체 동결   |      Object.freeze       |  X   |  X   |    O    |    X    |      X      |

- 각각 `Object,isExtensible, Object.isSealed, Object.isFrozen` 으로 확인 가능

- 불변객체
  - 중첩된 객체까지 동겨하려면 재귀호출을 이용해 freeze해야함.

## 느낀점

- 객체를 안전하게 사용하기 위해 사용하는 방법들에 대해 배웠다.

# 17. 생성자 함수에 의한 객체 생성

## 정리

### 개념 정리

- 객체 리터럴을 사용한 생성 방식의 문제점
  - 빈번한 생성시 **비효율적**
- 생성자 함수를 사용한 생성 방식의 장점

  - 같은 구조의 여러 객체를 **간편히 생성**

- this : 자기 참조 변수

  - 호출 방식에 따라 가리키는 값이 다르다.
    |호출 방식 | 가리키는 값 |
    | :------: | :--------------: |
    | 일반 함수 | 전역 객체 |
    | 메서드 | 메서드를 호출한 객체 |
    | 생성자 함수 | 생성자 함수가 생성할 인스턴스 |
  - new 없이 생성자 함수를 호출하면 생성자 함수안의 this는 전역변수로 작용
  - 바인딩: this가 가리킬 객체와 this가 갖고 있는 프로퍼티와 메서드를 연결하는 것.

### 인스턴스 생성과정

1. 암묵적 인스턴스 생성 & this와의 바인딩 (암묵적)
2. 인스턴스 값 초기화 & 값 할당 (개발자가 담당)
3. 인스턴스 반환
   - return 문이 없다면 암묵적으로 this 반환

- 함수 객체 프로퍼티 내부 메서드

  - 함수 또한 객체이므로 내부 슬롯과 메서드를 가지고 있음.
  - 함수는 일반 객체와 달리 호출가능함.
  - 함수로 동작하기 위한 객체를 가지고 있음.
  - **즉 함수를 객체와 구분시키는 내부 슬롯과 메서드가 존재함.**

- [[Call]]: 일반 함수로써 호출되면 실행된다.
- [[Constructor]] : 생성자 함수로써 호출될 때 실행된다.

- constructor & non-constructor
  - 화살표 함수, 메서드 축약 표현 (`fun(args) { ...}`) 은 [[Constructor]] 메서드가 없는 non-constructor이다.
- ## new.target : 생성자함수로써 호출되면 자기 자신을 가리킨다. (일반함수로써 호출되면 `undefined`를 가리킨다.)

  ```
  function Person(age) {
  if (!new.target) {
    return new Person(age);
  }
  this.age = age;
  }
  ```

  - 스코프 세이프 생성자 패턴
    - IE에서는 target을 지원 X
    - `this instance of Person` 을 이용하여 생성자 함수인지 확인ㄴ

- 빌트인 생성자 함수
  - 대부분은 new 연산자가 없어도 동일하게 동작한다.
  - String,Number,Boolean은 new 연산자가 없다면 해당 데이터 타입의 값을 반환한다.

## 느낀점

- JS 엔진이 내부슬롯과 메서드를 이용하여 JS를 구현한다는 것을 이해하였다.
  - 함수가 객체와 다른 점이 자연스레 존재하는 것이 아니라 엔진에서 여러 내부 슬롯과 메서드로 인해 구현해냈다는 내용에서 이해가 되었다.
