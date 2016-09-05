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
const SwipeHead = require('./head/swipe/index');
const WXFoot = require('./foot/wx/index');
const Divide = require('./divide/index');
const TitlePriceBox = require('./title&price/index');
const TimeAddressBox = require('./time&address/index');
const UserHeadBox = require('./head/user/index');
const TabBarBox = require('./tabbar/index');
const ServePage = React.createClass({
  getInitialState:function(){
    return {
      styleJSON:{
        height:'10px',
        backgroundColor:'#C8C8C8'
      },
      tabBarData: [
        {title:'服务详情',active:true},{title:'服务须知',active:false},{title:'妈妈点评',active:false}
      ],
      topImages:[],
      statusTime:{
        currentSystemDate:'',
        discountEndTime:''
      },
      discount:{
        discountType:0,
        discountTypeText:''
      },
      title:'',
      price:{
        currentPrice:0,
        originalPrice:0,
        priceDesc:'',
        buyPeoplesNumber:0
      },
      serviceRowDescs:[],
      publicUser:{
        userSmallImg:'',
        userNike:''
      },
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
            publicUser:publicUser
          }
          console.log(state);
          this.setState(state);
        }
      }.bind(this)
    }
    Util.getResponseFromJSON(options);
  },
  changeTab:function(index){
    const dataObjects = [];
    this.state.tabBarData.forEach(function(dataObject,dataIndex){
      dataObject.active = false;
      if(dataIndex==index){
        dataObject.active = true;
      }
      dataObjects.push(dataObject);
    });
    this.setState({tabBarData:dataObjects});
  },
  componentDidMount:function(){
    this.initServeData();
  },
  render:function(){
    return (
      <div className="serve_page">
        <WXHead/>
        <SwipeHead topImages={this.state.topImages}
                   discount={this.state.discount}
                   statusTime={this.state.statusTime}
                   swipeName={'serve_swipe bg_box_4_3'}/>
        <TitlePriceBox discount={this.state.discount}
                       title={this.state.title}
                       price={this.state.price}/>
        <Divide styleJSON={this.state.styleJSON}/>
        <TimeAddressBox serviceRowDescs={this.state.serviceRowDescs}/>
        <Divide styleJSON={this.state.styleJSON}/>
        <UserHeadBox publicUser={this.state.publicUser}/>
        <Divide styleJSON={this.state.styleJSON}/>
        <TabBarBox tabBarData={this.state.tabBarData}
                changeTab={this.changeTab}/>
        <WXFoot/>
      </div>
    )
  }
});
module.exports = ServePage;
