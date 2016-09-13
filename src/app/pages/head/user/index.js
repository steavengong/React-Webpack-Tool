/**
 * Created by Administrator on 2016/9/6.
 */
const React = require('react');
require('./index.css');
let defaultHead = require('../../../assets/head_default.png');
const UserHeadBox = React.createClass({
  render:function(){
    return (
      <div className="user_head_box">
        <div className="user_image_box">
          <img src={this.props.userInfo.userSmallImg?this.props.userInfo.userSmallImg+'@45w':defaultHead} className="img_inherit"/>
        </div>
        <div className="user_info_box">
          <div className="user_name">{this.props.userInfo.userNick||' '}</div>
          <div className="user_presentation">{this.props.userInfo.userPresentation||'这人很懒，什么都没留下...'}</div>
        </div>
      </div>
    )
  }
});

module.exports = UserHeadBox;
