// const NAME = "Invidam",
//   ID = { Invidam: 123 },
//   INFO = { 123: { age: 23, hobby: ["game", "study", "movie"] } };
// const getIdByName = async (name, callback) => {
//   let ret;
//   await new Promise((resolve, _) =>
//     setTimeout(() => {
//       ret = ID[name];
//       resolve();
//     }, 1000)
//   );
//   console.log(`GET ID BY NAME, NAME: ${name} -> ID: ${ret}`);
//   callback(ret);
// };
// const getInfoById = async (id, callback) => {
//   let ret;
//   await new Promise((resolve, _) =>
//     setTimeout(() => {
//       ret = INFO[id];
//       resolve();
//     }, 1000)
//   );
//   console.log(
//     `GET INFO BY ID, ID: ${id} -> INFO: ${JSON.stringify(ret, null, 2)}`
//   );
//   callback(ret);
// };

// const printInfo = (info) => console.log("FINALLY, INFO: ", info);

// getIdByName(NAME, (id) => getInfoById(id, printInfo));

// const NAME = "Invidam",
//   ID = { Invidam: 123 },
//   INFO = { 123: { age: 23, hobby: ["game", "study", "movie"] } };
// const getIdByName = async (name) => {
//   let ret;
//   await new Promise((resolve, _) =>
//     setTimeout(() => {
//       ret = ID[name];
//       resolve(ret);
//     }, 1000)
//   );
//   console.log(`GET ID BY NAME, NAME: ${name} -> ID: ${ret}`);
//   return ret;
// };
// const getInfoById = async (id) => {
//   let ret;
//   await new Promise((resolve, _) =>
//     setTimeout(() => {
//       ret = INFO[id];
//       resolve();
//     }, 1000)
//   );
//   console.log(
//     `GET INFO BY ID, ID: ${id} -> INFO: ${JSON.stringify(ret, null, 2)}`
//   );
//   console.log(JSON.stringify(id));
//   return ret;
// };

// const printInfo = (info) => console.log("FINALLY, INFO: ", info);
// printInfo(getInfoById(getIdByName(NAME)));

// const NAME = "Invidam",
//   ID = { Invidam: 123 },
//   INFO = { 123: { age: 23, hobby: ["game", "study", "movie"] } };
// const promiseGetIdByName = (name) => {
//   return new Promise(async (resolve, reject) => {
//     let ret;
//     await new Promise((resolve, _) =>
//       setTimeout(() => {
//         ret = ID[name];
//         resolve(ret);
//       }, 1000)
//     );
//     console.log(`GET ID BY NAME, NAME: ${name} -> ID: ${ret}`);
//     resolve(ret);
//   });
// };
// const promiseGetInfoById = (id) => {
//   return new Promise(async (resolve, reject) => {
//     let ret;
//     await new Promise((resolve, _) =>
//       setTimeout(() => {
//         ret = INFO[id];
//         resolve();
//       }, 1000)
//     );
//     console.log(
//       `GET INFO BY ID, ID: ${id} -> INFO: ${JSON.stringify(ret, null, 2)}`
//     );
//     console.log(JSON.stringify(id));
//     resolve(ret);
//   });
// };

// const printInfo = (info) => console.log("FINALLY, INFO: ", info);
// promiseGetIdByName(NAME)
//   .then((name) => promiseGetInfoById(name))
//   .then((info) => printInfo(info))
//   .catch((err) => console.err(err));

const takeSeconds = async (seconds) => {
  return await new Promise((resolve) =>
    setTimeout(() => {
      console.log("SPEND TIME: ", seconds);
      resolve(seconds);
    }, seconds * 1000)
  );
};
const promiseAll = () => {};

promiseAll();
Promise.all([takeSeconds(1), takeSeconds(3), takeSeconds(5)]).then(console.log);
