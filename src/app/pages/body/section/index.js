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
            我是主题
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
