var obj1 = {
  'name' : 'zhangsan',
  'age' :  '18',
  'language' : [1,[2,3],[4,5]],
};

var obj2 = extend({}, obj1, true)

function deepCopy(src) {
  var dest = {}
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key]
    }
  }
  return dest
}

function isPlainObj(obj) {
  return typeof obj === 'object'
}

function extend(target, src, deep) {
  for (var key in src) {
    if (src[key]) {
      // 
    }
  }
  return target
}

