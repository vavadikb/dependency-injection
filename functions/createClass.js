
function createClassConstructor(classText, className, constructorArgs) {
  const DynamicClass = Function('return ' + classText)();

  if (!Array.isArray(constructorArgs)) {
      constructorArgs = [constructorArgs];
  }

  const instance = new DynamicClass(...constructorArgs);
  return instance;
}



module.exports = createClassConstructor
