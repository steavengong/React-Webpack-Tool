/**
 * Created by Administrator on 2016/9/2.
 */
const React = require('react');
require('normalize.css');
require('../styles/base.css');
require('./index.css');
const NavHeadBox = require('./head/nav/index');
const Config = require('../common/config/index');
const SectionPartBox = require('./body/section/index');
const IndexPage = React.createClass({
  getInitialState:function(){
    return {
      logoParts:Config.logoParts,
      sectionParts:Config.sectionParts
    }
  },
  render:function(){
    return (
      <div className="home_page">
        <div className="home_page_top">
          <NavHeadBox logoParts={this.state.logoParts}/>
        </div>
        <div className="home_page_body">
          <SectionPartBox sectionParts={this.state.sectionParts}/>
        </div>
      </div>
    )
  }
});
module.exports = IndexPage;
