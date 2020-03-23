var QQMapWX = require('../../../js/qqmap-wx-jssdk.min.js');//腾讯地图sdk
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: false,
    // yijuhua:'正在加载',
    jingdu: '',
    wendu:'',
    jingweidu:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    if (options.jing == undefined && options.id != undefined){
      that.setData({
        confifenID:{
          show:'show'
        },
        confifen: {
          show: 'hide'
        },
        jingweidu: '?id=' + options.id
      })
    }else{
      that.setData({
        confifenID: {
          show: 'hide'
        },
        confifen: {
          show: 'show'
        },
        jingweidu:'?lng=' + options.weidu + '&lat=' + options.jing
      })
    }
    
  },
  loadInfo: function (){
    
  },
  loadCity: function (longitude, latitude) {

  },
  dingwei: function () {
    // 腾讯地图定位
    var qqmapsdk;
    qqmapsdk = new QQMapWX({
      key: '4FDBZ-MNQL5-HYPII-QHRYD-DVTXS-Y6FU7' // 必填
    });
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var lingyi = addressRes.result.ad_info.location.lng;
            var linger = addressRes.result.ad_info.location.lat;
            wx.setStorage({
              key: 'lingyi',
              data: lingyi,
            })
            wx.setStorage({
              key: 'linger',
              data: linger,
            });
          }, fail: function () {
            var lingyi = "116.298447";
            var linger = "39.959332";
            wx.setStorage({
              key: 'lingyi',
              data: lingyi,
            })
            wx.setStorage({
              key: 'linger',
              data: linger,
            });
          }
        })
      }, fail: function (res) {
        var lingyi = "116.298447";
        var linger = "39.959332";
        wx.setStorage({
          key: 'lingyi',
          data: lingyi,
        })
        wx.setStorage({
          key: 'linger',
          data: linger,
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.setData({
      hiddenLoading: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    this.dingwei();
    var lingyis = wx.getStorageSync("lingyi");
    var lingers = wx.getStorageSync("linger");
    console.log(lingyis);
    console.log(lingers);
    return {
      title: '点击查看您附近降水情况',
      path: '/page/pageB/pop/pop?jing=' + lingyis + '&weidu=' + lingers
    }}
})