/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
let logo = require('../../../assets/logo.png');
const Util = require('../../../common/util/index');

const WXHead = React.createClass({
  downloadApp : function(){
    window.location.href = 'http://www.baidu.com';
  },
  render:function(){
    return (
      <div className={Util.isWX()?"wx_head":"wx_head hidden"}>
        <div className="wx_logo">
          <img src={logo} className="img_auto"/>
        </div>
        <div className="wx_head_body">
          <div className="wx_title">萌宝派，用心爱</div>
          <div className="wx_description">预定达人只送服务 上萌宝派APP</div>
        </div>
        <div className="wx_download">
          <a onClick={this.downloadApp}>下载APP</a>
        </div>
      </div>
    )
  }
});
module.exports = WXHead;
