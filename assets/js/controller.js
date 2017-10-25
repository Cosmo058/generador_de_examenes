function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      objects = objects.concat(getObjects(obj[i], key, val));
    } else if (i === key && obj[key] === val) {
      objects.push(obj);
    }
  }
  return objects;
}

function getValuesOf(obj, key) {
  var values = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'object') {
      values = values.concat(getValuesOf(obj[i], key));
    } else if (i === key) {
      values.push(obj[i]);
    }
  }
  return values;
}

function getValuesOfArray(obj, key) {
  var values = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (typeof obj[i] === 'array') {
      values = values.concat(getValuesOf(obj[i], key));
    } else if (i === key) {
      values.push(obj[i]);
    }
  }
  return values;
}