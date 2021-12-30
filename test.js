const set1 = new Set([1, 2, 3, 5]);
const set2 = new Set([2, 3, 4, 6]);
const subSet1 = new Set([1, 2]);
Set.prototype[Symbol.for("intersection")] = function (set) {
  return new Set([...this].filter((value) => set.has(value)));
};

console.log(set1[Symbol.for("intersection")](set2)); //Set(2) { 2, 3 }

Set.prototype[Symbol.for("union")] = function (set) {
  return new Set([...this, ...set].sort());
};

console.log(set1[Symbol.for("union")](set2)); //Set(6) { 1, 2, 3, 4, 5, 6 }

Set.prototype[Symbol.for("difference")] = function (set) {
  return new Set([...this].filter((value) => !set.has(value)));
};

console.log(set1[Symbol.for("difference")](set2)); //Set(2) { 1, 5 }
Set.prototype[Symbol.for("isSuperSet")] = function (subset) {
  return [...subset].every((value) => this.has(value));
};

console.log(set1[Symbol.for("isSuperSet")](subSet1)); //Set(2) { 1, 5 }
