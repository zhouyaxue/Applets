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
    hidehide:'none',
    value:'',
    jiance2:'',
    jiancelevel:'',
    placeName:'',
    placejianceValue:'',
    placejiance:'',
    placejiancelevel:'',
    animationData:'',
    showModalStatus:''
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
  jiance: function (name, a, imgbox, jingdu, weidu, citynames,zu){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.platform);
        var markers = [];
        for (var i = 0; i < imgbox.length; i++) {
          markers.push({
            label: {
              content: a[i],
              color: "#000000",
              anchorX: -12,
              anchorY: -25,
              fontSize: "14",
              padding: "0",
              display: "ALWAYS"
            },
            iconPath: imgbox[i], id: i, latitude: jingdu[i], longitude: weidu[i], width: "30", height: "30",
          });
        }
        that.setData({
          markers: markers,
          weidu: weidu[0],
          jingdu: jingdu[0],
          jiancename: citynames,
          value: name,
          jiance2:a,
          jiancelevel: zu
        })
      }
    })
  },
  // 点击标记点的时候触发
  markertap(e) {
    console.log(e);
    this.showModal(e);
    
  },
  showModal: function (e) {
    var that = this;
    var jiance = e.target.dataset.jiance;
    var jianceValue = e.target.dataset.jianceValue;
    var name = e.target.dataset.name;
    var jiancelevel = e.target.dataset.jianceLevel; 
    var markerId = e.markerId;
    that.setData({
      placeName: name[markerId],
      placejianceValue: jianceValue,
      placejiance: jiance[markerId],
      placejiancelevel: jiancelevel[markerId]
    })
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    that.animation = animation
    animation.translateY(300).step()
    that.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        showModalStatus: true
      })
    }.bind(that), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  color: function (valuename,name, zu, jingdu, weidu, citynames){
    var that = this;
    var imgbox = [];
    var img = ["https://m.weatherol.com.cn/aqimap/you_tm.png", "https://m.weatherol.com.cn/aqimap/liang_tm.png", "https://m.weatherol.com.cn/aqimap/qingdu_tm.png", "https://m.weatherol.com.cn/aqimap/zhongdu_tm.png", "https://m.weatherol.com.cn/aqimap/zhongdu01_tm.png", "https://m.weatherol.com.cn/aqimap/yanzhong_tm.png"];
    for (var i = 0; i < zu.length; i++) {
      if (zu[i] == "优") {
        imgbox.push(img[0]);
      } else if (zu[i] == "良") {
        imgbox.push(img[1]);
      } else if (zu[i] == "良好") {
        imgbox.push(img[1]);
      } else if (zu[i] == "轻度污染") {
        imgbox.push(img[2]);
      } else if (zu[i] == "中度污染") {
        imgbox.push(img[3]);
      } else if (zu[i] == "重度污染") {
        imgbox.push(img[4]);
      } else if (zu[i] == "严重污染") {
        imgbox.push(img[5]);
      } else if (zu[i] == "缺测"){
        imgbox.push(img[6]);
      }
    }
    that.jiance(valuename, name, imgbox, jingdu, weidu, citynames, zu);
  },
  huoqushuju: function (name){
    var that = this;
    var aQI = wx.getStorageSync('aQI');
    var pM10 = wx.getStorageSync('pM10');
    var pM2_5 = wx.getStorageSync('pM2_5');
    var cO = wx.getStorageSync('cO');
    var nO2 = wx.getStorageSync('nO2');
    var sO2 = wx.getStorageSync('sO2');
    var youaQI = wx.getStorageSync('youaQI');
    var youpM10 = wx.getStorageSync('youpM10');
    var youpM2_5 = wx.getStorageSync('youpM2_5');
    var youcO = wx.getStorageSync('youcO');
    var younO2 = wx.getStorageSync('younO2');
    var yousO2 = wx.getStorageSync('yousO2');
    var jingdu = wx.getStorageSync('jingdu');
    var weidu = wx.getStorageSync('weidu');
    var citynames = wx.getStorageSync('citynames');
    var img = ["https://m.weatherol.com.cn/aqimap/you.png", "https://m.weatherol.com.cn/aqimap/liang.png", "https://m.weatherol.com.cn/aqimap/qingdu.png", "https://m.weatherol.com.cn/aqimap/aqimap/zhongdu.png", "https://m.weatherol.com.cn/aqimap/aqimap/zhongdu01.png", "https://m.weatherol.com.cn/aqimap/aqimap/yanzhong.png"];
    if (name == "aQI") {
      that.color('aqi',aQI, youaQI, jingdu, weidu, citynames);
    } else if (name == "pM10") {
      that.color('pm10',pM10, youpM10, jingdu, weidu, citynames);
    } else if (name == "pM2_5") {
      that.color('pm2.5',pM2_5, youpM2_5, jingdu, weidu, citynames);
    } else if (name == "cO") {
      that.color('co',cO, youcO, jingdu, weidu, citynames);
    } else if (name == "nO2") {
      that.color('no2',nO2, younO2, jingdu, weidu, citynames);
    } else if (name == "sO2") {
      that.color('so2',sO2, yousO2, jingdu, weidu, citynames);
    }
  },
  onLoad: function (options) {
    console.log(options);
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxairstaionlist?id=' + options.id,
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
        that.huoqushuju("aQI");
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
      url: 'https://m.weatherol.com.cn/xcxac?id=' + options.id,
      method: 'get',
      success: function (res) {
        
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
    // aqi五天预报数据
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxf5d1y?id=' + options.id,
      method: 'get',
      success: function (res) {
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
    that.setData({ currentTab: e.detail.current });
    if (e.detail.current == 0){
      that.huoqushuju("aQI")
    } else if (e.detail.current == 1){
      that.huoqushuju("pM10")
    } else if (e.detail.current == 2) {
      that.huoqushuju("pM2_5")
    } else if (e.detail.current == 3) {
      that.huoqushuju("cO")
    } else if (e.detail.current == 4) {
      that.huoqushuju("nO2")
    }else if (e.detail.current == 5) {
      that.huoqushuju("sO2")
    }
    that.hideModal();
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
    that.hideModal();
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
    var title = wx.getStorageSync('aqi');
    var cityname = wx.getStorageSync('cityname');
    var cityid = wx.getStorageSync('cityid');
    var path = '/page/pageB/aqi/aqi?id=' + cityid + '&name=' + cityname;
    return {
      title: title,
      path: path,
      success: function (res) {
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})