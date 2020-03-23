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
    wendu:'',
    left:'50',
    aqi:'',
    aqimax:'',
    gongli:'',
    nongli:'',
    yi:'',
    ji:'',
    bg:'bg',
    tianqitop:'',
    yuechu:'',
    yueluo:'',
    yuexiang:'',
    yue:''
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
    var lat = wx.getStorageSync('lat');
    var lng = wx.getStorageSync('lng');

    // 调用函数时，传入new Date()参数，返回值是日期和时间  
    //var time = datetime.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据 
    var height;
    
    var that = this;
    that.setData({ 
      currentTab: options.a
    });
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxwnimoon15Daydata?id=' + options.id ,
      method: 'get',
      success: function (res) {
        console.log(res);
        var yuexiang = [];
        for (var i = 0; i < res.data.length; i++) {
          yuexiang.push(res.data[i].moonage)
        }
        var yueicon = [];
        for (var i = 0; i < res.data.length; i++) {
          if (res.data[i].moonage == "新月" || res.data[i].moonage == "xinyue") {
            res.data[i].moonage = "xinyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "娥眉月" || res.data[i].moonage == "emeiyue") {
            res.data[i].moonage = "emeiyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "上弦月" || res.data[i].moonage == "shangxuanyue") {
            res.data[i].moonage = "shangxuanyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "盈凸月" || res.data[i].moonage == "yingtuyue") {
            res.data[i].moonage = "yingtuyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "小望月" || res.data[i].moonage == "xiaowangyue") {
            res.data[i].moonage = "xiaowangyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "满月" || res.data[i].moonage == "manyue") {
            res.data[i].moonage = "manyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "十六夜" || res.data[i].moonage == "shiliuye") {
            res.data[i].moonage = "shiliuye";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "十七夜" || res.data[i].moonage == "shiqiye") {
            res.data[i].moonage = "shiqiye";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "亏凸月" || res.data[i].moonage == "kuituyue") {
            res.data[i].moonage = "kuituyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "下弦月" || res.data[i].moonage == "xiaxuanyue") {
            res.data[i].moonage = "xiaxuanyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "残月" || res.data[i].moonage == "canyue") {
            res.data[i].moonage = "canyue";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "晦" || res.data[i].moonage == "hui") {
            res.data[i].moonage = "hui";
            yueicon.push(res.data[i].moonage);
          } else if (res.data[i].moonage == "") {
            res.data[i].moonage = "";
            yueicon.push(res.data[i].moonage);
          }
        }
        that.setData({
          yuexiang: yuexiang,
          yue: yueicon
        })
      }
    });
    //this.swichNav(e);
    this.checkCor();
    wx.setNavigationBarTitle({
      title: options.name
    })
    this.fif(options.id, options.name);
    this.aqiyubao(options.id);
    this.yue(options.id);
    //this.huangli(time);
    // 实况天气
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxcurrent?id=' + options.id,
      method: 'get',
      success: function (res) {
        if(res.data != null){
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
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  
  // 月出月落
  yue: function (cityid) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxmoons?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null) {
          var yuechu = [];
          var yueluo = [];
          for(var i = 0; i < res.data.length; i++){
            yuechu.push(res.data[i].rise);
            yueluo.push(res.data[i].set);
          }
          that.setData({
            yuechu: yuechu,
            yueluo: yueluo
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {

      }
    })
  },
  //十五天预报
  fif: function (cityid, optionsname) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcx15df?id=' + cityid,
      method: 'get',
      success: function (res) {
        if(res.data != null){
          var tianqitopbox = [];
          for (var i = 0; i < res.data.length; i++) {
            if (res.data[i].bai_weatherDecoder == res.data[i].wan_weatherDecoder) {
              tianqitopbox.push(res.data[i].bai_weatherDecoder);
            } else {
              tianqitopbox.push(res.data[i].bai_weatherDecoder + '转' + res.data[i].wan_weatherDecoder);
            }
          }
          var dates = [];
          if (res.data != null) {
            for (var i = 0; i < res.data.length; i++) {
              var tianqiyi = res.data[i].bai_weatherDecoder;
              var tianqier = res.data[i].wan_weatherDecoder;
              var wenduyi = res.data[i].bai_temperature;
              var wenduer = res.data[i].wan_temperature;
              dates.push(res.data[i].dateFormat);
            }
            that.huangli(dates[that.data.currentTab]);
            that.setData({
              meiri: res.data,
              xiangqing: res.data,
              tianqitop: tianqitopbox
            })
          }
        }
        
      },
      fail: function (res) {
      },
      complete: function (res) {
        
      }
    })
  },
  aqiyubao: function (cityid) {
    var that = this;
    // 空气质量预报
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxf5d1y?id=' + cityid,
      method: 'get',
      success: function (res) {
        if(res.data != null){
          var aqi = [];
          var aqimax = [];
          for (var i = 0; i < res.data.length; i++) {
            aqi.push(res.data[i].min);
            aqimax.push(res.data[i].max);
          }
          that.setData({
            aqi: aqi,
            aqimax: aqimax
          })
        }
        
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  huangli:function(date){
    console.log(date);
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxgetnewHuangLi?date='+date,
      method:"get",
      success:function(res){
        console.log(res);
        if(res.data != ""){
          var yi = '';
          var ji = '';
          var length = res.data.data.yi.length;
          var lengthji = res.data.data.ji.length;
          if (length > 3) {
            for (var i = 0; i < 4; i++) {
              yi += res.data.data.yi[i].old + ' ';
            }
            that.setData({
              yi: yi
            })
          } else {
            for (var i = 0; i < length; i++) {
              yi += res.data.data.yi[i].old + ' ';
            }
            that.setData({
              yi: yi
            })
          }
          if (lengthji > 3) {
            for (var i = 0; i < 4; i++) {
              ji += res.data.data.ji[i].old + ' ';
            }
            that.setData({
              ji: ji
            })
          } else {
            for (var i = 0; i < lengthji; i++) {
              ji += res.data.data.ji[i].old + ' ';
            }
            that.setData({
              ji: ji
            })
          }
        }
        
      },
      fail:function(res){

      },
      complete:function(res){

      }
    })
    wx.request({
      url: 'https://m.weatherol.com.cn/gethuangli?date='+date,
      method: "get",
      success: function (res) {
        console.log(res);
        if (res.data != "") {
          // $(".nonglii").text(obj.showapi_res_body.nongli);
          // var nonglis2 = obj.showapi_res_body.gongli;
          // $(".nonglis").text(nonglis2.replace(/公元/ig, ''));
          var gonglis = res.data.showapi_res_body.gongli;
          that.setData({
            nongli: res.data.showapi_res_body.nongli,
            gongli: gonglis.replace(/公元/ig, '')
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
    var that = this;
    that.setData({ 
      currentTab: e.detail.current
    });
    this.checkCor();
    var cityname = wx.getStorageSync('cityname');
    var cityid = wx.getStorageSync('cityid');
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
    var tianqi = wx.getStorageSync('tianqi');
    var wendu = wx.getStorageSync('wendu');
    var cityname = wx.getStorageSync('cityname');
    var cityid = wx.getStorageSync('cityid');
    return {
      title: cityname + ' ' + tianqi + ' ' + wendu + '°',
      path: '/page/pageB/meirixiangqing/meirixiangqing?id=' + cityid + '&name=' + cityname
    }
  }
})