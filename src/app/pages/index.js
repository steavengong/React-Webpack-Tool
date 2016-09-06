require('normalize.css');
require('../styles/base.css')
require('./index.css');
const React = require('react');
const Request = require('../common/request/index');
const Config = require('../common/config/index');
const Util = require('../common/util/index');
const WXHead = require('./head/wx/index');
const WXFoot = require('./foot/wx/index');

const IndexPage = React.createClass({
  render:function(){
    return (
      <div></div>
    )
  }
})

module.exports = IndexPage;
