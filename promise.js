import { promises } from "fs";

const PENDING = Symbol('PENDING');
const FULFILLED = Symbol('FULFILLED');
const REJECT = Symbol('REJECT');


function notify(handler, state, result) {
  let { onFulfilled, onReject, resolve, reject } = handler;
  try {
    if (state == FULFILLED) {
      resolve(onFulfilled(result))
    } else if (state == REJECT) {
      reject(onReject(result))
    }
  } catch (error) {
    reject(error)
  }
}

function notifyAll(promise) {
  let { handles, state, result } = promise;
  while(handles.length) {
    notify(handles.shift(), state, result)
  }
}

function transition(promise, state, result) {
  if (promise.state !== PENDING) return;
  promise.state = state;
  promise.result = result; 
}


function PromiseA (f) {
  this.state = PENDING;
  this.handles = [];
  let onFulfilled = result => transition(this, FULFILLED, result)
  let onReject = reason => transition(this, REJECT, reason)

  let resolve = (value) => {
    onFulfilled(value)
  }

  let reject = (error) => {
    onReject(error)
  }
  try {
    f(resolve, reject)
  } catch (error) {
    reject(error)
  }
}


PromiseA.prototype.then = function (onFulfilled, onReject) {
  return new PromiseA((resolve, reject) => {
    this.handles.push({ onFulfilled, onReject, resolve, reject })
    this.state !== PENDING && notifyAll(this);
  })
}

PromiseA.prototype.catch = function(onReject) {
  return this.then(null, onReject)
}

PromiseA.resolve = value => new PromiseA((resolve) => resolve(value))

PromiseA.reject = reason => new PromiseA((_, reject) => reject(reason))


PromiseA.race = (promise = []) => {
  return new PromiseA((resolve, reject) => {
    promises.forEach((promise, i) => {
      resolve(promise)
    })
  })
}


PromiseA.all = (promise = []) => {
  return new PromiseA((resolve, reject) => {
    let count = 0;
    let values = new Array(promise.length);
    let collectValue = index => value => {
      values[index] = value;
      count += 1;
      count == values.length && resolve(values)
    } 
    promise.forEach((promise, i) => {
      collectValue(i)(promise)
    })
  })
}

