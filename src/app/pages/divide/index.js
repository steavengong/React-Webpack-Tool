/**
 * Created by Administrator on 2016/9/2.
 */
/*分割线*/
const React = require('react');
const Util = require('../../common/util/index');
require('./index.css');
const Divide = React.createClass({
  getInitialState:function(){
    return {
      styleJSON:{
        backgroundColor:'transparent',
        width:'inherit',
        height:'0px'
      }
    }
  },
  componentDidMount:function(){
    const styleJSON = Util.mergeJSONData(this.props.styleJSON||{},this.state.styleJSON)
    this.setState({styleJSON:styleJSON});
  },
  render:function(){
    return (
      <div className="divide_box" style={this.state.styleJSON} >
      </div>
    )
  }
})
module.exports = Divide;
