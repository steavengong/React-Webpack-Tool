/**
 * Created by Administrator on 2016/8/24.
 */
const Config = require('../../../common/config/index');

Config.debug = false;

Config.qrCode = require('../../assets/mbp_qr_code.png');
Config.sectionParts = [
  {
    bgImage: require('../../assets/section_part_1.jpg'),
    textImage:'',
    phoneImage:require('../../assets/mpb_app_model.png'),
    qrCode:Config.qrCode}
]

Config.logoParts = {
  logoLink : "http://www.mengbp.com/web/PC/Portal/HomePage/",
  logoImage: require('../../assets/mbp_logo_head.png')
}



module.exports = Config;
