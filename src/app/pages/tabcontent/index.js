/**
 * Created by Administrator on 2016/9/5.
 */
const React = require('react');
require('./index.css');
const Util = require('../../common/util/index');
const Request = require('../../common/request/index');
const Config = require('../../common/config/index');
let defaultHead = require('../../assets/head_default.png');
const TabContentBox = React.createClass({
  getInitialState:function(){
    return {
      judgeDatas:[]
    }
  },
  initTabContentItem:function(data,tabData,serveId){
    const tabContentItems = [];
    if(data){
      tabData.forEach(function(tab,index){
        tabContentItems.push(<TabContentItem key={index} tabData={tab} tabType={index} data={data} serveId={serveId}></TabContentItem>)
      })
    }
    return tabContentItems;
  },
  initTabContent:function(){
    const tabContents = [];
    this.props.tabBarData.forEach(function(tabBar,index){
      let tabContent = '';
      switch (index){
        case 0:
          tabContent = this.initServerDetail(tabBar,index);
          break;
        case 1:
          tabContent = this.initServerNotice(tabBar,index);
          break;
        case 2:
          tabContent = this.initServerJudge(tabBar,index);
          break;
      }
      tabContents.push(tabContent);
    }.bind(this))
    return tabContents;
  },
  initServerDetail:function(tabBar,index){
    return (
      <div className={tabBar.active?'tab_content_item':'tab_content_item hidden'} key={index}>
        <div className='serve_content'>
          {this.initServerContent()}
        </div>
      </div>
    )
  },
  initServerContent:function(){
      const contents = [];
      this.props.serviceDetails.forEach(function(detail,index){
        const content = (
          <div className="serve_content_item" key={index}>
            <div className="title">{detail.title}</div>
            <div className="content">{detail.content}</div>
            <div className="image_content">
              {this.initServerDetailImages(detail.attachments)}
            </div>
          </div>
        )
        contents.push(content);
      }.bind(this))
    return contents;
  },
  initServerDetailImages:function(images){
    const imageContents = [];
    images.forEach(function(image,index){
      imageContents.push(
        <img src={image.location+'@414w'} className="img_auto" key={index}/>
      )
    }.bind(this))
    return imageContents;
  },
  initServerNotice:function(tabBar,index){
    return (
      <div className={tabBar.active?'tab_content_item':'tab_content_item hidden'} key={index}>
        <div className='notice_content'>
          <div dangerouslySetInnerHTML = {{__html:this.props.notice}}></div>
        </div>
      </div>
    )
  },
  initServerJudge:function(tabBar,index){
    return (
      <div className={tabBar.active?'tab_content_item':'tab_content_item hidden'} key={index}>
        <div className='judge_content'>
          {this.initJudgeContent()}
        </div>
      </div>
    )
  },
  initJudgeContent:function(){
    let judgeContents = '';
    if(this.state.judgeDatas.length >0){
      judgeContents = [];
      this.state.judgeDatas.forEach(function(judge,index){
        const content = (
          <div className="judge_content_item" key={index}>
            <div className='user_image_box'>
              <img src=
                     {judge.evaluateUser.userSmallImg?
                     judge.evaluateUser.userSmallImg+'@414w':defaultHead}
                   className="img_auto"/>
            </div>
            <div className='judge_content_body'>
              <div className="user_name_box">
                <span className='user_name'>{judge.evaluateUser.userNike}</span>
                <span className='user_talent'></span>
                <span className='time'>{judge.evaluateDate.split(' ')[0]}</span>
              </div>
              <div className="judge_stars_box">
                打分{this.initJudgeStar(judge.evaluateType)}
              </div>
              <div className="judge_detail">
                {judge.evaluateContent}
              </div>
              {this.initJudgeImageGroup(judge.evaluateImages)}
            </div>
          </div>
        )
        judgeContents.push(content);
      }.bind(this))
    }
    else{
      judgeContents = (<div className="no_found_box"><span>没有找到数据</span></div>);
    }
    return judgeContents;
  },
  initJudgeStar:function(scores){
    const stars = [];
    for(var i = 1 ; i <= 5 ; i++){
      if(scores>=i){
        stars.push(<span className="mbp mbp_star_fill" key={i}></span>)
      }
      else{
        stars.push(<span className="mbp mbp_star" key={i}></span>)
      }
    }
    return stars;
  },
  initJudgeImageGroup:function(images){
    let imageGroup = '';
    if(images&&images.length>0){
      imageGroup = (
        <div className='judge_image_group'>
          {this.initJudgeImages(images)}
        </div>
      )
    }
    return imageGroup
  },
  initJudgeImages:function(images){
    const judgeImages = [];
    let judgeClassName = 'judge_image_item'
    switch (images.length){
      case 1:
        judgeClassName = judgeClassName + ' judge_image_item_1_1'
        break;
      case 2:
        judgeClassName = judgeClassName + ' judge_image_item_2_1'
        break;
      case 3:
        judgeClassName = judgeClassName + ' judge_image_item_3_1'
        break;
    }
    images.forEach(function(image,index){
      const style = {
        backgroundImage: 'url('+ Util.compressImageFromWeb(image.location,'@414w') +')',
        WebkitBackgroundImage: 'url('+ Util.compressImageFromWeb(image.location,'@414w') +')'
      }
      judgeImages.push(
        <div className={judgeClassName} key={index} style={style}></div>
      )
    })
    return judgeImages;
  },
  componentDidMount:function(){
    this.initJudgeData();
  },
  initJudgeData:function(){
    Request.cmd = Config.cmds.serviceEvaluate;
    Request.parameters = {
      "serviceId":this.props.serverId,
      "numberOfPerPage": 10,
      "pageNo": 0
    }
    const options = {
      url:Config.getRequestAction(),
      data:Request,
      success:function(result){
        console.log('judgeData',result);
        let judgeDatas = [];
        if(result.response && result.response.data.content){
          judgeDatas = result.response.data.content;
        }
        this.setState({judgeDatas:judgeDatas})
      }.bind(this)
    }
    Util.getResponseFromJSON(options);
  },
  render:function(){
    return (
      <div className='tab_content_box'>
        {this.initTabContent()}
      </div>
    )
  }
})
module.exports = TabContentBox;
