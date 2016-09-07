/**
 * Created by Administrator on 2016/9/1.
 */
const React = require('react');
const ReactDom = require('react-dom');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const hashHistory = require('react-router').hashHistory;
const HomePage = require('./app/pages/index');

const router = (
  <Route path="/" component={HomePage}>
  </Route>
)

ReactDom.render(
  <Router history={hashHistory}>
    {router}
  </Router>,
  document.getElementById('app')
)
