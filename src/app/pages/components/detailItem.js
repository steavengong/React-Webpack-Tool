const React = require("React");
const DetailImgContext = require("./detailImgContext");
const UWX = require('../../../../../wx/index');
const CommonBean = require('../../../commonBean/index');
const Config = require('../../../config/index');

const detailItem=React.createClass({
  componentWillMount:function(){
    const details = this.props.data;
    const detailList = details.objectData.imgTxtList;
    var img = '';
    if(detailList!=null&&detailList.length>0){
      var attachments = detailList[0].attachments;
      if(attachments!=null&&attachments.length>0){
        img =  attachments[0].location;
      }
    }
    CommonBean.cmd = Config.cmds.wxJSSign;
    CommonBean.parameters = {
        'url':window.location.href.split('#')[0]
    }
    const wxOptions = {
        url:Config.getRequestWXAction(),
        data:CommonBean,
        appId:Config.getAppId(),
        debug:Config.debug,
        shareObject:{
            title:details.objectData.title,
            desc:details.objectData.contents,
            imgUrl:img,
            link:window.location.href
        }
    }
    UWX.setJSSign(wxOptions);
  },
  render:function(){
    const details = this.props.data;
    const detailList = details.objectData.imgTxtList;

    var listComps;
    if(detailList!=null&&detailList.length>0){
      var j=0;
      listComps = detailList.map(function(detail){
        ++j;
        return <DetailImgContext key={detail.businessId+""+j}
        content={detail.content}
        attachments={detail.attachments}></DetailImgContext>
      }.bind(this));
    }

    return(
      <div className="clearFloat" key="detail">
        <div className="detail-row detail-title">
          <span>{details.objectData.title}</span>
        </div>
        <div className="detail-row detail-content">
          <span>{details.objectData.contents}</span>
        </div>
        {listComps}
      </div>
    )
  }
})

module.exports = detailItem;
