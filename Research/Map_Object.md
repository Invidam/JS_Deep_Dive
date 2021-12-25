# Map과 Object에 대한 탐구글

## Map vs Object

|           |           Map           |         Object          |
| :-------: | :---------------------: | :---------------------: |
| 키의 타입 |         모든 값         |         문자열          |
|  기본 키  |            X            | prototype 관련 프로퍼티 |
| 키의 순서 |  입력한 순서대로 보장   |  항상 보장하지는 않음   |
| Size 계산 |          O(1)           |          O(n)           |
|   성능    | 잦은 추가 삭제에 최적화 |                         |

- 참고
  - https://shanepark.tistory.com/220#3-%EB%8D%94-%EB%82%98%EC%9D%80-%EC%84%B1%EB%8A%A5
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

## Array와 HashMap 그리고 TreeMap의 차이

- https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#Data-Structures-Big-O-Cheatsheet 참고
- HashMap - hash(value를 정수의 index로 변환)를 통해 index 설정 - key에 값이 들어갈 수 있다.
  | | Array | Hash Map| Tree Map|
  | :------: | :--------------: | :--------------------: |:--------------------: |
  | 저장방식 | index - value | key - value |key - value |
  | 용도 | 차례대로 값을 저장 | key에 따른 값을 빠르게 접근 | 빈번히 추가와 삭제가 되는 정렬된 값들을 접근 |
  | 추가 | O(n) | O(1) | O(log(n)) |
  | 삭제 | O(n) | O(1) | O(log(n)) |
  | 접근 | O(1) | O(1) | O(log(n)) |
  | 검색 | O(n) | O(n) | O(log(n)) |
  - 위 사이트에서 hash map의 검색이 O(1)이라고 나오는데, 원하는 값을 검색하는 경우는 O(n)이다.

### Hash Map의 Access 시간복잡도 계산

- 버킷: key -> index 변환하였을 때, index가 가리키는 주소
  - hash function f(x)가 g(x) [임의의 함수] % 100 [저장할 공간의 크기] 이라고 했을 때,
  - map("key1") 에서, key1이 g(key1) = 123이라면, f(key1) = 23이며
  - map("key2") 에서, key2가 g(key2) = 323이라면, f(key2) = 23이므로 같은 공간을 가리킨다.
  - 이러한 문제를 Hash Collision 이라고 한다.
- Java에서는 링크드 리스트를 이용하여 Hash Collision 발생시 버킷들을 이어서 문제를 해결한다.

- 이제, 이 문제를 껴안고 시간복잡도를 계산해 보자.

  - 앞서, g(x)를 나눈 100을 m (나머지) 라고 하자.
  - 모든 키의 수를 n이라고 하자.
  - key를 찾는데 걸리는 시간복잡도는 1이다. (배열의 접근의 시간복잡도와 같다.)
  - 이제 충돌을 고려해보자.
    - 충돌이 발생할 확률을 p라고 하자.
    - 즉 k개의 충돌이 발생하고, 발생한 충돌의 수를 일일이 검색해야 한다.
      - 예로, 충돌이 없다면 key 접근하는데 1, 접근된 요소를 찾는데 1이 발생한다. O(1+1) = O(1)
      - 또 다른 예로, 충돌이 MAX라면, key 접근하는데 1, 접근된 요소를 찾는데 n이 발생한다. O(1+n) = O(n)
    - 이제 p를 계산해보자.
      - p는 m에 의해 결정된다. key1, key2 예시에서 key1이 가리킨 23을 key2가 가리킬 확률은 1/m이다.
      - 따라서, n개가 있다고 하면 비둘기집 원리에 의해 n/m개가 같은 주소를 가리킨다.
  - 그렇다면 시간복잡도는 O(1 + n/m) 이다.
    - 이 때, \*가 아니라 +인 이유는 두개의 시행(key 접근과 충돌되었을 경우)이 따로 일어나기 때문이다.
  - Java에서는 capacity와 load factor를 이용하여 시간복잡도를 최소화한다.
    - capacity는 위에서 m인 버킷의 수이다. (기본값은 16이다.)
    - load factor은 임계치로, 버킷이 얼마나 찼는지를 보여준다. (기본값은 0.75이다.)
      - 따라서 버킷이 찰수록 load factor에 의해 capacity가 늘어나므로 m은 0.75 \* n 보다 작은 값이다.
  - 결국 시간복잡도는 O(1 + n/m) < O(1 + n/(0.75 \* n)) = O( 1 + (1/ 0.75)) = O (1) 이므로 O(1) 이다.

- 참고
  - https://wjdtn7823.tistory.com/75
  - https://stackoverflow.com/questions/1055243/is-a-java-hashmap-search-really-o1
