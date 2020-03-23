var app = getApp();
var mtabW;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading:false,
    fif:'',
    cityid:'',
    cityname:'',
    bg:'bg',
    tianqibo:'',
    fengxiangri:'',
    fengji:''
  },
  about: function () {
    wx.navigateTo({ url: '../../pageC/about/about' })
  },
  yijian: function () {
    wx.navigateTo({ url: '../../pageC/yijian/yijian' })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLaunch: function (options) {
    
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name+'15天预报'
    })
    this.fif(options.id, options.name);
      var that = this;
      // 实况天气
      wx.request({
        url: 'https://m.weatherol.com.cn/xcxcurrent?id=' + options.id,
        method: 'get',
        success: function (res) {
          var tianss = res.data.weatherDecoder;
          if (tianss == "雨" || tianss == "阵雨" || tianss == "雷阵雨" || tianss == "雷阵雨伴有冰雹" || tianss == "雨夹雪" || tianss == "小雨" || tianss == "中雨" || tianss == "大雨" || tianss == "暴雨" || tianss == "大暴雨" || tianss == "特大暴雨" || tianss == "冻雨" || tianss == "小到中雨" || tianss == "中到大雨" || tianss == "大到暴雨" || tianss == "暴雨到大暴雨" || tianss == "大暴雨到特大暴雨") {
            that.setData({
              bg: 'yu'
            })
          } else {
            that.setData({
              bg: 'bg'
            })
          }
        },
        fail: function (res) {
        },
        complete: function (res) {
        },
      })
  },
  fifxq:function(event){
    wx.setStorage({
      key: 'fif',
      data: event,
    })
    wx.navigateTo({ url: '../../pageB/meirixiangqing/meirixiangqing?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&a=' + event.currentTarget.dataset.postA + '&event=' + event })
  },
  //十五天预报
  fif: function (cityid, optionsname) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcx15df?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null) {
          var tianqibo = [];
          var fengxiangri = [];
          var fengji = [];
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].bai_weatherDecoder == res.data[i].wan_weatherDecoder) {
              tianqibo.push(res.data[i].bai_weatherDecoder);
            } else {
              tianqibo.push(res.data[i].bai_weatherDecoder + '转' + res.data[i].wan_weatherDecoder);
            }
            if (res.data[i].bai_windDirDecoder == res.data[i].wan_windDirDecoder ){
              fengxiangri.push(res.data[i].bai_windDirDecoder);
            }else{
              fengxiangri.push(res.data[i].bai_windDirDecoder + '转' + res.data[i].wan_windDirDecoder);
            }
            if (res.data[i].bai_windPowerDecoder == res.data[i].wan_windPowerDecoder){
              fengji.push(res.data[i].bai_windPowerDecoder)
            }else{
              fengji.push(res.data[i].bai_windPowerDecoder + '-' + res.data[i].wan_windPowerDecoder)
            }
          }
          that.setData({
            fif: res.data,
            cityid: cityid,
            cityname: optionsname,
            tianqibo: tianqibo,
            fengxiangri: fengxiangri,
            fengji: fengji
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
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
    var cityname = wx.getStorageSync('cityname');
    var cityid = wx.getStorageSync('cityid');
    return {
      title: '点击查看'+cityname + '未来15天预报',
      path: '/page/pageB/fif/fif?id=' + cityid + '&name=' + cityname
    }
  }
})