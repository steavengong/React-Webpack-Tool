/**
 * Created by Administrator on 2016/8/24.
 */
const $ = require('jquery');
const Promise = require('promise');
const DateFormat = require('dateformat');
const UrlParams = require('url-params-helper');
const Util = {}
Util.isWX = function(){
  let ua = window.navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i) == 'micromessenger'){
    return true;
  }
  return false;
}

Util.checkResponseData = function(data,key){
  if(data){
    if(data[key]){
      return data[key];
    }
  }
  return '';
}

/*解析时间*/
Util.parseTime = function(time){
  if(time){
    let tempStrs = time.split(" ");
    let dateStrs = tempStrs[0].split("-");
    let year = parseInt(dateStrs[0], 10);
    let month = parseInt(dateStrs[1], 10) - 1;
    let day = parseInt(dateStrs[2], 10);
    let timeStrs = tempStrs[1].split(":");
    let hour = parseInt(timeStrs[0], 10);
    let minute = parseInt(timeStrs[1], 10);
    let second = parseInt(timeStrs[2], 10);
    let date = new Date(year, month, day, hour, minute, second);
    return date;
  }
}

Util.formatTime = function(date,format){
  return DateFormat(date,format||'yyyy年mm月dd日');
}

/*网络图片压缩*/
Util.compressImageFromWeb = function(url,compress){
  return url + compress;
}
/*http请求 json请求*/
Util.getResponseFromJSON = function(options){
  $.ajax(
    {
      url:options.url,
      data:options.data,
      method:options.method||'GET',
      dataType : "jsonp",
      jsonp: "callback",
      success:options.success,
      error:options.error
    }
  )
}
/*http请求 formData请求*/
Util.getResponseFromFormData = function(options){
  var xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if(xhr.status == 200){
      options.success(JSON.parse(xhr.responseText))
    }
  }
  xhr.open(options.method||'POST',options.url,true);
  xhr.send(options.formData);
}
/*json数据合并*/
Util.mergeJSONData = function(params,defaults){
  params = params || {};
  for(const def in defaults){
    if (typeof params[def] === 'undefined') {
      params[def] = defaults[def];
    }
    else if (typeof params[def] === 'object') {
      for (const deepDef in defaults[def]) {
        if (typeof params[def][deepDef] === 'undefined') {
          params[def][deepDef] = defaults[def][deepDef];
        }
      }
    }
  }
  return params;
}

/*Andriod Bridge初始化*/
function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady'
      , function() {
        callback(WebViewJavascriptBridge)
      },
      false
    );
  }
}

/*IOS Bridge初始化*/
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  const WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

Util.initJSBridge = function(){
  const promise = new Promise(function(resolve){
    let deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
    let deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
    let deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
    if(deviceIsAndroid){
      connectWebViewJavascriptBridge(function(bridge) {
        bridge.init();
        resolve(bridge);
      });
    }

    if(deviceIsIOS){
      setupWebViewJavascriptBridge(function(bridge) {
        resolve(bridge);
      });
    }
  });
  return promise;
}

Util.registerHandler = function(bridge,key,callBack){
  if(bridge){
    bridge.registerHandler(key,callBack)
  }
}

Util.callHandler = function(bridge,key,sendData,callBack){
  if(bridge){
    bridge.callHandler(key,sendData,callBack)
  }
}

Util.getBlobFromFile = function(file){
  let blob = '';
  if(file){
    if(typeof file === 'object'){
      if (window.createObjectURL != undefined) { // basic
        blob = window.createObjectURL(file);
      } else if (window.URL != undefined) { // mozilla(firefox)
        blob = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) { // webkit or chrome
        blob = window.webkitURL.createObjectURL(file);
      }
    }
    else{
      blob = file;
    }
  }
  return blob;
}

Util.needsFormDataShim = function(){
  const bCheck = ~navigator.userAgent.indexOf('Android')
    && ~navigator.vendor.indexOf('Google')
    && !~navigator.userAgent.indexOf('Chrome');
  return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534;
}

Util.blobConstruct = function(){
  try {
    return new Blob();
  } catch (e) {

  }
}

const XBlob = function(){
  const blobConstruct = !!Util.blobConstruct;
  if(blobConstruct){
    return window.Blob;
  }
  else{
    return function(parts, opts){
      const bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
      parts.forEach(function (p) {
        bb.append(p);
      });

      return bb.getBlob(opts ? opts.type : undefined);
    }
  }
}

const FormDataShim = function(){
  // Store a reference to this
  const o = this;
  const parts = [];
  const boundary = Array(5).join('-') + (+new Date() * (1e16*Math.random())).toString(32);
  const oldSend = XMLHttpRequest.prototype.send;

  this.append = function (name, value, filename) {
    parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');

    if (value instanceof Blob) {
      parts.push('; filename="'+ (filename || 'blob') +'"\r\nContent-Type: ' + value.type + '\r\n\r\n');
      parts.push(value);
    } else {
      parts.push('\r\n\r\n' + value);
    }
    parts.push('\r\n');
  };

  // Override XHR send()
  XMLHttpRequest.prototype.send = function (val) {
    let fr;
    let data;
    let oXHR = this;

    if (val === o) {
      //注意不能漏最后的\r\n ,否则有可能服务器解析不到参数.
      parts.push('--' + boundary + '--\r\n');
      data = new XBlob(parts);
      fr = new FileReader();
      fr.onload = function () { oldSend.call(oXHR, fr.result); };
      fr.onerror = function (err) { throw err; };
      fr.readAsArrayBuffer(data);

      this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
      XMLHttpRequest.prototype.send = oldSend;
    }
    else {
      oldSend.call(this, val);
    }
  };
}

