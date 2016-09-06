const React = require("React");

const rewardList = React.createClass({
  render:function(){
    const data = this.props.data;
    return(
      <div className="rewardList-main">
        <div >
          <div className="rewardList-button">
            <span className="rewardList-ds">打赏</span>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = rewardList;
