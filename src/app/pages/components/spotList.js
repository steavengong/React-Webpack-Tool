const React = require("React");

const spotList = React.createClass({
  render:function(){
    var spotLists = this.props.data;
    var list=[];
    if(spotLists.length>0){
      for(var i=spotLists.length-1;i>=0;i--){
         list.push(<div className="spotList-headImg" key={i}>
            <img src={spotLists[i].userSmallImg} className="spotList-Img"/>
         </div>)
      }
    }

    return(
      <div className="spotList-main">
        <div className="spotList-name">
          <span>点赞的人</span>
        </div>
        <div className="spotList-head">
          {list}
        </div>
      </div>
    )
  }
})

module.exports = spotList;
