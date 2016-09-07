/**
 * Created by Administrator on 2016/9/6.
 */
const React = require('react');
require('./index.css');
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
            <img src={attachment.location+'@414w'} className="img_auto"/>
            <div className={each.content?"topic_item_content":"topic_item_content hidden"}>
              {each.content}
            </div>
          </div>
        )
      }
      else if(attachment.extensionType==2){
        require('video.js/dist/video-js.min.css');
        content = (
          <div className="topic_item" key={index}>
            <div className="topic_item_video bg_box_16_9">
              <video className="video-js vjs-default-skin vjs-big-play-centered"  controls>
                <source src={attachment.location} type="video/mp4"></source>
              </video>
            </div>
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
