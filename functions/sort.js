function findDependencies(obj, allObjects, result, visited) {
  if (visited.has(obj[0].className)) {
      return;
  }
  visited.add(obj[0].className);

  if (obj[0].paramArray) {
      obj[0].paramArray.forEach(param => {
          const dependency = allObjects.find(o => o[0].className === param.paramType);
          if (dependency) {
              findDependencies(dependency, allObjects, result, visited);
          }
      });
  }

  result.push(obj);
}

function sortObjects(objects) {
  let result = [];
  let visited = new Set();

  objects.filter(obj => obj[0].paramArray === null).forEach(obj => {
      if (!visited.has(obj[0].className)) {
          result.push(obj);
          visited.add(obj[0].className);
      }
  });

  objects.filter(obj => obj[0].paramArray !== null).forEach(obj => {
      findDependencies(obj, objects, result, visited);
  });

  return result;
}

module.exports = sortObjects
