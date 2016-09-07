/**
 * Created by Administrator on 2016/8/22.
 */
const React = require('react');
require('./index.css');
const TabBarBox = React.createClass({
  changeServeDetail:function(){
    this.props.changeTab(0);
  },
  changeServeNotice:function(){
    this.props.changeTab(1);
  },
  changeServeJudge:function(){
    this.props.changeTab(2);
  },
  initTabBarItems:function(){
    const items = [];
    this.props.tabBarData.forEach(function(tabBar,index){
      let clickFunc = '';
      switch (index){
        case 0:
          clickFunc = this.changeServeDetail;
          break;
        case 1:
          clickFunc = this.changeServeNotice;
          break;
        case 2:
          clickFunc = this.changeServeJudge;
          break;
      }
      items.push(
        <div className={tabBar.active?'tab_bar_item active':'tab_bar_item'} key={index} onClick={clickFunc}>
          <span className="tab_bar_item_title">{tabBar.title}
            <span className="current_target"></span>
          </span>
        </div>
      );
    }.bind(this))
    return items;
  },
  render:function(){
    return (
      <div className="tab_bar_box">
        {this.initTabBarItems()}
      </div>
    )
  }
})
module.exports = TabBarBox;
