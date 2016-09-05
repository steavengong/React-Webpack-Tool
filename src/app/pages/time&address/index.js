/**
 * Created by Administrator on 2016/9/4.
 */
const React = require('react');
require('./index.css');
const TimeAddressBox = React.createClass({
  initData:function(){
    const serviceRowDescs = [];
    this.props.serviceRowDescs.forEach(function(serviceRowDesc,index){
      serviceRowDescs.push(
        <div className="item_box" key={index}>
          <div className="icon_box">
            <img src={serviceRowDesc.iconUrl} className="img_auto"/>
          </div>
          <div className="item_text">
            {serviceRowDesc.centerContent}
          </div>
        </div>
      )
    })
    return serviceRowDescs;
  },
  render:function(){
    return (
      <div className="time_address_box">
        {this.initData()}
      </div>
    )
  }
});
module.exports = TimeAddressBox;
