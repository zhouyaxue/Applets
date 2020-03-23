var _wxcharts = require('../../../js/wxcharts');
var _wxcharts2 = require('../../../js/wxcharts2');
// 获取当天日期
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
//使用
var sdfDate = new Date().Format("MM月dd日");
//获取两个时间之间的日期 并格式化
function getBetween(day1, day2) {
  var dateArr = new Array();
  var currentDate;
  var getDate = function (str) {
    var tempDate = new Date();
    var list = str.split("-");
    tempDate.setFullYear(list[0]);
    tempDate.setMonth(list[1] - 1);
    tempDate.setDate(list[2]);
    return tempDate;
  }
  var date1 = getDate(day1);
  var date2 = getDate(day2);
  if (date1 > date2) {
    var tempDate = date1;
    date1 = date2;
    date2 = tempDate;
  }
  date1.setDate(date1.getDate() + 1);
  var dateArr = [];
  var i = 0;
  while (!(date1.getFullYear() == date2.getFullYear()
    && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
      .getDate())) {
    var dayStr = date1.getDate().toString();
    if (dayStr.length == 1) {
      dayStr = "0" + dayStr;
    }
    dateArr[i] = (date1.getMonth() + 1) + "月" + dayStr + "日";
    i++;
    date1.setDate(date1.getDate() + 1);
  }
  currentDate = new Date(day1).Format('MM月dd日');
  dateArr.push(currentDate)
  return dateArr;
}
//获取今天到前十五天之间的日期
var starTime;
function getDay() {
  //获取当前日期
  starTime = new Date().Format("yyyy-MM-dd");//Format("输入你想要的时间格式:yyyy-MM-dd,yyyyMMdd")
}
getDay();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fhjieguo2: '',
    hot2: '',
    all2: '',
    top:'250',
    leftgj:'-37',
    jieqi: '',
    jieqidw: '',
    config: {
      showhide: 'show'
    },
    config2: {
      showhide: 'show'
    },
    tomorowtianqi:'',
    config: {
      show: ""
    },
    configg:{
      showhide:'show'
    },
    srcvideo:'',
    fjibie:'',
    config:{
      shouye:'show'
    },
    citygj: '',
    cityNamegj: "",
    skwendugj: '',
    sktianqigj: '',
    sktimegj: '',
    fjibiegj: '',
    shidugj: '',
    aqijiebiegj: '',
    todayaqijiebiegj: '',
    todaywentugj: '',
    tadaytianqi: '',
    tomorowaqijibiegj: '',
    tomorowwendugj: '',
    tomorowtianqigj: '',
    tadayicongj: '',
    tomorowicongj: '',
    ershisiicongj: '',
    skbg: '',
    tipsshowgj: '',
    ershisihourgj: "",
    fifgj: [],
    config4: {
      shouye: "hide"
    },
    hiddenLoading: false,
    Cityidgj:'',
    fengxianggj:'',
    yaqianggj:'',
    bg:'bg',
    videoimg:'',
    jieqiimg:'',
    tab_image:'',
    tab_imagejieqi:'',
    tab_video:'none',
    tab_videojieqi:'none',
    srcvideojieqi:'',
    inputVal: '',
    searchRecordjq: [],
    cy:'',
    xc:'',
    uv:'',
    qc:'',
    pb:'',
    gm:'',
    dy:'',
    cl:'',
    confifen: {
      show: 'show'
    },
    confifenID: {
      show: 'hide'
    },
    configaqi: {
      show: 'show'
    },
    twoHourForecast: "未来两个小时没有雨",
    curveId: 'none',
    curve: {
      show: 'hide'
    }
  },
  openHistorySearchGJ: function () {
    this.setData({
      searchRecordjq: wx.getStorageSync('searchRecordjq') || [],//若无储存则为空
    })
  },
  clearSearchStorageGJ: function () {
    wx.clearStorageSync('searchRecordjq')
    this.setData({
      searchRecordjq: []
    })
  },
  about: function () {
    wx.navigateTo({ url: '../../pageC/about/about' })
  },
  yijian: function () {
    wx.navigateTo({ url: '../../pageC/yijian/yijian' })
  },
  city: function () {
    var that = this;
    that.setData({
      configg: {
        showhide: 'show'
      },
      config3: {
        shouye: 'hide'
      }
    })
  },
  // 返回
  returnbtn: function () {
    // wx.redirectTo({
    //   url: '../../pageB/indexjq/indexjq'
    // })
    var that = this;
    that.setData({
      configg:{
        showhide:'hide'
      },
      config4:{
        shouye:'show'
      }
    })
  },
  buttonClickshouyegj:function(event){
    var that = this;
    that.setData({
      configg: {
        showhide: 'show'
      },
      config4: {
        shouye: 'hide'
      }
    })
  },
  // 开始播放
  bindplay: function (e) {
    var that = this;
    that.setData({
      tab_image: "none",
      tab_video: 'block',
      tab_imagejieqi: "none",
      tab_videojieqi: 'block'
    })
  },
  // 播放结束
  bindended: function () {
    var that = this;
    that.setData({
      tab_image: "block",
      tab_video: 'none',
      tab_imagejieqi: "block",
      tab_videojieqi: 'none'
    })
  },
  bofang: function () {
    var videoContext = wx.createVideoContext("video");
    videoContext.play();
    var that = this;
    that.setData({
      tab_image: "none",
      tab_video: 'block'
    });
  },
  jieqibo: function () {
    var videoContext = wx.createVideoContext("videojieqi");
    videoContext.play();
    var that = this;
    that.setData({
      tab_jieqishow: "none",
      tab_videojieqi: 'block'
    });
  },
  jieqi: function () {
    wx.navigateTo({ url: '../../pageB/jieqi/jieqi' })
  },
  buttonClick: function (event) {
    wx.redirectTo({ url: '../../pageA/index/index?c=xuanze' })
  },
  buttonClickgj: function (event) {
    wx.redirectTo({ url: '../../pageC/indexgj/indexgj?c=xuanze' })
  },
  fifmore: function (event) {
    wx.navigateTo({ url: '../../pageB/fifjq/fifjq?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&aread=' + event.currentTarget.dataset.postAreaid})
  },
  // ershisixq: function (event){
  //   wx.navigateTo({ url: '../../pageC/ershisigjxq/ershisi?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  // },
  meirixiangqing2:function(event){
    wx.navigateTo({ url: '../../pageC/meirixiangqinggj/meirixiangqinggj?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&a=' + event.currentTarget.dataset.postA })
  },
  jiangshui: function (e) {
    wx.navigateTo({ url: '../../pageB/pop/pop?jing=' + e.currentTarget.dataset.postJingdu + '&weidu=' + e.currentTarget.dataset.postWeidu })
  },
  taifeng: function (e) {
    wx.navigateTo({ url: '../../pageC/taifeng/taifeng?jing=' + e.currentTarget.dataset.postJingdu + '&weidu=' + e.currentTarget.dataset.postWeidu })
  },
  aqibutton: function (event) {
    wx.navigateTo({ url: '../../pageB/aqijq/aqijq?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  },
  yantu: function () {
    wx.navigateTo({
      url: '../../pageC/yantu/yantu'
    })
  },
  zhishuxq: function (event) {
    wx.navigateTo({ url: '../../pageB/zhishujq/zhishujq?id=' + event.currentTarget.dataset.postId + '&aread=' + event.currentTarget.dataset.postAreaid + '&name=' + event.currentTarget.dataset.postName + '&type=' + event.currentTarget.dataset.postType + '&mingzi=' + event.currentTarget.dataset.postMingzi })
  },
  popCurve: function (event) {
    console.log(event);
      wx.navigateTo({ url: '../../pageB/pop/pop?jing=' + event.currentTarget.dataset.postJingdu + '&weidu=' + event.currentTarget.dataset.postWeidu })
  },
  watchPassWord2: function (event) {
    //用搜索结果获取返回值
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getSearch3ATravel?search=' + event.detail.value,
      method: 'get',
      success: function (res) {
        that.setData({
          fhjieguo2: res.data
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  // 去重
  removerepeatattr: function (a) {
    var tmp = {}, b = [];
    for (var i = 0; i < a.length; i++) {
      if (!tmp[a[i].id]) {
        tmp[a[i].id] = !0;
      } else {
        a.splice(i, 1);
      }
    };
    return a
  },
  // 点击热门城市事件
  hotcity: function (event) {
    var that = this;
    var inputVal = event.currentTarget.dataset.postName;
    var id = event.currentTarget.dataset.postId;
    var searchRecordjq = that.data.searchRecordjq;
    if (inputVal == '') {
      //输入为空时的处理
    }
    else {
      //将搜索值放入历史记录中,只能放前10条
      if (searchRecordjq.length < 10) {
        searchRecordjq.unshift(
          {
            value: inputVal,
            id: id,
            index: searchRecordjq.length
          }
        )
      }
      else {
        searchRecordjq.pop()//删掉旧的时间最早的第一条
        searchRecordjq.unshift(
          {
            value: inputVal,
            id: id,
            index: searchRecordjq.length
          }
        )
      }
      var a = searchRecordjq;
      a = that.removerepeatattr(a);
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecordjq', a);
      this.openHistorySearchGJ()
    }
    that.setData({
      configg: {
        showhide: 'hide'
      },
      config3: {
        shouye: 'hide'
      },
      config4: {
        shouye: 'show'
      }
    })
    var width;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth
      }
    })
    var cityid = event.currentTarget.dataset.postId;
    var optionsname = event.currentTarget.dataset.postName;
    console.log(optionsname);
    this.skgj(cityid, optionsname);
    this.fifgj(cityid, optionsname, width);
    this.ershisigj(cityid);
    wx.setStorage({
      key: "cityidgj",
      data: cityid
    })
    wx.setStorage({
      key: "citynamegj",
      data: optionsname
    })
    // 切换城市之后降水用id
    this.setData({
      confifenID: {
        show: 'show'
      },
      confifen: {
        show: 'hide'
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLaunch: function (options) {
    
  },
  onLoad: function (options) {
    if (options.id == undefined) {
      options.id = "GNJQ100003"
    }
    if (options.name == undefined) {
      options.name = "故宫博物院"
    }
    wx.setNavigationBarTitle({
      title: "气象在线",
    })
    var that = this;
    this.openHistorySearchGJ()
    wx.request({
      url: 'https://m.weatherol.com.cn/getSolarTerm24Controller?stdate=' + starTime,
      method: 'get',
      success: function (res) {
        if (res.data.video != "" && res.data.video != null) {
          that.setData({
            jieqis: {
              show: 'show'
            },
            meinv: {
              show: 'hide'
            },
            srcvideojieqi: res.data.video,
            jieqiimg: res.data.sp_file_img
          })
        } else {
          that.setData({
            jieqis: {
              show: 'hide'
            },
            meinv: {
              show: 'show'
            },
            srcvideojieqi: "",
            jieqiimg: res.data.sp_file_img
          })
        }
        that.setData({
          jieqi: res.data.home1,
          jieqidw: res.data.home2
        })
      },
      fail: function (res) {
      }
    })
    if (options.c == "fenxiang") {
      that.setData({
        configg: {
          showhide: 'hide'
        },
        config4: {
          shouye: 'show'
        }
      })
    }else{

    }
    var width;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth
      }
    })
    that.skgj(options.id, options.name);
    that.fifgj(options.id, options.name,width);
    that.ershisigj(options.id, options.name);
    
  },
  // 首页降水预测
  // 两小时降水数据
  twohourPrecipitationData: function (lng, lat) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getprecipitation?type=forecast&ll=' + lng + ',' + lat,
      method: 'get',
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        var twoHour = res.data.result.minutely.precipitation_2h;
        var datar = '[' + twoHour + ']';
        console.log(datar)
        var twoHourBox = [];
        var xzhou = [];
        for (var i = 0; i < twoHour.length; i++) {
          if (i % 5 == 0) {
            console.log(that.getPosition(twoHour[i]));
            twoHourBox.push(that.getPosition(twoHour[i]));
            xzhou.push('');
          }
        };
        that.popEchart(twoHourBox, xzhou);
        that.setData({
          twoHourForecast: res.data.result.forecast_keypoint
        })
        var sum = 0;
        for (let i = 0; i < twoHour.length; i++) {
          sum += twoHour[i];
        }
        sum = (sum.toFixed(1));
        if (sum == 0) {
          that.setData({
            curve: {
              show: 'hide'
            }
          })
        } else {
          that.setData({
            curve: {
              show: 'show'
            }
          })
        }
      }
    })
  },
  popEchart: function (twoHourBox, xzhou) {
    var option = {
      canvasId: 'popCurve',
      type: 'area',
      legend: false,
      categories: xzhou,
      animation: true,
      dataPointShape: false,
      splitLine: false,
      extra: {
        lineStyle: 'curve'
      },
      xAxis: {
        disabled: true,
        gridColor: "rgba(255,255,255,0)"
      },
      yAxis: {
        format: function (val) {
          return val
        },
        gridColor: "rgba(255,255,255,0)",
        disabled: true,
        min: 0,
        max: 85
      },
      series: [{
        type: 'line',
        smooth: true,
        data: twoHourBox,
        color: "#ffffff"
      }],
      dataLabel: false,
      width: 195,
      height:100
    }
    new _wxcharts2(option)
  },
  getPosition: function (value) {
    console.log(value);
    var max = 85;
    var result = 0;
    if (value < 0 || value == 0) {
      return 0;
    } else if ((0 < value && value < 0.25) || value == 0.25) {
      result = value * max / 0.75;
    } else if ((0.25 < value && value < 0.35) || value == 0.35) {
      result = max / 3 + (value - 0.25) * max / 0.30;
    } else {
      result = max;
    }
    return result;
  },
  // 通过经纬度获取城市信息
  getlnglatforId: function (cityid) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getprecipitationByid?type=realtime&id=' + cityid,
      method: 'get',
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        var lng = res.data.location[1];
        var lat = res.data.location[0];
        that.twohourPrecipitationData(lng, lat)
      }
    })
  },
  skgj:function(cityid,optionsname){
    console.log(optionsname)
    var that = this;
    // 实况天气
    wx.request({
      url: 'https://m.weatherol.com.cn/getCimissCurrentJQData?id=' + cityid,
      method: 'get',
      success: function (res) {
        console.log(res.data);
        if(res.data != null && res.data != ""){
          var time = res.data.current.reporttime;
          time = time.split(" ");
          var tianss = res.data.current.weather;
          that.setData({
            fjibie: res.data.current.windDirDecoder + res.data.current.windPowerDecoder,
          })
          wx.request({
            url: 'https://m.weatherol.com.cn/getVideoInfo?objid=e4dc738&weather=' + res.data.current.weatherIndex,
            method: 'get',
            success: function (res) {
              that.setData({
                srcvideo: res.data.videofile,
                videoimg: res.data.imgfile
              })
            }
          })
          if (tianss == "雨" || tianss == "阵雨" || tianss == "雷阵雨" || tianss == "雷阵雨伴有冰雹" || tianss == "雨夹雪" || tianss == "小雨" || tianss == "中雨" || tianss == "大雨" || tianss == "暴雨" || tianss == "大暴雨" || tianss == "特大暴雨" || tianss == "冻雨" || tianss == "小到中雨" || tianss == "中到大雨" || tianss == "大到暴雨" || tianss == "暴雨到大暴雨" || tianss == "大暴雨到特大暴雨") {
            that.setData({
              bg: 'yu'
            })
          } else {
            that.setData({
              bg: 'bg'
            })
          }
          console.log(res.data.scenicspotname);
          that.setData({
            skwendugj: res.data.current.temperature,
            sktianqigj: res.data.current.weather,
            shidugj: res.data.current.humidity,
            cityidgj: cityid,
            cityIDgj:res.data.areaid,
            citynamegj: res.data.scenicspotname,
            jingdu: res.data.lng,
            weidu:res.data.lat,
            yaqianggj: (res.data.current.airpressure)/1000,
            sktimegj:time[1]
          })
          that.zhishu(res.data.areaid);
          that.xianxing(res.data.areaid);
          that.aqijq(res.data.areaid);
          that.getlnglatforId(res.data.areaid);
        } 
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  aqijq:function(cityid,optionsname){
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getairCurrent?id='+cityid,
      method: 'get',
      success:function(res){
        if(res.data != null && res.data != ""){
          console.log(res.data);
          that.setData({
            aqishuzhi: res.data.aQI,
            aqijiebie: res.data.aQI_level,
            aqicolorsk: res.data.aQI_level_color
          })
        }
      }
    })
  },
  fifgj: function (cityid, optionsname, width) {
    var that = this;
    //十五天预报
    wx.request({
      url: 'https://m.weatherol.com.cn/getCimiss15dJQData?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null && res.data != "") {
          var maxzhi = [];
          var minzhi = [];

          var fif = [];
          for (var i = 0; i < 11; i++) {
            fif.push(res.data.forecast[i]);
            maxzhi.push(res.data.forecast[i].bai_temperature);
            minzhi.push(res.data.forecast[i].wan_temperature);
            if (res.data.forecast[i].bai_windDirDecoder == "") {
              res.data.forecast[i].bai_windDirDecoder = "无"
            }
            if (res.data.forecast[i].wan_windDirDecoder == "") {
              res.data.forecast[i].wan_windDirDecoder = "无"
            }
          }
          that.setData({
            fif: fif,
            tadayicongj: res.data.forecast[1].bai_weather,
            tomorowicongj: res.data.forecast[2].bai_weather,
            todaywentugj: res.data.forecast[1].bai_temperature + '/' + res.data.forecast[1].wan_temperature,
            tomorowwendugj: res.data.forecast[2].bai_temperature + '/' + res.data.forecast[2].wan_temperature
          });
          var tianqi01 = res.data.forecast[1].bai_weatherDecoder;
          var tianqi02 = res.data.forecast[1].wan_weatherDecoder;
          var tianqi03 = res.data.forecast[2].bai_weatherDecoder;
          var tianqi04 = res.data.forecast[2].wan_weatherDecoder;
          if (tianqi01 == tianqi02) {
            that.setData({
              tadaytianqi: res.data.forecast[1].bai_weatherDecoder,
            })
          } else {
            that.setData({
              tadaytianqi: res.data.forecast[1].bai_weatherDecoder + '转' + res.data.forecast[1].wan_weatherDecoder,
            })
          }
          if (tianqi03 == tianqi04) {
            that.setData({
              tomorowtianqi: res.data.forecast[2].bai_weatherDecoder,
            })
          } else {
            that.setData({
              tomorowtianqi: res.data.forecast[2].bai_weatherDecoder + '转' + res.data.forecast[2].wan_weatherDecoder,
            })
          }
          if (width == "320") {
            that.setData({
              top: 140,
              left: -34
            })
          } else if (width < "375" || width == "375") {
            that.setData({
              top: 176,
              left: -34
            })
          } else if (width < "360" || width == "360") {
            that.setData({
              top: 174
            })
          } else {
            that.setData({
              top: 195,
              left: -36
            })
          }
          that.lineShow(minzhi, maxzhi, width);
          that.setData({
            todaywentu: res.data.forecast[1].bai_temperature + '/' + res.data.forecast[1].wan_temperature,
            tadayicon: res.data.forecast[1].bai_weather,
            tomorowwendu: res.data.forecast[2].bai_temperature + '/' + res.data.forecast[2].wan_temperature,
            tomorowicon: res.data.forecast[2].bai_weather
          }),


            // 十五天曲线图
            setTimeout(function () {
              wx.canvasToTempFilePath({ //生成图片
                x: 0,
                y: 0,
                quality: 1,
                canvasId: 'lineGraph',
                success: (res) => {
                  var drawurl = res.tempFilePath;
                  that.setData({
                    imgfif: drawurl,
                    imgleft: -37,
                    imgtop: 200,
                    imgwidth: width * 1.92
                  })
                  if (width == 320) {
                    that.setData({
                      imgwidth: width * 1.95
                    })
                  } else if (width == 360) {
                    that.setData({
                      imgwidth: width * 1.98
                    })
                  } else if (width == 375) {
                    that.setData({
                      imgwidth: width * 1.92
                    })
                  } else if (width == 414) {
                    that.setData({
                      imgwidth: width * 1.92
                    })
                  } else if (width == 412) {
                    that.setData({
                      imgwidth: width * 1.92
                    })
                  }
                }
              })
            }, 1000)
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  zhishu: function (cityid) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getIndexsAllData?id=' + cityid,
      method: 'get',
      dataType: 'json',
      success: function (res) {
        if (res.data != null && res.data != "") {
          that.setData({
            cy: res.data[0].level,
            xc: res.data[7].level,
            uv: res.data[6].level,
            qc: res.data[4].level,
            pp: res.data[5].level,
            gm: res.data[2].level,
            dy: res.data[1].level,
            yd: res.data[12].level,
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  xianxing: function (cityid) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getXianXing?id=' + cityid,
      method: 'get',
      dataType: 'json',
      success: function (res) {
        if (res.data != null && res.data != "") {
          var xianxing = res.data[0].restriction.limits[0].plates;
          var xianxingV = [];
          for (var i = 0; i < xianxing.length; i++) {
            xianxingV.push(xianxing[i]);
          }
          that.setData({
            xx: xianxingV,
            xxx:{
              show:'show'
            },
            dyy:{
              show:'hide'
            }
          })
        }else{
          that.setData({
            xxx: {
              show: 'hide'
            },
            dyy:{
              show:'show'
            }
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  ershisigj: function (cityid){
    var that = this;
    //24小时预报
    wx.request({
      url: 'https://m.weatherol.com.cn/getCimiss24hJQData?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null && res.data != "") {
          that.setData({
            ershisihourgj: res.data.jh
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
  lineShow: function (min, max, width) {
    let line = {
      animation: false, //是否有动画
      canvasId: 'lineGraph',
      type: 'line',
      canvasHeight: 300,
      symbolSize: '1',
      categories: ['', '', '', '', '', '', '', '', '', '', ''],
      series: [{
        name: '',
        data: min,
        position: 20,
        format: function (val) {
          return val + '°C';
        },
      }, {
        name: '',
        position: -8,
        data: max,
        format: function (val) {
          return val + '°C';
        },
      }],
      width: width * 1.92,
      height: 120
    }
    new _wxcharts(line)
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
    var citynamegj = wx.getStorageSync('citynamegj');
    var cityidgj = wx.getStorageSync('cityidgj');
    return {
      title: citynamegj + ' ' + tianqi + ' ' + wendu + '°',
      path: '/page/pageB/indexjq/indexjq?id=' + cityidgj + '&name=' + citynamegj+'&c=fenxiang'
    }
  }
})