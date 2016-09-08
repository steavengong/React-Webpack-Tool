/**
 * Created by Administrator on 2016/9/8.
 */
const React = require('react');
require('./index.css');
const SectionPartBox = React.createClass({
  initSectionPart:function(){
    const sectionParts = [];
    this.props.sectionParts.forEach(function(sectionPart,index){
      const part = (
        <div className="section_part_item" key={index}>
          <div className="container">
            <div className="section_part_item_body">
                <div className="section_part_item_bg_image">
                  <img src={sectionPart.bgImage} className="img_auto_height"/>
                </div>
                <div className="section_part_item_inner_border"></div>
                <div className="section_part_item_phone">
                  <img src={sectionPart.phoneImage} className="img_absolute img_auto_height"/>
                </div>
                <div className="section_part_item_qr_code">
                  <img src={sectionPart.qrCode} className="img_absolute img_auto_height"/>
                </div>
            </div>
          </div>
        </div>
      )

      sectionParts.push(part)

    }.bind(this))
    return sectionParts;
  },
  render:function(){
    return (
      <div className="section_part_box">
        {this.initSectionPart()}
      </div>
    )
  }
});
module.exports = SectionPartBox;
