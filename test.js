function getArgs() {
  console.log(arguments);
  const slice = Array.prototype.slice;
  console.log(slice);
  const arr = slice.call(arguments);
  console.log(arr, this);
  return arr;
}

console.log(getArgs(1, 2, 3));
