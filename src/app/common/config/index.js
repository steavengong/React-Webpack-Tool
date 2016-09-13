/**
 * Created by Administrator on 2016/8/24.
 */
const Config = require('../../../common/config/index');

Config.debug = false;
let shareImage = require('../../assets/logo.png');

Config.requestAction = 'http://mengbaopai.smart-kids.com:84/smart-rest/cgi';
Config.requestActionDebug = 'http://erpuat.mengbp.com:8090/wine-rest/cgi';

Config.requestWXAction = 'http://weixin.mengbp.com/wine-weixin-rest/cgi';
Config.requestWXActionDebug = 'http://erpuat.mengbp.com:8090/wine-weixin-rest/cgi';

Config.appId = 'wx5bb398c959489ae4';
Config.appIdDebug = 'wx03fc01e909d9a654';

Config.cmds = {
  serveDetail:'smart/services/getServicesDetails',
  serviceEvaluate:'smart/serviceEvaluate/getPage',
  wxJSSign:'christ/weixin/setSign',
}

Config.shareObject = {
    title:"萌宝派",
    desc:"萌宝派",
    link:window.location.href.split("#")[0].split("?")[0],
    imgUrl:shareImage,
}

module.exports = Config;
