var curry = function(fn) {
  var args = [].slice.call(arguments, 1);
  console.log(args, '==>')
  return function () {
    var _args = args.concat([].slice.call(arguments));
    return fn.apply(null, _args);
  }
}

var sum = curry(function() {
  var args = [].slice.call(arguments);
  console.log(args, '>>')

  return args.reduce(function(a, b) {
    return a + b;
  })
})

console.log(sum(10, 20))


console.log(1)

setTimeout(() => {
    console.log(2)
    new Promise(resolve => {
        console.log(4)
        resolve()
    }).then(() => {
        console.log(5)
    })
})

new Promise(resolve => {
    console.log(7)
    resolve()
}).then(() => {
    console.log(8)
})

setTimeout(() => {
    console.log(9)
    new Promise(resolve => {
        console.log(11)
        resolve()
    }).then(() => {
        console.log(12)
    })
})