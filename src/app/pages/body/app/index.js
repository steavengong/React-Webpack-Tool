/**
 * Created by Administrator on 2016/9/7.
 */
const React = require('react');
import {Grid,Row,Col} from 'react-bootstrap'
let mainBg = require('../../../assets/mbp_main_bg.png');
let appModel = require('../../../assets/mpb_app_model.png');
let qrCode = require('../../../assets/mbp_qr_code.png');
require('./index.css');
const AppBody = React.createClass({
  render:function(){
    return (
      <Grid>
        <Row className="app_body_bg_row">
          <Col lg={12} md={12} sm={12} xs={12} className="app_body_bg_col">
            <img  src={mainBg} className="img_auto img_main_bg"/>
            <div className="main_bg_left"></div>
            <div className="main_bg_right"></div>
            <div className="main_bg_border"></div>
            <img src={appModel} className="img_app_model"/>
            <img src={qrCode} className="img_qr_code"/>
          </Col>
        </Row>
      </Grid>
    )
  }
})
module.exports = AppBody;
