/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
require('normalize.css');
require('./index.css');
const WXHead = require('./head/wx/index');
const ServePage = React.createClass({
  render:function(){
    return (
      <div className="serve_page">
        Hello Serve Page
      </div>
    )
  }
});
module.exports = ServePage;
