/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
const Router = require('react-router').Router;
const Route = require('react-router').Route;
const hashHistory = require('react-router').hashHistory;
const ServePage = require('../app/pages/index');

const IndexRouter = React.createClass({
  render:function(){
    return (
      <Router history={hashHistory}>
        <Route path="/"></Route>
        <Route path="/:id" component={ServePage}></Route>
      </Router>
    )
  }
});
module.exports = IndexRouter;
