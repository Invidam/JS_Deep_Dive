const NAME = "Invidam",
  ID = { Invidam: 123 },
  INFO = { 123: { age: 23, hobby: ["game", "study", "movie"] } };

const findIdByNameInDB = (name) =>
  new Promise((resolve, _) =>
    setTimeout(() => {
      resolve(ID[name]);
    }, 1000)
  );

const findInfoByIdInDB = (id) =>
  new Promise((resolve, _) =>
    setTimeout(() => {
      resolve(INFO[id]);
    }, 1000)
  );
const getIdByName = async (name) => {
  let ret = await findIdByNameInDB(name);
  console.log(`GET ID BY NAME, NAME: ${name} -> ID: ${ret}`);
  return ret;
};
const getInfoById = async (id) => {
  let ret = await findInfoByIdInDB(id);
  console.log(
    `GET INFO BY ID, ID: ${id} -> INFO: ${JSON.stringify(ret, null, 2)}`
  );
  return ret;
};