Util.FormData = Util.needsFormDataShim() ? new FormDataShim() : new FormData();

const NewBlob = function (data, dataType){
  let out;
  try {
    out = new Blob([data], {type: dataType});
  }
  catch (e) {
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;

    if (e.name == 'TypeError' && window.BlobBuilder) {
      const bb = new BlobBuilder();
      bb.append(data.buffer);
      out = bb.getBlob(dataType);
    }
    else if (e.name == "InvalidStateError") {
      out = new Blob([data], {type: dataType});
    }
    else {
    }
  }
  return out;
}

Util.dataURLtoBlob = function(data){
  const tmp = data.split(',');

  tmp[1] = tmp[1].replace(/\s/g,'');
  const binary = atob(tmp[1]);
  const array = [];
  for(var i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new NewBlob(new Uint8Array(array), 'image/jpeg');
}

/*localStorage的存与取*/
Util.setLocalStorage = function(key,value){
  if(typeof value === 'string'){
    window.localStorage[key] = value;
  }
  else if(typeof value === 'object'){
    window.localStorage[key] = JSON.stringify(value);
  }
}

Util.getLocalStorage = function(key){
  const value = window.localStorage[key]||null;
  return value;
}

Util.getLocalStorageObject = function(key){
  const value = window.localStorage[key];
  if(!value){
    return null;
  }
  return JSON.parse(value);
}

Util.clearLocalStorage = function (key) {
  window.localStorage.removeItem(key);
}

Util.clearAllLocalStorage = function () {
  window.localStorage.clear();
}

/*URL解析*/
Util.queryUrlParams = function(key){
  return UrlParams.getParam(key);
}


/*微信操作*/
let wx;
if(Util.isWX()){
  wx = require('weixin-js-sdk');
}

Util.setJSSign = function(wxOptions){
  var self = this;
  const options = {
    url:wxOptions.url,
    data:wxOptions.data,
    success:function(result){
      var response = result.response;
      if(response && wx){
        wx.config({
          debug : wxOptions.debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId : wxOptions.appId, // 必填，公众号的唯一标识
          timestamp : response.timestamp, // 必填，生成签名的时间戳
          nonceStr : response.nonceStr, // 必填，生成签名的随机串
          signature :response.signature,// 必填，签名，见附录1
          jsApiList : wxOptions.jsApiList||[ "onMenuShareTimeline",
            "onMenuShareAppMessage", "onMenuShareQQ",
            "onMenuShareWeibo","showMenuItems","hideMenuItems"]
          // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function() {
          //判断当前客户端版本是否支持指定JS接口
          wx.checkJsApi({
            jsApiList : wxOptions.jsApiList||[ "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ", "onMenuShareWeibo","showMenuItems","hideMenuItems"]
          });
          wxOptions.wxReady();
        });

        wx.error(function() {
        });
      }
    }
  }
  self.getResponseFromJSON(options);
}
Util.shareItems = function(shareObject){
  if(wx){
    this.onMenuShareTimeline(shareObject);
    this.onMenuShareAppMessage(shareObject);
    this.onMenuShareQQ(shareObject);
    this.onMenuShareWeibo(shareObject);
  }
}
Util.onMenuShareTimeline = function(shareObject){//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
  if(wx){
    wx.onMenuShareTimeline({
      title : shareObject.titleLine||shareObject.title, // 分享标题
      link : shareObject.link, // 分享链接
      imgUrl : shareObject.imgUrl, // 分享图标
      success: shareObject.success,
      cancel: shareObject.cancel
    });
  }
}
Util.onMenuShareAppMessage = function(shareObject) { //获取“分享给朋友”按钮点击状态及自定义分享内容接口
  if(wx){
    wx.onMenuShareAppMessage({
      title : shareObject.title, // 分享标题
      desc : shareObject.desc, // 分享描述
      link : shareObject.link, // 分享链接
      imgUrl : shareObject.imgUrl, // 分享图标
      success: shareObject.success,
      cancel: shareObject.cancel
    });
  }
}
Util.onMenuShareQQ = function(shareObject) { //获取“分享到QQ好友”按钮点击状态及自定义分享内容接口
  if(wx){
    wx.onMenuShareQQ({
      title : shareObject.title, // 分享标题
      desc : shareObject.desc, // 分享描述
      link : shareObject.link, // 分享链接
      imgUrl : shareObject.imgUrl, // 分享图标
      success: shareObject.success,
      cancel: shareObject.cancel
    });
  }
}
Util.onMenuShareWeibo = function(shareObject){ //获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
  if(wx){
    wx.onMenuShareWeibo({
      title : shareObject.title, // 分享标题
      desc : shareObject.desc, // 分享描述
      link : shareObject.link, // 分享链接
      imgUrl : shareObject.imgUrl, // 分享图标
      success: shareObject.success,
      cancel: shareObject.cancel
    });
  }
}


module.exports = Util;
