const React = require("React");
const ReplyItem = require("./replyItem");

const replyList = React.createClass({
  render:function(){
    const replyLists = this.props.data;
    var listComps=replyLists.map(function(rep){
        return <ReplyItem key={rep.id}
        backgroundImg={rep.user.backgroundImg}
        userNike={rep.user.userNike}
        spotsNum={rep.spotsNum}
        contents={rep.contents}
        times={rep.createDate}>
        </ReplyItem>
    }.bind(this));

    return(
      <div className="replyList-main">
        <div className="replyList-row replyList-bottom">
          <span>评论</span>
        </div>
        {listComps}
      </div>
    )
  }
})

module.exports = replyList;
