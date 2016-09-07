/**
 * Created by Administrator on 2016/9/7.
 */
const React = require('react');
import {Grid,Row,Col} from 'react-bootstrap';
require('./index.css');
let logo = require('../../../assets/mbp_logo_head.png');
const LogoHead = React.createClass({
  render:function(){
    return (
      <Grid className="bg_dark">
        <Row>
          <Col lg={2} md={3} sm={4} xs={6}>
            <Row>
              <Col lg={8} md={6} sm={6} xs={10} className="logo_head_image">
                <img src={logo} className="img_auto"/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    )
  }
})
module.exports = LogoHead;
