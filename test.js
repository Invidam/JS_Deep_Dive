const camel = "testStringObject";
const snake = "test_string_object";

const camelToSnake = (str) =>
  str.replace(/[A-Z]/g, (match) => "_" + match.toLowerCase());
const snakeToCamel = (str) =>
  str.replace(/_[a-z]/g, (match) => match[1].toUpperCase());
console.log(camel, camelToSnake(camel), snake);
console.log(snake, snakeToCamel(snake), camel);
