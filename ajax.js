function serilized(obj) {
  let data = [];
  if (typeof obj === 'object') {
    for (let key in obj) {
      data.push(`key=${obj[key]}`)
    }
    return data.join('&')
  } else {
    new Error('入参必须是一个对象')
  }
}

function getResponseBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) return text
  try {
    return JSON.parse(text);
  } catch (error) {
    return text
  }
}

function Ajax(options = {}) {
  const defaultOptions = {
    url: '',
    methods: 'POST',
    data: {},
    success: (res) => { return res },
    fail: (err) => { new Error(err)}
  }
  options = Object.assign({}, defaultOptions, options);
  if (typeof XMLHttpRequest !== 'object') {
    new Error('can not support XHR');
  }
  const xhr = new XMLHttpRequest();

  xhr.onload = function() {
    if (xhr.status >= 200 && this.xhr.status <= 304) {
      let res = getResponseBody(xhr);
      options.success(res);
    } else {
      options.fail(xhr)
    }
  }

  let method = options.method.toUpperToCase();

  if (method == 'POST') {
    xhr.open('POST', url);
    xhr.send(serilized(options.data));
  } else if (method == 'GET') {
    xhr.open('GET', url);
    xhr.send(null);
  }
}




