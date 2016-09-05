/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
require('normalize.css');
require('../styles/base.css');
require('./index.css');
const Util = require('../common/util/index');
const Request = require('../common/request/index');
const Config = require('../common/config/index');
const WXHead = require('./head/wx/index');
const WXFoot = require('./foot/wx/index');
const ServePage = React.createClass({
  getInitialState:function(){
    return {
      data:{}
    }
  },
  initServeData:function(){
    Request.cmd = Config.cmds.serveDetail;
    Request.parameters = {
      'id':this.props.params.id
    }

    const options = {
      url:Config.getRequestAction(),
      data:Request,
      success:function(result){
        const response = result.response;
        if(response){
          const data = response.data.objectData;
          const topImages = data.topImages&&data.topImages.length>0?data.topImages:[];
          const currentSystemDate = data.currentSystemDate;
          const discountEndTime = data.discountEndTime;
          const discountType = data.discountType;
          const discountTypeText = data.discountTypeText;
          const currentPrice = data.currentPrice;
          const originalPrice = data.originalPrice;
          const priceDesc = data.priceDesc;
          const buyPeoplesNumber = data.realityPeoples;
          const title = data.title;
          const serviceRowDescs = data.serviceRowDescs;
          const serviceDetails = data.serviceDetails;
          const notice = data.notice;
          const publicUser = {
            userSmallImg:data.publicUser.userSmallImg,
            userNick:data.publicUser.userNike,
          }
          console.log(data);

          const state = {
            topImages:topImages,
            statusTime:{
              currentSystemDate:currentSystemDate,
              discountEndTime:discountEndTime
            },
            discount:{
              discountType:discountType,
              discountTypeText:discountTypeText
            },
            title:title,
            price:{
              currentPrice:currentPrice,
              originalPrice:originalPrice,
              priceDesc:priceDesc,
              buyPeoplesNumber:buyPeoplesNumber
            },
            serviceRowDescs:serviceRowDescs,
            serviceDetails:serviceDetails,
            notice:notice,
            publicUser:publicUser
          }
          console.log(state);
          this.setState(state);


          const shareObject = {
            title:title,
            desc:data.introduce,
            link:Config.shareObject.link + "#/"+this.props.params.id,
            imgUrl:topImages[0].location + "@414w"
          }

          this.setWXSign(shareObject)
        }
      }.bind(this)
    }
    Util.getResponseFromJSON(options);
  },
  setWXSign:function(shareObject){
    if(Util.isWX()){
      Request.cmd = Config.cmds.wxJSSign;
      Request.parameters = {
        'url':window.location.href.split('#')[0]
      }
      const wxOptions = {
        url:Config.getRequestWXAction(),
        data:Request,
        appId:Config.getAppId(),
        debug:false,
        wxReady:function(){
          Util.shareItems(shareObject)
        }
      }
      Util.setJSSign(wxOptions);
    }
  },
  componentDidMount:function(){
    this.initServeData();
  },
  render:function(){
    return (
      <div className="serve_page">
        <WXHead/>
        <WXFoot/>
      </div>
    )
  }
});
module.exports = ServePage;
