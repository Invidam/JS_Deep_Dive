# 31. RegExp

## 정리

### 정규표현식

- 패턴을 가진 문자열 집합을 표현하기 위한 형식 언어이다.
- JS는 Perl의 문법을 도입하였다.

- 간단한 체크 가능
- 언어에 상관없는 공유가능
- 가독성 불편

- `/{pattern}/{flag}`

### RegExp 생성자 함수

- `new RegExp(pattern[,flag])`
- `/{pattern}/{flag}` : 리터럴로 생성

### 메서드

- `Reg.prototype.exec(target)`: reg 패턴 검색 후 결과 정보를 배열로 반환
  - [ 'student', index: 7, input: 'I am a student', groups: undefined ]
  - 첫 번째 결과만 반환
- `Reg.prototype.test(target)`: 결과 매칭 여부 T/F로 반환
- `String.prototype.match(reg)`: 매칭된 결과들을 배열로 반환

### 플래그

- i: 대소문자 구분 X
- g: 모든 문자열을 전역 검색
- m: 행이 바뀌어도 계속 검색

## 32. String

### 생성자 함수

- `new String(str)`로 생성
- `String(value)`로 타입변환

### 메서드

- `String.prototype.indexOf(str)`: 검색한 문자열의 첫 번째 인덱스를 반환 (없으면 -1)
- `String.prototype.search(reg)`: 정규표현식과 일치하는 인덱스를 반환 (없으면 -1)
- `String.prototype.includes(str)`: 검색한 문자열이 포함되었는지 T/F로 반환
- `String.prototype.startsWith(str)`: str으로 시작하는지 확인하여 T/F로 반환
- `String.prototype.endsWith(str)`: str으로 끝나는지 확인하여 T/F로 반환
- `String.prototype.charAt(idx)`: 문자열의 idx에 해당하는 문자 반환
- `String.prototype.substring(firstIdx,secondIdx)`: first ~ second Idx까지의 부분 문자열을 반환 (secondIdx없을 시 first ~ end까지)
- `String.prototype.slice(firstIdx,secondIdx)`: first ~ second Idx까지의 부분 문자열을 반환 (secondIdx없을 시 first ~ end까지)
  - substring은 음수에 대해 0으로 취급하지만, slice는 뒤에서부터 n자리를 잘라낸다고 취급
- `String.prototype.trim()`: 공백 제거후 반환
- `String.prototype.repeat(num)`: 인자만큼 문자열이 연속된다고 가정한 문자열 생성
- `String.prototype.replace(reg|str,toChange)`: 검색한 문자열을 치환
  - toChange, $&은 검색된 문자열을 의미
  ```
  const camelToSnake = (str) =>
  str.replace(/[A-Z]/g, (match) => "_" + match.toLowerCase());
  const snakeToCamel = (str) =>
  str.replace(/_[a-z]/g, (match) => match[1].toUpperCase());
  ```
  위처럼 두 번째 인자에 검색된 문자열을 치환하는 함수도 가능하다.
- `String.prototype.split(separator)`: separator을 기준으로 구분한다. (생략시 모든 문자열을 한글자씩 분리)
