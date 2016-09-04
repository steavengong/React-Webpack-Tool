/**
 * Created by Administrator on 2016/9/2.
 */
/**
 * Created by lenovo on 2016/8/21.
 */
const React = require('react');
const Divide = require('../divide/index');
require('./index.css');
const TitlePriceBox = React.createClass({
  getInitialState:function(){
    return {
      styleJSON:{
        borderBottom: '1px dashed #DDDDDD',
        padding:'0px',
      }
    }
  },
  render:function(){
    return (
      <div className="title_price_box">
        <div className="title_box">
          {this.props.title}
        </div>
        <Divide styleJSON={this.state.styleJSON}></Divide>
        <div className="price_box">
          <span className={this.props.discountType?"price_type":"price_type hidden"}>{this.props.discountTypeText}价</span>
          <span className="current_price">
            {this.props.price.currentPrice?this.props.price.currentPrice + this.props.price.priceDesc:"免费"}
           </span>
          <span className={this.props.price.originalPrice?"original_price":"original_price hidden"}>{this.props.price.originalPrice}</span>
          <span className="peoples_buy_number">
            {this.props.price.buyPeoplesNumber}人购买
           </span>
        </div>
      </div>
    )
  }
});
module.exports = TitlePriceBox;
