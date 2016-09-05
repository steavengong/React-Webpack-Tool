/**
 * Created by Administrator on 2016/8/22.
 */
const React = require('react');
require('./index.css');
const TabBarItem = require('./item/index');
const TabBarBox = React.createClass({
    getInitialState:function(){
      return {
          data:[]
      }
    },
    changeTab:function(data,dataIndex){
        this.props.changeTab(data,dataIndex);
    },
    initTabBarItems:function(data){
        const items = [];
        if(data){
            data.forEach(function(dataObject,index){
                items.push(<TabBarItem data={dataObject} key={index} dataIndex={index} changeTab={this.changeTab}></TabBarItem>);
            }.bind(this))
        }
        return items;
    },
    componentDidMount:function(){
      this.setState({data:this.props.data});
    },
    render:function(){
        return (
            <div className="tab_bar_box">
                {this.initTabBarItems(this.state.data)}
            </div>
        )
    }
})
module.exports = TabBarBox;
