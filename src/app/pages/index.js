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
const SpotBox = require('./spot/index');
const ServerRecommendBox = require('./service/index');
const ReplyBox = require('./reply/index');
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
        createDate:'',
        rewardList:[]
      },
      replyList:[],
      serviceList:[],
      spotList:[],
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
          console.log(response.data);
          const objectData = response.data.objectData;
          const businessData = response.data.businessData;
          const state = {
            userInfo:{
              userNick:objectData.user.userNike,
              userPresentation:objectData.user.userPresentation,
              userSmallImg:objectData.user.userSmallImg
            },
            topicBodyData:{
              title:objectData.title,
              contents:objectData.contents,
              categorys:objectData.categorys,
              imgTxtList:objectData.imgTxtList,
              createDate:objectData.createDate,
              rewardList:businessData.rewardList
            },
            replyList:businessData.replyList,
            serviceList:businessData.serviceList,
            spotList:businessData.spotList,
          }
          this.setState(state);

          const shareObject = {
            title:objectData.title,
            desc:objectData.title,
            link:Config.shareObject.link + "#/"+this.props.params.id,
            imgUrl:objectData.imgTxtList.length>0?(objectData.imgTxtList[0].attachments[0].extensionType==0?
            objectData.imgTxtList[0].attachments[0].location+'@50w':
            objectData.imgTxtList[0].attachments[0].location + Config.videoResize):Config.shareObject.imgUrl
          }

          this.setWXSign(shareObject)
        }
      }.bind(this)
    }
    Util.getResponseFromJSON(options);
  },
  componentDidMount:function(){
    this.initTopicData();
  },
  replaceContents:function(contents){
    let topicContentResult = '';
    if(contents){
      let topicContent = Util.replace(contents,Config.regs.json,"");
      const matches = topicContent.match(Config.regs.special)||[];
      let topicContentCache = '';
      matches.forEach(function(match){
        topicContentCache = topicContent.substring(0,topicContent.indexOf(match));
        topicContent = topicContent.substring(topicContent.indexOf(match)+match.length);
        topicContentResult = topicContentResult + topicContentCache + '<span class="span_special">'+ match+'</span>';
      })
      topicContentResult = topicContentResult + topicContent;
    }
    return <span dangerouslySetInnerHTML = {{__html:topicContentResult}}></span>;
  },
  render:function(){
    return (
      <div className="topic_page">
        <WXHead/>
        <UserHeadBox userInfo={this.state.userInfo}/>
        <Divide styleJSON={this.state.styleJSON}/>
        <TopicBodyBox topicBodyData={this.state.topicBodyData}
                      replaceContents = {this.replaceContents}/>
        <SpotBox styleJSON={this.state.styleJSON}
                 spotList={this.state.spotList}/>
        <ServerRecommendBox styleJSON={this.state.styleJSON}
                            serviceList={this.state.serviceList}/>
        <ReplyBox styleJSON={this.state.styleJSON}
                  replyList={this.state.replyList}
                  replaceContents = {this.replaceContents}/>
        <WXFoot/>
      </div>
    )
  }
})

module.exports = IndexPage;
