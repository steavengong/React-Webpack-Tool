/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
require('bootstrap/dist/css/bootstrap.min.css');
require('../styles/base.css');
require('./index.css');
const LogoHead = require('./head/logo/index');
const AppBody = require('./body/app/index');
const IndexPage = React.createClass({
  render:function(){
    return (
      <div className="home_page">
        <LogoHead/>
        <AppBody/>
      </div>
    )
  }
});
module.exports = IndexPage;
