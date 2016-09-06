/**
 * Created by Administrator on 2016/9/6.
 */
const React = require('react');
let defaultHead = require('../../assets/head_default.png');
require('./index.css');
const Divide = require('../divide/index');
const SpotBox = React.createClass({
  initSpotImages:function(){
    const images = [];
    this.props.spotList.forEach(function(spot,index){
      images.push(<img src={spot.userSmallImg?spot.userSmallImg+'@30w':defaultHead} key={index}/>)
    })
    return images;
  },
  render:function(){
    return (
      <div className={this.props.spotList.length>0?"spot_box":"spot_box hidden"}>
        <Divide styleJSON={this.props.styleJSON}/>
        <div className="spot_group">
          <div className="spot_title">
            <span className="mbp mbp_zan"></span>
            点赞的人
          </div>
          <div className="spot_images">
            {this.initSpotImages()}
          </div>
        </div>
      </div>
    )
  }
});
module.exports = SpotBox;
