/**
 * Created by Administrator on 2016/8/29.
 */
const React = require('react');
require('./index.css');
let magazine = require('../../assets/rule_magazine.png');
let pillow = require('../../assets/rule_pillow.png');
let bag = require('../../assets/rule_bag.png');
let barrier = require('../../assets/barrier.png');
let sawasdee = require('../../assets/sawasdee.png');
let down = require('../../assets/down.png');
let start = require('../../assets/start.png');
const RulePart = React.createClass({
  changePart:function(){
    this.props.changePart(2);
  },
  render:function(){
    return (
      <div className={this.props.isShow?'page_part rule_part':'page_part rule_part hidden'}>
        <div className="rule_title color_blue">活动详情</div>
        <div className="rule_content color_blue">
          中秋星宝贝，全家总动员<br/>
          萌宝派小模特线下狂欢<br/>
        </div>
        <div className="rule_body">
          <div className="rule_body_part color_blue">
            中秋追月节，全家总动员，今年的中秋佳节你准备带着宝宝上哪玩呢？<br/>
            9月15、16日，萌宝派与优衣库邀你线上线下狂欢一起嗨！<br/>
            模特宝宝见面会、绘画涂鸦创意秀、益智亲子玩乐区……<br/>
            现场拍摄封面大片，竞选品牌明星小模特，更有机会登上《聪明宝宝》杂志哟！<br/>
            辣么赞的假日活动怎能错过？<br/>
            COME ON BABY<br/>
          </div>
          <div className="rule_body_part color_red">
            <div className="color_blue">参与方式：</div>
            时间：<br/>2016年9月15、16日  10:30~16:00<br/>
            地点：<br/>宝乐汇生活时尚中心（上海宝山区牡丹江路1569号）<br/>
            报名方式：<br/>
            1.电话报名：400-820-5336<br/>
            2.微信报名：关注萌宝派微信服务号（mengbaopai），直接留言“中秋星宝贝+姓名+联系方式+场次”<br/>
            3.萌宝派APP：APP中搜索“中秋星宝贝”线下狂欢服务—— 直接报名，活动现场由工作人员完成验证即可获得额外礼品。
            如有疑问可电话咨询或咨询萌宝小编：mengbao1hao
          </div>
          <div className="rule_body_part color_blue">
            在现场，领取“星宝”成就卡，开启星路旅程——<br/>
            ★舞台亲子律动操<br/>
            早教老师带领家长与宝宝一起参与韵律游戏、健康体操，为接下来的“星路之旅”做好热身操！<br/>
            ★益智亲子玩乐区<br/>
            缤纷益智玩具一起玩，让明星宝宝萌第一次展露社交技巧吧！分享玩具、分工合作，超腻害！<br/>
            ★绘画涂鸦创意秀<br/>
            天马行空任发挥，用多彩的画笔放飞宝宝想象吧！为粑粑麻麻画上贴纸卡通像，秒变亲子秀最佳道具<br/>
            ★封面宝宝大角逐<br/>
            现场《聪明宝宝》封面墙前拍摄大片，竞选品牌明星小模特，更有机会登上《聪明宝宝》杂志封面哦！<br/>
            <img src={magazine} className="img_auto_height img_gift"/>
          </div>
          <div className="rule_body_part color_blue">
            颁奖礼<br/><br/>
            1.穿优衣库服饰参与亲子走秀，接受现场观众投票评选，角逐各项大奖。小编提醒：记得带上庞大的亲友团，现场为宝宝加油助威拉选票啦！<br/>
            2.	所有参与活动的小明星都将有机会获得专属于自己的定制封面杂志哟！<br/>
            2.	现场揭晓“封面小明星”，并与《聪明宝宝》签约小模特，更有机会参与优衣库大片拍摄！<br/><br/>
            精彩大礼抢先看：<br/>
            <img src={bag} className="img_auto_height img_gift"/>
            <div className="text-gift">优衣库帆布购物袋</div>
            <br/>
            <img src={pillow} className="img_auto_height img_gift"/>
            <div className="text-gift">优衣库logo抱枕</div>
            <br/>
            <img src={barrier} className="img_auto_height"/>
            <div className="text-gift">价值46元Keep Barrier贝佳舒随身空气净化卡</div>
            <br/>
            <img src={sawasdee} className="img_auto_height"/>
            <div className="text-gift">价值1980元，泰国原装进口，萨瓦斯蒂 Sawasdee 泰国婴幼儿天然乳胶床上5件套（床单、床套、枕头套*2、床罩）</div>
            <br/>
          </div>
        </div>
        <img src={down} className="img_auto_height img_down"/>
        <img src={start} className="img_auto_height img_start" onClick={this.changePart}/>
      </div>
    )
  }
});
module.exports = RulePart;
