Page({
  /**
   * 页面的初始数据
   */
  data: {
    aqi: "",
    aqicolor: '#3dc691',
    bg: 'bg',
    updatetime: "",
    aqijiebie: "",
    pm25zhi: '',
    pm25color: '',
    pm10zhi: '',
    pm10color: '',
    pmso2zhi: '',
    pmso2color: '',
    xinghao:'',
    No2zhi: '',
    No2color: '',
    O3: '',
    O3color: '',
    CO: '',
    COcolor: '',
    fivefif: '',
    config: {
      tipsshow: ""
    },
    aqijibies: '',
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    height: '',
    wenxintishi: '',
    title: '',
    hiddenLoading: false,//默认开启loading
    markers: [],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    jiancename:'',
    weidu:'',
    jingdu:'',
    maps:'',
    quanping:'quanping',
    hidehide:'none'
  },
  regionchange(e) {
  },
  
  controltap(e) {
  },
  about: function () {
    wx.navigateTo({ url: '../../pageC/about/about' })
  },
  yijian: function () {
    wx.navigateTo({ url: '../../pageC/yijian/yijian' })
  },
  quanping:function(){
    var that = this;
    that.setData({
      maps: "maps",
      hidehide:'block'
    })
  },
  quanguo:function(event){
    wx.navigateTo({
      url: '../../pageB/quanguo/quanguo?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 点击标记点的时候触发
  markertap(e) {
  },
  onLoad: function (options) {
    console.log(options);
    console.log(options.id);
    wx.setStorage({
      key: "cityJq",
      data: options.id
    })
    wx.setStorage({
      key: "cityname",
      data: options.name
    })
    console.log(options.name);
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getairCurrent?id=' + options.id,
      method: 'get',
      success: function (res) {
        console.log(res.data);
        var aQI = [];
        var pM10 = [];
        var pM2_5 = [];
        var cO = [];
        var nO2 = [];
        var sO2 = [];
        var jingdu = [];
        var weidu = [];
        var youaQI = [];
        var youpM10 = [];
        var youpM2_5 = [];
        var youcO = [];
        var younO2 = [];
        var yousO2 = [];
        var citynames = [];
        for (var i = 0; i < res.data.length; i++) {
          aQI.push(res.data[i].aQI);
          pM10.push(res.data[i].pM10);
          pM2_5.push(res.data[i].pM2_5);
          cO.push(res.data[i].cO);
          nO2.push(res.data[i].nO2);
          sO2.push(res.data[i].sO2);
          jingdu.push(res.data[i].lat);
          weidu.push(res.data[i].lon);
          youaQI.push(res.data[i].aQI_level);
          youpM10.push(res.data[i].pM10_level);
          youpM2_5.push(res.data[i].pM2_5_level);
          youcO.push(res.data[i].cO_level);
          younO2.push(res.data[i].nO2_level);
          yousO2.push(res.data[i].sO2_level);
          citynames.push(res.data[i].station_name);
        }
        wx.setStorage({
          key: "aQI",
          data: aQI
        })
        wx.setStorage({
          key: "pM10",
          data: pM10
        })
        wx.setStorage({
          key: "pM2_5",
          data: pM2_5
        })
        wx.setStorage({
          key: "cO",
          data: cO
        })
        wx.setStorage({
          key: "nO2",
          data: nO2
        })
        wx.setStorage({
          key: "sO2",
          data: sO2
        })
        wx.setStorage({
          key: "jingdu",
          data: jingdu
        })
        wx.setStorage({
          key: "weidu",
          data: weidu
        })
        wx.setStorage({
          key: "youaQI",
          data: youaQI
        })
        wx.setStorage({
          key: "youpM10",
          data: youpM10
        })
        wx.setStorage({
          key: "youpM2_5",
          data: youpM2_5
        })
        wx.setStorage({
          key: "youcO",
          data: youcO
        })
        wx.setStorage({
          key: "younO2",
          data: younO2
        })
        wx.setStorage({
          key: "yousO2",
          data: yousO2
        })
        wx.setStorage({
          key: "citynames",
          data: citynames
        })
      }
    })
    wx.setNavigationBarTitle({
      title: "空气质量",
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    // aqi实况数据
    wx.request({
      url: 'https://m.weatherol.com.cn/getairCurrent?id=' + options.id,
      method: 'get',
      success: function (res) {
        console.log(res.data);
        that.setData({
          wenxintishi: res.data.aQI_influence,
          aqi: res.data.aQI,
          aqicolor: res.data.aQI_level_color,
          updatetime: res.data.reporttime,
          aqijiebie: res.data.aQI_level,
          pm25zhi: res.data.pM2_5,
          pm25color: res.data.pM2_5_level_color,
          pm10zhi: res.data.pM10,
          pm10color: res.data.pM10_level_color,
          pmso2zhi: res.data.sO2,
          pmso2color: res.data.sO2_level_color,
          No2zhi: res.data.nO2,
          No2color: res.data.nO2_level_color,
          O3: res.data.oOO,
          O3color: res.data.oOO_level_color,
          CO: res.data.cO,
          COcolor: res.data.cO_level_color,
          title: options.name,
          aqiid: options.id,
          aqiname:options.name
        })
        wx.setStorage({
          key: "aqi",
          data: options.name + '空气质量' + ' ' + res.data.aQI + ' ' + res.data.aQI_level
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
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
    // aqi七天预报数据
    wx.request({
      url: 'https://m.weatherol.com.cn/getairforecast5d1y?id=' + options.id,
      method: 'get',
      success: function (res) {
        console.log(res.data);
        that.setData({
          fivefif: res.data
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
    // aqi实况监测点数据
    wx.request({
      url: 'https://m.weatherol.com.cn/getstaionair?id=' + options.id,
      method: 'get',
      success: function (res) {
        if (res.data != null) {
          that.setData({
            jiance: res.data,
            height: res.data.length * 70 + 20,
            config: {
              tipsshow: "show"
            }
          })
        } else {
          that.setData({
            config: {
              tipsshow: "hide"
            }
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (e) {
    var options = wx.getStorageSync('options');
    var that = this;
  
  },
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      
    }
  },
  loadInfo: function () {
  },
  loadCity: function (longitude, latitude) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
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
    var cityid = wx.getStorageSync('cityJq');
    var path = '/page/pageB/aqijq/aqijq?id=' + cityid + '&name=' + cityname;
    return {
      title: "点击查看空气质量",
      path: path,
      success: function (res) {
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})