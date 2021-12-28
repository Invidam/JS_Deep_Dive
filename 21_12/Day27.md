# 29. Math

## 정리

- Math 객체는 수학적인 상수 & 함수를 위한 프로퍼티와 메서드 제공

### 프로퍼티

- Math.PI : 3.14159... 반환

### 메서드

- `Math.abs()`: 절대값 반환
- `Math.round()`: 소수점 반올림
- `Math.ceil()`: 올림
- `Math.floor()`: 내림
- `Math.sqrt()`: 제곱근 반환 (`Math.sqrt(9) === 3`)
- `Math.random()`: [0,1) 중 난수 반환
- `Math.pow()`: 거듭제곱한 결과 반환 (`Math.sqrt(a,b) === a^b`)
- `Math.max()`: 최대값 반환
- `Math.min()`: 최소값 반환

# 30. Date

## 정리

- Date 객체는 날짜와 시간을 위한 프로퍼티 & 메서드 제공

### 생성자 함수

- 날짜와 시간을 나타내는 정수값을 갖는다.

  - 1970.1.1.00:00 을 기점으로 객체가 나타내는 시간까지의 ms를 나타낸다.

- `new Date()` : 현재 날짜와 시간을 가지는 객체
- `new Date(ms)` : ms만큼 기점에서 경과한 날짜 시간을 나타내는 객체
- `new Date(dateString)` : 입력한 문자열에 맞는 날짜 시간을 나타내는 객체

  - dateString은 Date.parse에 의해 분석가능한 형식이어야 한다.
    - https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/parse 참조

- `new Date(yy,mm[,dd,hh,mm,ss,ms])`: 인수로 전달된 날짜와 시간을 나타내는 객체
  - month는 0 ~ 11이다.
    - 이유 참조: https://stackoverflow.com/questions/2552483/why-does-the-month-argument-range-from-0-to-11-in-javascripts-date-constructor
      - 요약: month를 0 ~ 11로 나타내는건 프로그래밍의 오랜 관행이라고 한다.

### 메서드

#### 정적 메서드

- `Date.now()`: 기점 ~ 현재까지의 경과시간을 ms로 나타낸다.
- `Date.parse(str)`: 기점 ~ str까지의 경과시간을 ms로 나타낸다.
- `Date.UTC(yy,mm[,dd,hh,mm,ss,ms])`: 기점부터의 경과시간을 ms로 나타낸다.

#### 프로토타입 메서드

- `Date.prototype.set{FullYear, Month, Date}(arg)`: 해당 날짜 단위부터 작은 단위까지 설정
- `Date.prototype.get{FullYear, Month, Date}()`: 해당 날짜 단위를 가져온다
- `Date.prototype.getDay()`: 요일을 확인한다. (0: 일, 1: 월, ..., 6: 토)
- `Date.prototype.set{Hours, Minutes, Seconds, Milliseconds}(arg)`: 해당 시간 단위부터 작은 단위까지 설정
- `Date.prototype.get{Hours, Minutes, Seconds, Milliseconds}()`: 해당 시간 단위를 가져온다

- `Date.prototype.getTime()`: 기점부터 경과시간을 ms로 나타낸다.
- `Date.prototype.setTime(arg)`: 기점부터 arg까지 경과된 날짜 시간으로 설정

- `Date.prototype.getTimezoneOffset()`: locale과 UTC와의 시간차이를 분단위로 반환한다.
  - ms로 바꾸기 위해서는 `*60 (m -> s) * 1000 (m -> ms)` 를 해야한다.
  - UTC - localeTime 이기에 KST의 경우 9시간이 빠르므로 -540이 나온다.
  - UTC to KST: `const UTCtoKST = (utc) => new Date(utc.getTime() -new Date().getTimezoneOffset()*60*1000) // UTC: 2021-12-27T13:54:18.097Z -> KST: 2021-12-27T22:54:18.097Z`
- `Date.prototype.toString()`: `요일 월 일 년도 HH:MM:SS GTM+0900 (KST)`
  - `'Sat Feb 27 2021 22:47:58 GMT+0900 (Korean Standard Time)'`
- `Date.prototype.toDateString()`: `요일 월 일 년도` 만 리턴
- `Date.prototype.toTimeString()`: `HH:MM:SS GTM+0900 (KST)` 만 리턴
- `Date.prototype.toISOString()`: ISO 형식으로 리턴
  - `'2021-02-27T13:47:58.291Z'`
- `Date.prototype.toLocaleString(arg)`: arg에 따른 표기로 리턴
  ```
  > date.toLocaleString()
  > '2/27/2021, 10:47:58 PM'
  > date.toLocaleString('ko-KR')
  > '2021. 2. 27. 오후 10:47:58'
  ```

## 느낀점

-
