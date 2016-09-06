/**
 * Created by Administrator on 2016/9/6.
 */
const React = require('react');
require('./index.css');
const Divide = require('../divide/index');
const ServerRecommendBox = React.createClass({
  initServerRecommendData:function(){
    const servers = [];
    this.props.serviceList.forEach(function(server,index){
      const item = (
        <div className="server_recommend_item" key={index}>
          <div className="server_recommend_item_image">
            <img src={server.topImages[0].location+'@200w'} className="img_auto"/>
          </div>
          <div className="server_recommend_item_title">
            {server.title}
          </div>
        </div>
      )
      servers.push(item)

    }.bind(this))
    return servers;
  },
  render:function(){
    return (
      <div className={this.props.serviceList.length>0?"server_recommend_box":"server_recommend_box hidden"}>
        <Divide styleJSON={this.props.styleJSON}/>
        <div className="server_recommend_box_title">
          推荐服务
        </div>
        <div className="server_recommend_group_body">
          <div className="server_recommend_group"  style={{width:this.props.serviceList.length*210+10+'px'}}>
            {this.initServerRecommendData()}
          </div>
        </div>
      </div>
    )
  }
});
module.exports = ServerRecommendBox;
