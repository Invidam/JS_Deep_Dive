const count1Sec = (text, callback = () => {}) => {
  return setTimeout(() => {
    console.log(text);

    callback();
  }, 10000);
};
const countSeconds = (totalSecond, currSecond = 0) => {
  const getNextSecond = () => currSecond + 1;
  const makeSecondInfo = () => `(${currSecond}/${totalSecond})`;
  count1Sec(
    makeSecondInfo(),
    currSecond !== 5
      ? () => countSeconds(totalSecond, 1 + currSecond)
      : () => {}
  );
};
// setTimeout()

// countSeconds(5);
// const id = count1Sec("Hi");
// console.log(id);
// clearTimeout(id);

let count = 0;
const timeId = setInterval(() => {
  console.log(count++);
  if (count === 5) clearInterval(timeId);
}, 1000);
