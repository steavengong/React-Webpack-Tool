/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
const Util = require('../../../common/util/index');
let att = require('../../../assets/attentions.jpg');
require('./index.css');
const WXFoot = React.createClass({
  render:function(){
    return (
      <div className={Util.isWX()?"wx_foot":"wx_foot hidden"}>
        <img src={att} className="img_auto"/>
      </div>
    )
  }
});
module.exports = WXFoot;
