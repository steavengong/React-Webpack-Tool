const React = require("React");
const DetailImgContext = require("./detailImgContext");
const Util = require('../../common/util/index');
const Request = require('../../common/request/index');
const Config = require('../../common/request/index');

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
    Request.cmd = Config.cmds.wxJSSign;
    Request.parameters = {
        'url':window.location.href.split('#')[0]
    }
    const shareObject = {
      title:details.objectData.title,
      desc:details.objectData.contents,
      imgUrl:img,
      link:window.location.href
      }
    const wxOptions = {
        url:Config.getRequestWXAction(),
        data:Request,
        appId:Config.getAppId(),
        debug:Config.debug,
        wxReady:function(){
          Util.shareItems(shareObject);
        }
    }
    Util.setJSSign(wxOptions);
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
