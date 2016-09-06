/**
 * Created by Administrator on 2016/9/6.
 */
const React = require('react');
require('./index.css');
let defaultHead = require('../../assets/head_default.png');
const Divide = require('../divide/index');
const ReplyBox = React.createClass({
  initRelyData:function(){
    const replys = [];

    this.props.replyList.forEach(function(reply,index){
      const item = (
        <div className="reply_item" key={index}>
          <div className="reply_item_user_head">
            <img src={reply.user.userSmallImg?reply.user.userSmallImg+'@30w':defaultHead} className="img_auto"/>
          </div>
          <div className="reply_item_body">
            <div className="reply_item_user_nick">
              {reply.user.userNike}
              <div className="reply_item_spot">
                <span className="mbp mbp_zan"></span>
                {reply.spotsNum}
              </div>
            </div>
            <div className="reply_item_create_date">
              {reply.createDate.substring(reply.createDate.indexOf('-')+1,reply.createDate.lastIndexOf(':'))}
            </div>
            <div className="reply_item_content">
              {reply.contents}
            </div>
          </div>
        </div>
      );

      replys.push(item)
    }.bind(this))

    return replys;
  },
  render:function(){
    return (
      <div className={this.props.replyList.length>0?"reply_box":"reply_box hidden"}>
        <Divide styleJSON={this.props.styleJSON}/>
        <div className="reply_box_title">
          评论
        </div>
        <div className="reply_group">
          {this.initRelyData()}
        </div>
      </div>
    )
  }
});
module.exports = ReplyBox;
