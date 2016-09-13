/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
const Swipe = require('swiper');
const Util = require('../../../common/util/index');
let cacheTime = 0;
let cacheFlag = true;
require('swiper/dist/css/swiper.min.css');
require('./index.css');
const SwipeHead = React.createClass({
  getInitialState:function(){
    return {
      cacheTime : 0,
      timeText:''
    }
  },
  initTopImages:function(){
    const topImages = this.props.topImages;
    const items = [];
    if(topImages.length>0){
      topImages.forEach(function(topImage,index){
        items.push(
          <div className="swiper-slide " key={index}>
            <img data-src={topImage.location + '@414w'} className="img_inherit swiper-lazy"/>
            <div className="swiper-lazy-preloader"></div>
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
      swipeOptions.lazyLoading = true;
      swipeOptions.observeParents = true;
      this.swiper = new Swipe(swipeName,swipeOptions);
    }
  },
  componentDidUpdate:function(){
    this.initSwipe();

  },
  checkStatusTime:function(){
    const statusTime = this.props.statusTime;
    const currentSystemDate = statusTime.currentSystemDate;
    const discountEndTime = statusTime.discountEndTime;
    const discount = this.props.discount;
    const discountType = discount.discountType;
    if(discountType&&currentSystemDate&&discountEndTime){
      if(cacheFlag){
        const startTime = Util.parseTime(currentSystemDate).getTime();
        const endTime = Util.parseTime(discountEndTime).getTime();
        if(endTime - startTime>0){
          cacheTime = endTime - startTime
          cacheFlag = false;
        }
      }
      if(cacheTime>0){
        setTimeout(this.calcTime,1000)
      }
    }
  },
  calcTime:function(){
    if(Math.floor(cacheTime/1000)<=0){
      return;
    }
    cacheTime = cacheTime - 1000;
    let days = Math.floor(cacheTime/1000/60/60/24);
    let hour = Math.floor(cacheTime/1000/60/60 - days * 24);
    let minutes = Math.floor(cacheTime/1000/60 - days * 24 * 60 - hour * 60);
    let seconds = Math.floor(cacheTime/1000 - days * 24 * 60 * 60 - hour * 60 * 60 - minutes * 60);
    let dayText = days?days+"天":'';
    let hourText = dayText?((hour+'').length>1?hour+"时":'0'+hour+'时'):(hour?((hour+'').length>1?hour+"时":'0'+hour+'时'):'');
    let minuteText = hourText?((minutes+'').length>1?minutes+"分":'0'+minutes+'分'):(minutes?((minutes+'').length>1?minutes+"分":'0'+minutes+'分'):'');
    let secondText = minuteText?((seconds+'').length>1?seconds+"秒":'0'+seconds+'秒'):(seconds?((seconds+'').length>1?seconds+"秒":'0'+seconds+'秒'):'');
    this.setState({cacheTime:cacheTime,timeText:dayText+hourText+minuteText+secondText})
  },
  render:function(){
    return (
      <div className={this.props.topImages.length>0?'swiper-container '+this.props.swipeName:'swiper-container hidden '+this.props.swipeName}>
        <div className="swiper-wrapper">
          {this.initTopImages()}
        </div>
        <div className="swiper-pagination"></div>
        {this.checkStatusTime()}
        <div className={this.state.cacheTime>0?'status_box':'status_box hidden'}>
          距离{this.props.discount.discountTypeText}结束还有{this.state.timeText}
        </div>
      </div>
    )
  }
});
module.exports = SwipeHead;
