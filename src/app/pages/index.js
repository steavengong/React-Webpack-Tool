/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
require('normalize.css');
require('../styles/base.css');
require('./index.css');
const IndexPage = React.createClass({
  getInitialState:function(){
    return {
      data:null
    }
  },
  render:function(){
    return (
      <div className="home_page">
      </div>
    )
  }
});
module.exports = IndexPage;
