# 前端面试试题准备

- [x] Promise 的实现方式
- [x] ajax 的实现
- [ ] throttle 的作用和实现方式
- [ ] let const 的实现方式
- [ ] eslint fix 原理
- [ ] vue 实现双向绑定的原理
- [ ] 跨域常见的几种方法
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
- [ ] CSS 3 的一些新属性， 如何做到兼容处理
- [ ] webpack 打包原理， 异步模块加载
- [ ] hot-reload的实现
- [ ] restful 与 graphql

1. 垂直水平居中（三种实现方式＋flex布局）

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

1. box-sizing这个特性了解吗？说一下content-box和border-box的区别，什么时候需要用border-box?

content-box border-box 是盒子模型
border-box 的计算方式是

两种宽高计算方式
border-box  显示宽高(样式宽高) = content +  padding-top + padding-bottom + border-top-width + border-bottom-width
content-box 显示宽高 = content + padding-top + padding-bottom + border-top-width + border-bottom-width

1. 知道css3新特性中动画是怎么实现的吗？有在项目中用过吗？

使用 animation 做一个简单的 loading

1. js有哪些数据类型？基础数据类型有哪些？浅拷贝和深拷贝的区别？数组怎么实现深拷贝？

Number String Null Undefined Bool Object 5 + 1
基本数据类型存放在栈中

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

1. 对于你项目中的解决跨域问题，具体你项目怎么实现的。知道哪些跨域方案

JSONP CROS

1. js继承有哪些？寄生组合继承有什么优点？知道es6里面继承是怎么实现的吗，为什么要用class？你还知道es6的哪些新特性？

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
- ... reset
- 箭头函数
1. 
2. 如果 a.js 和 b.js 需要同时运行，而 b.js 依赖于 a.js 的结果，你要怎么做？（个人感觉是考异步调用，但是后面又问了CMD，AMD??）

3. http和https了解吗？http的状态码？304和200用在什么情况下？

http 1.0 http 1.1

https 原理

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

4. 什么是MVC？有用过什么框架吗？(angular,vue, react的优缺点, 还答了angular脏数据检查)

angular1 ng 脏值检测

vue watch get set

react state

5. 同学面试 二维码扫描登陆的原理，websocket用来干嘛，实现原理，（与轮询，长连接的比较）

jsonp

websocket

6. 输入一个网址到显示，详细讲一下中间过程（重点在前端），前端优化问题

  dns

7. add(1)(2)的实现，add(1)(2)(3)［柯里化问题］还考了arguments类数组的知识点

8. node.js的 event loop，为什么说它是高并发，IO非阻塞

9. vue.js了解吗，angular 和 vue 的区别，你觉得你更喜欢哪一种,为什么？

10. 谈一下你目前觉得最好的项目，你做了哪些事情

11. 评价一下你的简历，你觉得简历上符合前端的经历有哪些？

12. 你选择工作时候，城市和公司你怎么考虑的？有面过什么公司吗？

13. 你的闪光点，你觉得我为什么要hire你？

14. 自己实现过动画吗？项目中有吗，手写一个动画实现圆形进度条

15. 前端优化有哪些？
