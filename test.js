function ExecutionContext(environmentRecord, outer) {
  this.environmentRecord = environmentRecord;
  this.outer = outer;

  this.findProperty = function findProperty(property) {
    const foundValue = this.environmentRecord[property];
    if (!foundValue && !this.outer) return null;
    return foundValue ? foundValue : this.outer.findProperty(property);
  };
}

const globalExecutionContext = new ExecutionContext({ x: 1 }, null);
const fooExecutionContext = new ExecutionContext(
  { y: 2 },
  globalExecutionContext
);
const barExecutionContext = new ExecutionContext({ z: 3 }, fooExecutionContext);

console.log(barExecutionContext.findProperty("x")); // 1
