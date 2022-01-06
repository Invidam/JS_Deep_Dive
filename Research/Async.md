# 예제를 통한 비동기 문제 해결 방법

## 비동기 처리가 필요한 이유

- 예제

        const NAME = "Invidam",
        ID = { Invidam: 123 },
        INFO = { 123: { age: 23, hobby: ["game", "study", "movie"] } };
        const getIdByName = async (name) => {
            let ret;
            await new Promise((resolve, _) =>
                setTimeout(() => {
                ret = ID[name];
                resolve();
                }, 1000)
            );
            console.log(`GET ID BY NAME, NAME: ${name} -> ID: ${ret}`);
            return ret;
        };
        const getInfoById = async (id) => {
            let ret;
            await new Promise((resolve, _) =>
                setTimeout(() => {
                ret = INFO[id];
                resolve();
                }, 1000)
            );
            console.log(
                `GET INFO BY ID, ID: ${id} -> INFO: ${JSON.stringify(ret, null, 2)}`
            );
            return ret;
        };

        const printInfo = (info) => console.log("FINALLY, INFO: ", info);
        printInfo(getInfoById(getIdByName(NAME)));

- 결과값

  ```
  FINALLY, INFO:  Promise { <pending> }
  GET ID BY NAME, NAME: Invidam -> ID: 123
  GET INFO BY ID, ID: [object Promise] -> INFO: undefined
  ```

- `getIdByName`: 이름 -> ID를 가져오는 비동기 함수 (**async, await, Promise는 신경쓰지 말고 Input과 Output만을 고려해보자**)
- `getInfoById`: ID -> 정보를 가져오는 비동기 함수
- `printInfo`: 정보 출력하는 동기 함수
- `printInfo(getInfoById(getIdByName(NAME)))`라는 일반적인 함수처리 방식을 사용하게 되면
  1. `getIdByName` 이 비동기 함수이므로 태스크 큐로 들어간다.
  2. `getInfoById` 가 비동기 함수이므로 태스크 큐로 들어간다.
  3. `printInfo` 가 실행된다.
  4. 인자로 받은 `Info` 가 아직 결정되지 않았기에 반환을 해 줄 비동기 함수가 대기중이라는 표현 `Promise { <pending> }` 이 출력되며, 원하는 결과를 얻지 못한다.

## 콜백 패턴을 이용한 해결

- 예제

        const NAME = "Invidam",
        ID = { Invidam: 123 },
        INFO = { 123: { age: 23, hobby: ["game", "study", "movie"] } };
        const getIdByName = async (name, callback) => {
        let ret;
        await new Promise((resolve, _) =>
            setTimeout(() => {
            ret = ID[name];
            resolve();
            }, 1000)
        );
        console.log(`GET ID BY NAME, NAME: ${name} -> ID: ${ret}`);
        callback(ret);
        };
        const getInfoById = async (id, callback) => {
        let ret;
        await new Promise((resolve, _) =>
            setTimeout(() => {
            ret = INFO[id];
            resolve();
            }, 1000)
        );
        console.log(
            `GET INFO BY ID, ID: ${id} -> INFO: ${JSON.stringify(ret, null, 2)}`
        );
        callback(ret);
        };

        const printInfo = (info) => console.log("FINALLY, INFO: ", info);


        getIdByName(NAME, (id) => getInfoById(id, printInfo));

- 결과

        GET ID BY NAME, NAME: Invidam -> ID: 123
        GET INFO BY ID, ID: 123 -> INFO: {
        "age": 23,
        "hobby": [
            "game",
            "study",
            "movie"
        ]
        }
        FINALLY, INFO:  { age: 23, hobby: [ 'game', 'study', 'movie' ] }

- 정상적으로 원하는 결과가 출력되었다.
- 변경사항

  - getIdByName , getInfoById 두 함수의 인자가 콜백을 포함한 2개가 되었다.
  - `return ret`이 사라지고 `callback(ret)`으로 변경되었다.
  - `getIdByName(NAME, (id) => getInfoById(id, printInfo));` 으로 실행하는 코드가 변경되었다.

- 실행과정
  1. `getIdByName` 가 비동기 함수이므로 태스크 큐에 들어간다.
  2. 콜스택이 비었으므로 `getIdByName` 이 콜스택에 들어가며 실행된다.
  3. name에 해당하는 id가 결정되며 이를 인자로 가지는 콜백함수인 `getInfoById` 를 실행한다.
  4. 호출된 `getInfoById` 가 비동기 함수이므로 태스크 큐에 들어간다.
  5. 콜스택이 비었으므로 `getInfoById` 가 콜스택에 들어가며 실행된다.
  6. id에 해당하는 info가 결정되며 이를 인자로 가지는 콜백함수 `printInfo` 를 실행한다.
  7. 원하는 결과가 출력된다.

## 프로미스를 이용한 해결

- 예제

        const NAME = "Invidam",
        ID = { Invidam: 123 },
        INFO = { 123: { age: 23, hobby: ["game", "study", "movie"] } };
        const promiseGetIdByName =  (name) => {
        return new Promise(async (resolve, reject) => {
            let ret;
            await new Promise((resolve, _) =>
            setTimeout(() => {
                ret = ID[name];
                resolve(ret);
            }, 1000)
            );
            console.log(`GET ID BY NAME, NAME: ${name} -> ID: ${ret}`);
            resolve(ret);
        });
        };
        const promiseGetInfoById =  (id) => {
        return new Promise(async (resolve, reject) => {
            let ret;
            await new Promise((resolve, _) =>
            setTimeout(() => {
                ret = INFO[id];
                resolve();
            }, 1000)
            );
            console.log(
            `GET INFO BY ID, ID: ${id} -> INFO: ${JSON.stringify(ret, null, 2)}`
            );
            console.log(JSON.stringify(id));
            resolve(ret);
        });
        };

        const printInfo = (info) => console.log("FINALLY, INFO: ", info);
        promiseGetIdByName(NAME)
        .then((name) => promiseGetInfoById(name))
        .then((info) => printInfo(info))
        .catch((err) => console.err(err));

- 결과값은 콜백 예제와 동일하다.
- 변경사항

  - getIdByName , getInfoById 두 함수가 프로미스 함수로 변경되었다.
  - `return ret`이 사라지고 `resolve(ret)`으로 변경되었다.
  - `promiseGetIdByName(NAME).then((name) => promiseGetInfoById(name)) .then((info) => printInfo(info)) .catch((err) => console.err(err))` 으로 실행하는 코드가 변경되었다.

- 실행과정
  1. `promiseGetIdByName` 가 실행된다.
  2. `promiseGetIdByName`가 `resolve(ret)` 이 실행되며 종료된다.
  3. `promiseGetIdByName`의 프로미스 상태변화를 감지한 `then()` 의 callback인 `promiseGetInfoById` 가 호출되며 인자로 ret{id}을 전달받는다.
  4. id 해당하는 info가 결정되며 `resolve(ret)` 으로 info가 전달된다.
  5. info를 인자로 가지는 콜백함수 `printInfo` 를 실행한다.
  6. 원하는 결과가 출력된다.
