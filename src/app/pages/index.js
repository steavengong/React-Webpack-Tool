require('!style!css!./index.css');

const React = require('react');
const Request = require('../common/request/index');
const Config = require('../common/config/index');
const Util = require('../common/util/index');

const WXHead = require('./head/wx/index');
const WXFoot = require('./foot/wx/index');
/*
const UserInfo = require('./components/userInfo');
const RewardList = require('./components/rewardList');
const SpotList = require('./components/spotList');
const ReplyList = require('./components/replyList');
const DetailItem = require('./components/detailItem');
*/

const detailPage = React.createClass({
  getInitialState:function(){
    return {
      data:null
    }
  },
  componentDidMount:function(){
    this.initDetail();
  },
  initDetail:function(){
    Request.cmd = Config.cmds.detailDetail;
    Request.parameters = {
        'id':this.props.params.id
    }

    const options = {
        url:Config.getRequestAction(),
        data:Request,
        success:function(result){
          this.setState({
            data:result.response.data
          });
        }.bind(this)
    }
    Util.getResponseFromJSON(options);
  },
  render:function(){
      var list = [];
      if(this.state.data!=null){
        list.push(<UserInfo data={this.state.data.objectData.user} key="userInfo"></UserInfo>)
        list.push(<DetailItem data={this.state.data} key="detailItem"></DetailItem>)
        if(this.state.data.businessData.rewardList!=null){
          list.push(<RewardList data={this.state.data.businessData.rewardList} key="rewardList"></RewardList>)
        }
        list.push(<SpotList data={this.state.data.businessData.spotList} key="spotList"></SpotList>)
        list.push(<ReplyList data={this.state.data.businessData.replyList} key="replyList"></ReplyList>)
      }
      return (
        <div className="main">
          <WXHead></WXHead>
          <WXFoot></WXFoot>
        </div>
      )
    }
})

module.exports = detailPage;
