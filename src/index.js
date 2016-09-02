/**
 * Created by Administrator on 2016/9/1.
 */
const React = require('react');
const ReactDom = require('react-dom');
const App = require('./router/index');

ReactDom.render(
  <App></App>,
  document.getElementById('app')
)
