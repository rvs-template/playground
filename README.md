# 前端面试试题准备

- [x] Promise 的实现方式
- [x] ajax 的实现
- [ ] throttle 的作用和实现方式
- [ ] vue 实现双向绑定的原理
- [X] 跨域常见的几种方法
- [ ] 实现一个简单的路由库
- [ ] 常见的字符正则
- [ ] http2
- [ ] https 的 TLS 协议 加解密方式
- [ ] 一个请求的从敲击回车键的时候 背后发生了什么
- [ ] 实现一下 redux
- [ ] 组件库的实现
- [ ] 谈谈 SSR 的实现原理， 登录态的实现方案
- [ ] 如何在平时使用单元测试的 jest 测试 vue 框架
- [ ] 常见的数据结构和算法
- [ ] XSS 攻击以及 跨站伪造请求的防御
- [ ] nodejs 相关的一些后端知识
- [ ] 如何实现一个简单的脚手架
- [X] CSS 3 的一些新属性， 如何做到兼容处理
- [X] webpack 打包原理， 异步模块加载 （CMD AMD）
- [ ] hot-reload的实现
- [ ] restful 与 graphql

## 垂直水平居中（三种实现方式＋flex布局）

```css
{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: (-50%, -50%)
}

{
  width: 200px;
  height: 200px;
  margin-left: -100px;
  margin-top: -100px;
}

{
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### box-sizing这个特性了解吗？说一下content-box和border-box的区别，什么时候需要用border-box?

```js
content-box border-box 是盒子模型
border-box 的计算方式是


两种宽高计算方式
border-box  显示宽高(样式宽高) = content +  padding-top + padding-bottom + border-top-width + border-bottom-width
content-box 显示宽高 = content + padding-top + padding-bottom + border-top-width + border-bottom-width

```

### 知道css3新特性中动画是怎么实现的吗？有在项目中用过吗？

使用 animation 做一个简单的 loading

### js有哪些数据类型？基础数据类型有哪些？浅拷贝和深拷贝的区别？数组怎么实现深拷贝？

```js
Number String Null Undefined Bool Object 5 + 1
基本数据类型存放在栈中 heap stack

function shallowCopy(src) {
  var dest = {}
  for (var key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key]
    }
  }
  return dest
}

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

function extend(target, src, deep) {
  return target
}

```

### 1. 对于你项目中的解决跨域问题，具体你项目怎么实现的。知道哪些跨域方案

JSONP CROS

### js继承有哪些？寄生组合继承有什么优点？知道es6里面继承是怎么实现的吗，为什么要用class？你还知道es6的哪些新特性？

- let const 如何实现 const let
- Promise 的实现原理
- Array.from
- Symbol
- 结构赋值
- class
- async
- Proxy
- module
- Decrate
- ...reset
- 箭头函数

### 如果 a.js 和 b.js 需要同时运行，而 b.js 依赖于 a.js 的结果，你要怎么做？（个人感觉是考异步调用，但是后面又问了CMD，AMD??）

### http和https了解吗？http的状态码？304和200用在什么情况下？

```
http 1.0
http 1.1

https 原理

ssl

tcp 三次握手

200
304
401
405
302
301

500
404
403
```

### 什么是MVC？有用过什么框架吗？(angular,vue, react的优缺点, 还答了angular脏数据检查)

Model Controller View

vue watch get set

react state

### 同学面试 二维码扫描登陆的原理，websocket用来干嘛，实现原理，（与轮询，长连接的比较）

jsonp

websocket 协议

ws://

### 输入一个网址到显示，详细讲一下中间过程（重点在前端），前端优化问题

```js
  dns 解析域名
  C/S tcp 三次握手
  负载均衡 nginx 反向代理
  流浪器页面渲染
  - js 引擎
  - gui 渲染
  - 事件触发
  - 定时器
  - 异步 http 请求

  渲染过程
  - DOM 解析
  - CSS 解析 RENDER
  - ui 层绘制
  一个站点能同时并发 6个资源 （多域名）
  link dns-prefetch
  预渲染 或者 服务端渲染
  减少 文件大小 压缩
  多域名并发请求文件
```

### add(1)(2)的实现，add(1)(2)(3)［柯里化问题］还考了arguments类数组的知识点

```js
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

```

### node.js的 event loop，为什么说它是高并发，IO非阻塞

```js
event-loop
js 是单线程 一次只能做一件事
在输入的同时可以发请求， IO 所以说非阻塞（同步和 alert 是阻塞的）

task (macroTask) setInterval  setImedete setTimeOut XHR, IO
microTask Promise process.nextTick

优先级

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

```

### vue.js了解吗，angular 和 vue 的区别，你觉得你更喜欢哪一种,为什么？

angular 也是双向绑定
更喜欢 vue 简单，模板语法

### 谈一下你目前觉得最好的项目，你做了哪些事情

1. 实现了一个 ui 组件库
2. 通过这个项目，了解到项目的前期架构的重要性 自动化 发布到 npm 如何支持 babel-plugin-import
3. 还有简单的 webpack-loader 插件 以及使用 babel + vue-template-compiler 处理单文件为 render 函数 支持不同的 打包工具
4. 如何从组件层面对 SSR 进行支持
5. 通过 gh-pages 生成静态资源目录
6. jest 快照测试

实现过程遇到的困难

1. ... 在 babel 配置 不方便，最后是应为没有 babel-cli
2. 最开始是使用 vue-cli 生成项目结构，没有自动化，都是手动添加，后来看了 vant 的方法 通过指令去获取没个目录文件名
3. 使用vue-cli 生成 vue-template 文件的时候
4. 实现一个 doc 骨架
5. 实现组件的一些功能

### 你的闪光点，你觉得我为什么要hire你？

### 自己实现过动画吗？项目中有吗，手写一个动画实现圆形进度条

### 前端优化有哪些？

预渲染 + SSR

vue prerender 使用五合流浪器跑页面
SSR 服务端预取数据，渲染

### 调试技巧

1. simulator + chrome://devtools
2. nodejs  ndb 调试
3. charles 抓包

### Flexible 的原理

根据 dpr 10rem = 750px
rem px em 的区别

### Router 实现

```js
function Router() {
  this.routes = {};
  this.currentUrl = '';
}

Router.prototype.route = function (path, callback) {
  this.routes[path] = callback || function () {};
};

Router.prototype.refresh = function () {
  console.log('触发一次 hashchange，hash 值为', location.hash);
  this.currentUrl = location.hash.slice(1) || '/';
  this.routes[this.currentUrl]();
};


window.Router = new Router();


var content = document.querySelector('body');
// change Page anything
function changeBgColor(color) {
  content.style.backgroundColor = color;
}
Router.route('/', function () {
  changeBgColor('white');
});
Router.route('/blue', function () {
  changeBgColor('blue');
});
Router.route('/green', function () {
  changeBgColor('green');
});


```