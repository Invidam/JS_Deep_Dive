# 09 타입 변환과 단축 평가

## 정리

- 명시적 타입변환 (Explicit coercion)
  - 변환의 의지가 명백함
- 암묵적 타입변환 (Implicit coercion)
  - 의지가 명백 X
  - 암묵적 타입변환이 일어나는 지, 일어날 때 어떻게 변하는 지 예측하기 위해서라도 알아야 함.

### 명시적 타입변환

- 문자열로의 변환

  - `String(var);`
  - `var.toString();` : 이해하기 편함.
  - `var + "";`

- 숫자로의 변환

  - `Number(var)` :
  - `parseInt(str) //문자열만 가능` : 16진수 등 여러방면에서 활용가능.
  - `+var;`
  - `var * 1;`

- 불리언으로의 변환
  - `Boolean(var);`
  - `!!var`

### 단축평가

- 단축평가: `&&`, `||` 이 연산의 결과를 결정하는 피연산자를 반환하는 것.
  - if문 대체가능.
  - 객체 value 참조시 활용가능.
    - `Object && Object.value`
  - 인자가 비었는지 확인가능.
    - `str || ""`

### 옵셔널 체이닝 연산자

- `?.` 로 사용
- `좌항 === (null || undefined) ? undefined : 우항의 프로퍼티 참조`
  - Ex) obj?.value // obj가 비었으면 undefined 아니면 obj.value 반환.
- **객체 value 참조시 활용가능**
  - (&& 사용에서 대체.)
  - &&는 좌항이 Falsy값일 경우 좌항을 반환해 문제가 됨.
  ```
  var str= "";
  var len1 = str && str.length // len1 = ""가 들어감.
  var len2 = str?.length // len2 = undefined가 들어감.
  ```

### null 병합 연산자

- `??`로 사용
- `좌항 === (null || undefined) ? 우항의 피연산자 반환 : 좌항의 피연산자 반환`
- **인자가 비었는지 확인가능**
  - || 사용에서 대체
  - 좌항이 Falsy값이지만, null과 undefined가 아닌 경우 좌항의 값을 유지가능함.
  ```
  var str = "";
  var str1 = str || "default" // "default"가 들어감.
  var str2 = str ?? "default" // ""가 들어감.
  ```

## 느낀점

- 평소 `&&, ||, ?.`를 골고루 사용했는데 사용시의 어떠한 과정을 거쳐 어떠한 값을 반환하는 지 이해함.
- `??`의 사용법을 익힘.

# 10. 객체 리터럴

## 정리

- 객체는 원시 타입의 값과 달리 변경이 가능하다.
- 객체의 구성
  - 객체는 0개 이상의 프로퍼티의 집합.
  - 프로퍼티는 키와 값을 가짐.

```
var obj = {
    key : value  // key와 value의 조합이 프로퍼티
    func: function() {} // 프로퍼티의 값이 함수라면 메서드라고 부름.
}
```

- JS는 Java, C++과는 달리 **new 연산자**가 아니라 **리터럴**로 객체를 생성가능

- 객체에 존재하지 않는 프로퍼티에 접근하면 ReferenceError가 아닌 undefined를 리턴함.

- 프로퍼티 삭제
  - delete 연산자를 이용
    - 존재치 않는 프로퍼티를 삭제해도 에러는 발생 X
- Property shorthand
  ```
    let x =1 , y =2;
    const obj = {x,y}
  ```
  처럼 선언가능
- 프로퍼티 이름을 동적으로 계산 가능

## 느낀점

- JS에서 중요한 객체고, 자주 사용하다보니 어느정도 익숙했음.
- 중요한 내용은 따로 챕터에서 다루니 그 때 열심히 할 것.
  - 잘 모르는 부분: 함수는 일급 객체 라는 내용.

# 11 원시 값과 객체의 비교

## 정리

### 원시타입과 객체 타입

|           | 원시 타입 |   객체 타입    |
| :-------: | :-------: | :------------: |
| 값의 변경 |  불가능   |      가능      |
| 저장 방식 |    값     |    참조 값     |
| 전달 방식 | 값의 복사 | 참조 값이 복사 |

### 원시타입

- 변수: 재할당을 통해 변수 값을 변경가능
- 상수: 재할당이 금지된 변수
- 재할당: 값이 변하는 것이 아니라, 변수가 참조하는 메모리 공간의 주소를 바꿈.

  - 장점: 상태 변화를 추적하기가 쉽다.
  - 다른 언어의 경우 메모리 공간을 바꾸는 것이 아니라 값을 바꾸는 경우도 있다. (C++로 확인)
  -

- 문자열 또한 원시타입이므로 변경이 불가능하다.
  - Ex) `var str = "str"; str[0] = 'a'; console.log(str) // str`
    - str[0]이 a로 바뀌지 않음.

### 원시타입 값의 전달

- ES에서 내부 동작방식(평가 방식)이 명확히 정의되지는 않음.
  1. 새로운 메모리 주소를 생성해 값을 복사
  2. 기존 메모리 주소를 전달 후 값이 바뀔 때 다른 메모리 주소를 할당
- **메모리 주소를 전달하며, 이를 통해 값을 참조함.**
- **두 변수의 값은 별개의 값으로 취급되며, 한쪽의 재할당이 다른 쪽에 간섭할 수 없음.**

### 객체

- 객체 관리 방식

  - Java, C++은 정적 타이핑이므로, 정의된 객체 프로퍼티의 메모리범위를 컴파일 시 결정해 저장해놓을 수 있음.
  - JS는 동적 타이핑이므로, 이가 불가능하며 프로퍼티를 읽을 때마다 **동적 탐색**을 이용해 찾아야 함 따라서 성능이 느려짐.

    - 이러한 **동적 탐색**을 회피하기 위해 **히든 클래스**가 도입됨.

- 히든 클래스
  - 생성된 객체에 해당하는 오프셋을 미리 만들어 참조시킴.
  - 프로퍼티가 추가될 때마다 오프셋을 추가로 만듦.
    - 정확히는 기존 오프셋에 추가된 프로퍼티를 읽을 때마다 새로운 오프셋을 참조하게끔 함.
- 출처: https://engineering.linecorp.com/ko/blog/v8-hidden-class/

- 객체의 복사
  - 원시 값의 복사는 재할당을 통해 값을 새로 만들어야 함.
  - 객체도 복사해 재할당한다면 크기가 크며 비용이 많이 들어 비효율적임.
    - 객체가 변경가능한 이유도 복사를 최소화하기 위해서.
    - **따라서 객체는 메모리 주소를 공유하는 방식으로 복사함.**
      - 같은 주소를 공유하기에 서로 영향을 주고받는다.
- 깊은 복사와 옅은 복사
  - **공유**가 아니라 원본과 다른 진짜 **복사**하는 경우.
  - 옅은 복사는 한단계 까지만 복사.
  - 깊은 복사는 중첩된 모든 요소를 복사.

## 느낀점

- JS가 C++, Java 등 다른 언어와 다른점이 많은 까닭을 고민해 보았다.

  1. 개발목적이 달라서
  2. 근래에도 계속 큰 맥락에서 변화하고 있어서

- 중요한 객체에 대해 히든 클래스, 깊은 &옅은 복사에 대해 알게되어 보람찼다.
