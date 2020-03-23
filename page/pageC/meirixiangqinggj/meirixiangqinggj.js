var app = getApp();
var mtabW;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading:false,
    currentTab: 0,
    height: '',
    meiri:'',
    xiangqing:'',
    tianqi:'',
    wendu:'',
    left:'50',
    aqi:'',
    aqimax:'',
    gongli:'',
    nongli:'',
    yi:'',
    ji:'',
    bg:'bg',
    tianqitop:''
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
    wx.setStorage({
      key: 'cityid',
      data: options.id,
    })
    wx.setStorage({
      key: 'cityname',
      data: options.name,
    })
    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    //var time = datetime.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据 
    var height;
    var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     height = res.windowHeight;
    //     console.log(height);
    //     that.setData({
    //       height: height*1.5
    //     })
    //   }
    // })
    that.setData({ 
      currentTab: options.a 
    });
    //this.swichNav(e);
    this.checkCor();
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.fif(options.id, options.name);

    //this.huangli(time);
    // 实况天气
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxfc?&id=' + options.id,
      method: 'get',
      success: function (res) {
        if(res.data != null){
          var tianss = res.data.iconDecoder;
          if (tianss == "雨" || tianss == "阵雨" || tianss == "雷阵雨" || tianss == "雷阵雨伴有冰雹" || tianss == "雨夹雪" || tianss == "小雨" || tianss == "中雨" || tianss == "大雨" || tianss == "暴雨" || tianss == "大暴雨" || tianss == "特大暴雨" || tianss == "冻雨" || tianss == "小到中雨" || tianss == "中到大雨" || tianss == "大到暴雨" || tianss == "暴雨到大暴雨" || tianss == "大暴雨到特大暴雨") {
            that.setData({
              bg: 'yu'
            })
          } else {
            that.setData({
              bg: 'bg'
            })
          }
          that.setData({
            Cityidgj:options.id,
            Citynamegj: options.name,
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  //十五天预报
  fif: function (cityid, optionsname) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxff?id=' + cityid,
      method: 'get',
      success: function (res) {
        if(res.data != null){
          console.log(res.data);
          var tianqitopbox = [];
          var fengxiang = [];
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].day_iconText == res.data[i].night_iconText) {
              tianqitopbox.push(res.data[i].day_iconText);
            } else {
              tianqitopbox.push(res.data[i].day_iconText + '转' + res.data[i].night_iconText);
            }
            if (res.data[i].day_wDirTextCN == res.data[i].night_wDirTextCN) {
              fengxiang.push(res.data[i].day_wDirTextCN);
            } else if (res.data[i].day_wDirTextCN == ""){
              fengxiang.push(res.data[i].night_wDirTextCN);
            } else if (res.data[i].night_wDirTextCN == ""){
              fengxiang.push(res.data[i].day_wDirTextCN);
            } else {
              fengxiang.push(res.data[i].day_wDirTextCN + '转' + res.data[i].night_wDirTextCN);
            }
          }
          var dates = [];
          for (var i = 0; i < res.data.length; i++) {
            var tianqiyi = res.data[i].bai_weatherDecoder;
            var tianqier = res.data[i].wan_weatherDecoder;
            var wenduyi = res.data[i].bai_temperature;
            var wenduer = res.data[i].wan_temperature;
            dates.push(res.data[i].dateFormat);
          }
          that.setData({
            meiri: res.data,
            xiangqing: res.data,
            fengxiang: fengxiang,
            tianqitop: tianqitopbox
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
     * 滑动切换tab 
     */
  bindChange: function (e) {
    console.log(e);
    console.log("sssssssssssssssssssss");
    var that = this;
    that.setData({ 
      currentTab: e.detail.current
    });
    this.checkCor();
    var cityname = e.currentTarget.dataset.postName;
    var cityid = e.currentTarget.dataset.postId;
    console.log(cityid)
    console.log(cityname);
    that.fif(cityid, cityname);
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  checkCor:function(){
    var that = this;
    if (that.data.currentTab > 4 && that.data.currentTab < 10){
      that.setData({
        left:270
      })
    } else if (that.data.currentTab > 9){
      that.setData({
        left:680
      })
    }else{
      that.setData({
        left: 0
      })
    }
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
      title: cityname+"每日详情",
      path: '/page/pageC/meirixiangqinggj/meirixiangqinggj?id=' + cityid + '&name=' + cityname
    }
  }
})