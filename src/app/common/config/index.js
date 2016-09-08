/**
 * Created by Administrator on 2016/8/24.
 */
const Config = require('../../../common/config/index');

Config.debug = false;

Config.bgImages = [
  require('../../assets/section_part_1.jpg')
]
Config.textImages = []
Config.phoneImages = [
  require('../../assets/mpb_app_model.png')
]
Config.qrCode = require('../../assets/mbp_qr_code.png');
Config.sectionParts = [
  {bgImage: Config.bgImages[0],textImage:'',phoneImage:Config.phoneImages[0],qrCode:Config.qrCode}
]



Config.logoLink = "http://www.baidu.com";
Config.logoImage = require('../../assets/mbp_logo_head.png');
Config.logoParts = {
  logoLink : Config.logoLink,
  logoImage: Config.logoImage
}



module.exports = Config;
