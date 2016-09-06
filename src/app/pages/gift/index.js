/**
 * Created by Administrator on 2016/8/31.
 */
const React = require('react');
require('./index.css');
const close = require('../../assets/close.png');
let giftBg = require('../../assets/gift_bg.png');
let openApp = require('../../assets/gift_open_app.png');
let invite = require('../../assets/gift_invite_friend.png');
const GiftLayer = React.createClass({
  closeLayer:function(){
    this.props.changeLayer();
  },
  showShareLayer:function(){
    /*这里需要通过JSBridge确认是否需要调用app分享方式*/
    if(this.props.jsBridge){
      this.props.showAppShare();
    }
    else{
      this.props.changeLayer(3);
    }
  },
  showAppOpen:function(){
    if(this.props.jsBridge){
      this.props.showAppOpen();
    }
    else{
      window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.cmbb.smartkids";
    }
  },
  render:function(){
    return (
      <div className={this.props.isShow?"layer_part gift_layer animated fadeIn":"layer_part gift_layer hidden"}>
        <img src={close} className='img_auto_height img_close animated bounceInDown'onClick={this.closeLayer}/>
        <img src={giftBg} className="img_auto_height img_gift_bg animated bounceIn"/>
        <img src={openApp} className="img_auto_height img_open_app" onClick={this.showAppOpen}/>
        <img src={invite} className="img_auto_height img_gift_invite" onClick={this.showShareLayer}/>
      </div>
    )
  }
});
module.exports = GiftLayer;
