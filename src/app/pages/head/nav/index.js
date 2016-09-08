/**
 * Created by Administrator on 2016/9/8.
 */
const React = require('react');
require('./index.css');
const NavHeadBox = React.createClass({
  render:function(){
    return (
      <div className="nav_head_box">
        <div className="container bg_dark">
          <div className="nav_bar">
            <div className="logo">
              <a>
                <img className="img_auto_width" src={this.props.logoParts.logoImage}/>
              </a>
            </div>

          </div>
        </div>
      </div>
    )
  }
})
module.exports = NavHeadBox;
