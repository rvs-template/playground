const isFunction = obj => typeof obj === 'function'
const toString = Object.prototype.toString
const isObject = obj => toString.call(obj) === '[object Object]'
const isThenable = obj => (isObject(obj) || isFunction(obj)) && 'then' in obj
const isPromise = promise => promise instanceof PromiseA

const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

const notify = (handler, state, result) => {
  let = { onFulfilled, onRejected, resolve, reject } = handler;
  try {
    if (state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
    } else if(state === REJECTED) {
      isFunction(onRejected) ? reject(onRejected(result)) : reject(result);
    }
  } catch (error) {
    reject(error)
  }
}

const notifyAll = (promise) => {
  let { handlers, state, result } = promise;
  console.log(promise,handlers, '==>')
  while(handlers.length) {
    notify(handlers.shift(), state, result)
  }
}


const transition = (promise, state, result) => {
  if (promise.state !== PENDING) return
  promise.state = state;
  promise.result = result;
  console.log(promise, '???')
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
  this.handles = [];
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
    this.handles.push({ onFulfilled, onRejected, resolve, reject })
    this.state !== PENDING && notifyAll(this)
  })
}

PromiseA.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}


PromiseA.resolve = value => new Promise(resolve => resolve(value))
PromiseA.reject = reason => new Promise((_, reject) => reject(reason))

PromiseA.all = (promises = []) => {
  return new PromiseA((resolve, reject) => {
    let count = 0;
    let values = new Array(promises.length)
    let collectValue = index => value => {
      values[index] = value;
      count += 1;
      count === promises.length && resolve(values);
    }

    promises.forEach((promise, i) => {
      if (isPromise(promise)) {
        promise.then(collectValue(i), reject)
      } else {
        collectValue(i)(promise)
      }
    })
  })
}

PromiseA.race = (promises = []) => {
  return new PromiseA((resolve, reject) => {
    promises.forEach(promise => {
      if (isPromise(promise)) {
        promise.then(resolve, reject)
      } else {
        resolve(promise)
      }
    })
  })
}