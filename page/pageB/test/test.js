Page({
  data: {
    moban:''
  },
  onLaunch: function (options) {
  }, 
  onLoad: function (options) {
    // var that = this;
    // wx.getStorage({
    //   key: 'e',
    //   success: function (res) {
    //     var e = res.data;
    //     that.send(e);
    //   }
    // })
  },
  send: function (e) {
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxgetWxToken',
      method: 'get',
      success: function (res) {
        var accesstoken = res.data.access_token;    
        wx.login({
          success(res) {
            var codes = res.code;
            console.log(codes);
            var appId = 'wxe64811f1b0de8fa5';
            var secret = '18f2d1d5a33c230eb7b61e05c8ea35b0';
            wx.request({
              url: 'https://m.weatherol.com.cn/xcxgetJscode2session?appid=' + appId + '&js_code=' + codes + '&secret=' + secret + '&grant_type=authorization_code',
              method: 'get',
              success: function (res) {
                console.log(res);
                var openid = res.data.openid;
                var that = this;
                var formId = e.detail.formId;
                var url = 'https://m.weatherol.com.cn/getSend?accesstoken=' + accesstoken;
                var data = {
                  touser: openid,
                  template_id: "bcZghbmSLM-DdzyBc-uUa4LC36YqbUBIkHpOul-3dcM",
                  page: 'page/aqi/aqi?id=101010100&name=海淀',
                  form_id: formId,
                  data: {
                    "keyword1": {
                      "value": "res.data.aQI",//aqi
                      "color": "#4a4a4a"
                    },
                    "keyword2": {
                      "value": "res.data.aQI_level",//等级
                      "color": "#9b9b9b"
                    },
                    "keyword3": {
                      "value": "res.data.aQI_measures",//建议
                      "color": "#9b9b9b"
                    }
                  },
                  emphasis_keyword: 'keyword1.DATA'
                }
                wx.request({
                  url: url,
                  data: data,
                  success: function (res) {
                  },
                  fail: function (err) {
                    console.log('request fail ', err);
                  },
                  complete: function (res) {
                  }
                })
              }
            })
          }
        })
      }, fail: function (res) {
        //console.log(res);
      }
    })
  },
  onShow:function(){
  },
  testSubmit: function (e) {
    var that = this;
    that.send(e);
  },
  onReady: function () {
   
  },
  onShow: function () {
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {
    
  }
})