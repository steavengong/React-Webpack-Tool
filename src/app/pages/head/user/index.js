/**
 * Created by Administrator on 2016/9/5.
 */
const React = require('react');
require('./index.css');
let defaultHead = require('../../../assets/head_default.png');
const UserHeadBox = React.createClass({
  render:function(){
    return (
      <div className="user_head_box">
        <div className="user_image_box">
          <img src={this.props.publicUser.userSmallImg?this.props.publicUser.userSmallImg+'@30w':defaultHead} className="img_auto"/>
        </div>
        <div className="user_name_box">
          <span className='user_name'>{this.props.publicUser.userNick}</span>活动发起人
        </div>
      </div>
    )
  }
});
module.exports = UserHeadBox;
