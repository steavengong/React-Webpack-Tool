/**
 * Created by Administrator on 2016/9/1.
 */
const React = require('react');
const ReactDom = require('react-dom');
const App = require('./app/pages/index');

var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?256d9ce857de599398c83beebbd4113d";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

ReactDom.render(
  <App></App>,
  document.getElementById('app')
)
