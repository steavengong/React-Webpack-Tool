/**
 * Created by Administrator on 2016/8/24.
 */
const Config = require('../../../common/config/index');

Config.debug = true;
let shareImage = require('../../assets/logo.png');

Config.requestAction = 'http://erpuat.mengbp.com:8090/wine-rest/cgi';
Config.requestActionDebug = 'http://erpuat.mengbp.com:8090/wine-rest/cgi';
//Config.requestLocalAction = 'http://192.168.100.164:8081/wine-weixin-rest/cgi';

Config.requestWXAction = 'http://erpuat.mengbp.com:8090/wine-weixin-rest/cgi';
Config.requestWXActionDebug = 'http://erpuat.mengbp.com:8090/wine-weixin-rest/cgi';
//Config.requestLocalWXAction = 'http://192.168.100.164:8081/wine-weixin-rest/cgi';

Config.appId = 'wx5bb398c959489ae4';
Config.appIdDebug = 'wx03fc01e909d9a654';

Config.cmds = {
  topicDetail:'smart/topic/detail',
  wxJSSign:'christ/weixin/setSign',
}

Config.shareObject = {
    title:"萌宝派",
    desc:"萌宝派",
    link:window.location.href.split("#")[0].split("?")[0],
    imgUrl:shareImage,
}

module.exports = Config;
