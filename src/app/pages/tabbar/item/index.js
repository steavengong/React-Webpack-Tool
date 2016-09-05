/**
 * Created by Administrator on 2016/8/22.
 */
const React = require('react');
const TabBarItem = React.createClass({
    changeTab:function(){
        this.props.changeTab(this.props.data,this.props.dataIndex);
    },
    render:function(){
        return (
            <div className={this.props.data.active?'tab_bar_item active':'tab_bar_item'} onClick={this.changeTab}>
                <span>{this.props.data.title}</span>
            </div>
        )
    }
});
module.exports = TabBarItem;