/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
const Swipe = require('swiper');
const Util = require('../../../common/util/index');
let cacheTime = 0;
require('swiper/dist/css/swiper.min.css');
require('./index.css');
const SwipeHead = React.createClass({
  getInitialState:function(){
    return {
      i : 0,
    }
  },
  initTopImages:function(){
    const topImages = this.props.topImages;
    const items = [];
    if(topImages.length>0){
      topImages.forEach(function(topImage,index){
        items.push(
          <div className="swiper-slide" key={index}>
            <img src={topImage.location + '@414w'} className="img_auto"/>
          </div>
        );
      })
    }
    return items;
  },
  initSwipe:function(){
    if(!this.swiper && this.props.topImages.length>0){
      const swipeName = '.'+this.props.swipeName.split(' ')[0];
      const swipeOptions = {};
      if(this.props.topImages.length>1){
        swipeOptions.loop = true;
        swipeOptions.autoplay = 1500;
        swipeOptions.pagination = '.swiper-pagination';
      }
      swipeOptions.autoplayDisableOnInteraction = false;
      swipeOptions.observer = true;
      swipeOptions.observeParents = true;
      this.swiper = new Swipe(swipeName,swipeOptions);
    }
  },
  componentDidUpdate:function(){
    this.initSwipe();
    this.checkStatusTime();
  },
  checkStatusTime:function(){
    const statusTime = this.props.statusTime;
    const currentSystemDate = statusTime.currentSystemDate;
    const discountEndTime = statusTime.discountEndTime;
    const discount = this.props.discount;
    const discountType = discount.discountType;
    if(discountType&&currentSystemDate&&discountEndTime){
      const startTime = Util.parseTime(currentSystemDate).getTime();
      const endTime = Util.parseTime(discountEndTime).getTime();
      if(endTime - startTime>0){
        cacheTime = endTime - startTime
      }
    }
  },
  render:function(){
    return (
      <div className={this.props.topImages.length>0?'swiper-container '+this.props.swipeName:'swiper-container hidden '+this.props.swipeName}>
        <div className="swiper-wrapper">
          {this.initTopImages()}
        </div>
        <div className="swiper-pagination"></div>
        {/*<div className={this.checkStatusTime()>0?'status_box':'status_box hidden'}>
         距离{this.props.data.typeText}结束还有{this.state.timeText}
        </div>*/}
      </div>
    )
  }
});
module.exports = SwipeHead;
