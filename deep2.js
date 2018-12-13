var obj1 = {
  'name' : 'zhangsan',
  'age' :  '18',
  'language' : {
    'sing': 'sss'
  },
  'arr': [1, [2, 3], [4, 5]]
};

var obj3 = shallowCopy(obj1);
obj3.age = 30;
obj3.language.sing = 'hello'
console.log(obj1)
console.log(obj3)
var obj2 = extend({}, obj1, true);
obj2.language.sing = 'deep';
obj2.arr[1] = 'night';
console.log(obj1)
console.log(obj2)
console.log(obj3)
function shallowCopy(src) {
  var dest = {}
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key]
    }
  }
  return dest
}

/**
 * 不是 window bom null 通过 new Object() Object.create()
 * @param {*} obj 
 */
function isPlainObj(obj) {
  if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") {
    return false;
  }
  var proto = Object.getPrototypeOf(obj);
  if (!proto) { return true }
  return typeof (Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor) == 'function'
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) == '[object Array]'
}
console.log(isPlainObj({}), isPlainObj({ 'a': 1 }), isArray([]))

function extend(target, src, deep) {
  for (var key in src) {
    if (deep && isPlainObj(src[key]) || isArray(src[key])) {
      if (isPlainObj(src[key]) && !isPlainObj(target[key])) target[key] = {}
      if (isArray(src[key]) && !isArray(target[key])) target[key] = []
      extend(target[key], src[key], deep)
    } else if (src[key] !== undefined) {
      target[key] = src[key]
    }
  }
  return target
}

