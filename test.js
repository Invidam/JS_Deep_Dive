const obj = {
  name: "Invidam",
  age: 23,
  hobby: ["movie", "game"],
};

// console.log(JSON.stringify(obj));
// console.log(JSON.stringify(obj, ["name"], 2));\
let idx = 0;
function replacer(key, value) {
  console.log(
    idx++,
    "args",
    JSON.stringify(arguments),
    "\nK",
    key,
    typeof key,
    "\nV",
    value,
    typeof value
  );
  if (key === "") return value;
  return typeof value === "string" ? value : undefined;
}
console.log(JSON.stringify(obj, replacer, 2));
