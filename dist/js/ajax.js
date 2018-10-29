function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function serialize(data) {
  let parts = [];
  if (typeof data === 'object') {
    for(let item in data) {
      let part = encodeURIComponent(item) + '=' + encodeURIComponent(data[item])
      parts.push(part)
    }
  }
  return parts.join('&');
}

function noop () {}
/**
 * simple Ajax encapsulation
 * @param {*} options 
 * options.method
 * options.url
 * options.data
 * options.success
 * options.fail
 */
function Ajax(options = {}) {
  const defaultOptions = {
    method: 'POST',
    success: noop,
    fail: noop
  };
  
  opts = Object.assign({}, defaultOptions, options);
  if (typeof XMLHttpRequest === undefined) {
    console.error('unsupport XMLHttpRequest')
  }

  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      let res = getBody(xhr);
      opts.success(res);
    } else {
      opts.fail(xhr);
    }
  }
  if (opts.method.toUpperCase() === 'POST') {
    xhr.open('POST', opts.url, true);
    xhr.send(serialize(opts.data))
  } else if (opts.method.toUpperCase() === 'GET'){
    xhr.open('GET', opts.url, true);
    xhr.send(null)
  }
}
