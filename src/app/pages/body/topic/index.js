/**
 * Created by Administrator on 2016/9/6.
 */
const React = require('react');
require('./index.css');
require('video.js/dist/video.min');
require('video.js/dist/video-js.min.css');
const TopicBodyBox = React.createClass({
  initCategories:function(){
    const categories = [];
    this.props.topicBodyData.categorys.forEach(function(category,index){
      categories.push(<span key={index}>#{category.categoryText}</span>)
    })
    return categories;
  },
  initTopicMain:function(){
    const contents = [];
    this.props.topicBodyData.imgTxtList.forEach(function(each,index){
      let content = '';
      const attachment = each.attachments[0];
      if(attachment.extensionType==0){
        content = (
          <div className="topic_item" key={index}>
            <video class="video-js vjs-default-skin" controls
                   preload="auto" width="640" height="264" poster="really-cool-video-poster.jpg"
                   data-setup='{}'>
              <source src="really-cool-video.mp4" type="video/mp4"/>
              <source src="really-cool-video.webm" type="video/webm"/>
              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a web browser
                that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
              </p>
            </video>
            <img src={attachment.location+'@414w'} className="img_auto"/>
            <div className={each.content?"topic_item_content":"topic_item_content hidden"}>
              {each.content}
            </div>
          </div>
        )
      }
      else if(attachment.extensionType==2){
        content = (
          <div className="topic_item" key={index}>

            <div className={each.content?"topic_item_content":"topic_item_content hidden"}>
              {each.content}
            </div>
          </div>
        )
      }
      contents.push(content);
    }.bind(this))
    return contents;
  },
  onClickPlay:function(){
    this.refs.VideoComp0.play();
  },
  render:function(){
    return (
      <div className="topic_body_box">
        <div className="topic_title">{this.props.topicBodyData.title}</div>
        <div className="topic_category">
          {this.initCategories()}<span>{this.props.topicBodyData.createDate.split(' ')[0]}</span>
        </div>
        <div className={this.props.topicBodyData.contents?"topic_content":"topic_content hidden"}>{this.props.topicBodyData.contents}</div>
        {this.initTopicMain()}
      </div>
    )
  }
})
module.exports = TopicBodyBox;
