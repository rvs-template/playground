const isFunction = obj => typeof obj === 'function'
const toString = Object.prototype.toString
const isObject = obj => toString.call(obj) === '[object Object]'
const isThenable = obj => (isObject(obj) || isFunction(obj)) && 'then' in obj
const isPromise = promise => promise instanceof Promise

const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')


const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return
  promise.state = state;
  promise.result = result;
}

const checkValue = (promise, value, onFulfilled, onRejected) => {
  if (value === promise) {
    let reason = new TypeError('Can not fulfill promise with itself')
    onRejected(reason)
  }
  if (value instanceof PromiseA) {
    return value.then(onFulfilled, onRejected)
  }

  if (isThenable(value)) {
    return onRejected(value)
  }
  onFulfilled(value);
}

function PromiseA(f) {
  this.state = PENDING

	let onFulfilled = value => transition(this, FULFILLED, value)
  let onRejected = reason => transition(this, REJECTED, reason)

  let resolve = value => {
    checkValue(this, value, onFulfilled, onRejected)
  }

  let reject = reason => {
    onRejected(reason)
  }

  try {
    f(resolve, reject)
  } catch (error) {
    reject(error)
  }
}


PromiseA.prototype.then = function(onFulfilled, onRejected) {
  return new PromiseA((resolve, reject) => {

  })
}

PromiseA.prototype.catch = function() {

}


Promise.resolve = value => new Promise(resolve => resolve(value))
Promise.reject = reason => new Promise((_, reject) => reject(reason))

PromiseA.all = (promises = []) => {

}

PromiseA.race = (promises = []) => {

}