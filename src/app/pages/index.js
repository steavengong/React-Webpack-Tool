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
const ServePage = React.createClass({
  getInitialState:function(){
    return {
      topImages:[],
      statusTime:{
        currentSystemDate:'',
        discountEndTime:''
      },
      discount:{
        discountType:0,
        discountTypeText:''
      }
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
            }
          }
          console.log(state);
          this.setState(state);
        }
      }.bind(this)
    }
    Util.getResponseFromJSON(options);
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
        <WXFoot/>
      </div>
    )
  }
});
module.exports = ServePage;
