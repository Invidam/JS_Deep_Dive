# 27. 배열

## 정리

### 정의

- `array[index] = element;`

- 객체와 차이

  - 배열은 객체의 일종이지만, 차이점이 있다.
    - 값의 순서가 존재
    - length 프로퍼티가 존재

- 일반적인 배열이 아니다.
  - 밀집배열 (일반 배열)
    - 하나의 데이터 타입으로 이루어짐
    - 메모리공간에 연속적으로 인접함
    - 빠른 접근 가능
    - 삭제, 추가 효율적 X
  - 희소배열 (JS 배열)
    - 여러 데이터 타입이 가능
    - 연속적이지 않음
    - 접근 비교적 느림
    - 삭제 삽입시 빠른 성능
- length 프로퍼티

  - 삽입, 삭제시 자동 갱신
  - 작은 값 할당시 배열 길이 감소
  - 큰 값 할당시 변화 X

- **같은 데이터 타입 사용 & 연속적으로 위치하는 것이 최선**

### 생성

- 리터럴
  - `const arr = [1,2,3]`
- 생성자 함수
  - `const arr = new Array(3);`
  - new 연산자 없이 호출 -> 생성자 함수로써 동작
- `Array.of`
  - 전달된 인자를 요소로 갖는 배열 생성
- `Array.from`
  - 유사배열 객체 -> 배열 생성
  - 두 번째 인자인 콜백함수에게 Array.prototype.map 실행
    - `Array.from({length : 3},(_,idx) => idx+1); //[ 1, 2, 3 ]`

### 추가 & 삭제

- 인덱스에 정수 (정수형태의 문자열)이 아닌 요소를 추가하면 length에 반영 X

- 삭제는 arr.splice(idx,size)로 제거

### 메서드

#### 정적 메서드

- Array.isArray() : 배열인지 확인

#### 프로토타입 메서드

- Mutator method: 원본 배열 원본변경
- Accessor method: 원본 배열 원본변경 X 새로운 배열 생성해 반환

- `Array.prototype.indexOf(idx)` : 요소의 인덱스 검색
- `Array.prototype.unshift(args)`: 인자들을 원본배열 선두에 추가 (원본변경 O)
  - `const newArr = [args, ...arr]` : 원본 변경 X
- `Array.prototype.shift()` pop_front
- `Array.prototype.concat(args)` 인자를 **마지막 요소**로 추가한 배열을 생성 (원본변경X)
  - 배열일 경우 해체하여 전달
- `Array.prototype.splice(a,b,c)`: a에서부터 b만큼 제거 후 c를 그자리에 추가

  - b부터 없을경우 모두 제거

- `Array.prototype.slice(startIdx,endIdx)` : 범위 요소 복사하여 배열로 반환
- `Array.prototype.join(separator)` : 요소를 구분자로 구분된 문자열로 반환
- `Array.prototype.reverse()`: 뒤집는다. (원본 변경 O)
- `Array.prototype.fill(value) :` value로 가득채운다 (원본 변경 O)
- `Array.prototype.includes(elem,idx)`: 요소 포함 여부 확인
  - idx가 음수 : length - idx 부터 확인
- `Array.prototype.flat(n)` : n번만큼 평탄화
  - Infinity : 모두

### 배열 고차함수

- `Array.prototype.sort(sortFunction)` : 오름차순 정렬
  - 유니코드 순으로 정렬되므로 숫자 정렬시 `(a,b => a -b)`로 비교함수를 바꿔야한다.
  - 비교함수 값
    - 1: 두 번째 인자 우선
    - 0: 교체 X
    - -1: 첫 번째 인자 우선
  - timesort 알고리즘 사용
- `Array.prototype.forEach(callback)`: for문 대체
  - 콜백함수 인자: `(item, index, arr)`
    - 콜백함수를 통해 원본 `arr` 변경가능
  - 성능 비교적 별로
  - 가독성 좋음
  - break, continue X -> return으로 대체
- `Array.prototype.map(callback)`: 요소를 순회하며 콜백함수를 호출하여 새로운 배열 반환
  - 콜백함수 인자: `(item, index, arr)`
- `Array.prototype.filter(callback)`: 요소를 순회하며 콜백함수를 호출하여 참인 요소들로 구성된 새 배열 반환

  - 콜백함수 인자: `(item, index, arr)`

- **`Array.prototype.reduce()`**: 요소를 순회하며 콜백함수를 호출하고 반환값을 첫 번째 인자로 삼으며 하나의 값을 만들어 반환

  - 콜백함수 인자: `(accumulator, currentValue, index, arr)`
  - 자체인자 `(callback, initialValue)`
    - 초기값 꼭 주기

- `Array.prototype.some(callback)`: 요소를 순회하며 콜백함수를 호출하여 하나라도 참이면 true 반환 아니면 false
- `Array.prototype.every(callback)`: 요소를 순회하며 콜백함수를 호출하여 하나라도 모두이면 true 반환 아니면 false
- `Array.prototype.find(callback)`: 요소를 순회하며 콜백함수를 호출하여 반환값이 처음으로 참인 요소 반환
- `Array.prototype.findIndex(callback)`: 요소를 순회하며 콜백함수를 호출하여 반환값이 처음으로 참인 요소의 인덱스 반환
- `Array.prototype.flatMap(callback)` : map -> flat

## 느낀점

- 자주 사용하여 잘 알고있었지만, this - 화살표 함수를 비롯하여 책에서 배운 관점으로 바라보니 새로웠다.
- Object, Map 등이 햇갈렸는데 이번 기회에 정리할 수 있었다.
