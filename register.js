function sortObjects(array) {
  let result = [];
  let map = new Map();

  let endObjects = [];
  array.forEach(item => {
      if (item[0].paramType === null) {
          endObjects.push(item);
      } else {
          map.set(item[0].className, item);
      }
  });

  let startObjects = array.filter(item => 
      item[0].paramType !== null && !array.some(other => other[0].paramType === item[0].className)
  );

  startObjects.forEach(startObject => {
      let current = startObject;
      while (current) {
          result.push(current);
          current = map.get(current[0].paramType);
      }
  });

  return result.concat(endObjects).reverse();
}


module.exports = sortObjects
