require('normalize.css');
require('../styles/base.css')
require('./index.css');
const React = require('react');
const Request = require('../common/request/index');
const Config = require('../common/config/index');
const Util = require('../common/util/index');
const WXHead = require('./head/wx/index');
const WXFoot = require('./foot/wx/index');
const Divide = require('./divide/index');
const UserHeadBox = require('./head/user/index');
const TopicBodyBox = require('./body/topic/index');
//120 图文  117 视频
const IndexPage = React.createClass({
  getInitialState:function(){
    return {
      styleJSON:{
        height:'10px',
        backgroundColor:'#C8C8C8'
      },
      userInfo:{
        userNick:'',
        userPresentation:'',
        userSmallImg:''
      },
      topicBodyData:{
        title:'',
        contents:'',
        categorys:[],
        imgTxtList:[],
        createDate:''
      }
    }

  },
  setWXSign:function(shareObject){
    if(Util.isWX()){
      Request.cmd = Config.cmds.wxJSSign;
      Request.parameters = {
        'url':window.location.href.split('#')[0]
      }
      const wxOptions = {
        url:Config.getRequestWXAction(),
        data:Request,
        appId:Config.getAppId(),
        debug:false,
        wxReady:function(){
          Util.shareItems(shareObject)
        }
      }
      Util.setJSSign(wxOptions);
    }
  },
  initTopicData:function(){
    Request.cmd = Config.cmds.topicDetail;
    Request.parameters = {
      'id':this.props.params.id
    }

    const options = {
      url:Config.getRequestAction(),
      data:Request,
      success:function(result){
        const response = result.response;
        if(response){
          const data = response.data.objectData;
          console.log(data)
          const state = {
            userInfo:{
              userNick:data.user.userNike,
              userPresentation:data.user.userPresentation,
              userSmallImg:data.user.userSmallImg
            },
            topicBodyData:{
              title:data.title,
              contents:data.contents,
              categorys:data.categorys,
              imgTxtList:data.imgTxtList,
              createDate:data.createDate
            }
          }
          console.log(state);
          this.setState(state);

          /*const shareObject = {
           title:title,
           desc:data.introduce,
           link:Config.shareObject.link + "#/"+this.props.params.id,
           imgUrl:topImages[0].location + "@414w"
           }

           this.setWXSign(shareObject)*/
        }
      }.bind(this)
    }
    Util.getResponseFromJSON(options);
  },
  componentDidMount:function(){
    this.initTopicData();
  },
  render:function(){
    return (
      <div className="topic_page">
        <WXHead/>
        <UserHeadBox userInfo={this.state.userInfo}/>
        <Divide styleJSON={this.state.styleJSON}/>
        <TopicBodyBox topicBodyData={this.state.topicBodyData}/>
        <WXFoot/>
      </div>
    )
  }
})

module.exports = IndexPage;
