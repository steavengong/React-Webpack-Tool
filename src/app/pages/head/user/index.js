/**
 * Created by Administrator on 2016/9/5.
 */
const React = require('react');
require('./index.css');
let defaultHead = require('../../../assets/head_default.png');
const UserHeadBox = React.createClass({
  checkUserImage:function(publicUser){
    let userImage = '';
    let imageSrc = '';
    if(publicUser){
      if(publicUser.userSmallImg){
        imageSrc = publicUser.userSmallImg;
      }
      userImage = <img src={imageSrc?Util.compressImageFromWeb(imageSrc,'@30w'):defaultHead} className="img_auto"/>
    }
    return userImage;
  },
  checkUserName:function(publicUser){
    let userName = '';
    if(publicUser){
      userName = <span className='user_name'>{publicUser.userNike}</span>
    }
    return userName;
  },
  render:function(){
    return (
      <div className="user_head_box">
        <div className="user_image_box">
          <img src={this.props.publicUser.userSmallImg||defaultHead} className="img_auto"/>
        </div>
        <div className="user_name_box">
          <span className='user_name'>{this.props.publicUser.userNick}</span>活动发起人
        </div>
      </div>
    )
  }
});
module.exports = UserHeadBox;
