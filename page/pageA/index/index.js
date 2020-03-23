var _wxcharts = require('../../../js/wxcharts');
var _wxcharts2 = require('../../../js/wxcharts2');
var QQMapWX = require('../../../js/qqmap-wx-jssdk.min.js');//腾讯地图sdk
// var binding = require('../../../js/rpn');
//格式化日期
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
var qqmapsdk;
var app = getApp();
Page({
  data: {
    showModal: false,
    videoimg:'',
    hot: '',
    fhjieguo: '',
    config: {
      showhide: 'show'
    },
    jieqi: '',
    srcvideojieqi:'',
    jieqidw: '',
    jieqis:{
      show:'show'
    },
    meinv:{
      show:'show'
    },
    bg: 'bg',
    width: '',
    city: '',
    srcvideo: 'http://videowx.weatherol.com/e4dc738cvodtransgzp1253592073/2d26ea8f9031868222911536798/f0.f20.mp4',
    CityName: "北京",
    aqiname: '',
    skwendu: '0',
    sktianqi: '',
    sktime: '',
    fjibie: '',
    shidu: '',
    aqijiebie: '',
    todaywentu: '20',
    tadaytianqi: '晴',
    tomorowwendu: '20',
    tomorowtianqi: '晴',
    tadayicon: '',
    tomorowicon: '',
    yujingbox: '',
    aqicolorsk: '',
    aqishuzhi: '',
    ershisihour: [],
    fif: [],
    config: {
      tipsshow: ""
    },
    configg: {
      showhide: 'hide'
    },
    dingweiF:{
      show:'hide'
    },
    hiddenLoading: false,//开启loading
    top: '200',
    yaqiang: '',
    left: '-37',
    cy: '',
    xc: '',
    uv: '',
    pp: '',
    yd: '',
    gm: '',
    dy: '',
    confifen: {
      show: 'show'
    },
    confifenID:{
      show:'hide'
    },
    configaqi: {
      show: 'show'
    },
    tianjia: {
      show: 'show'
    },
    srcvideojieqi:'',
    tab_video:'none',
    yijuhua:'',
    jiangshui:'block',
    juti:'',
    jutishow:'block',
    tab_image:'',
    tab_imagejieqi:'none',
    jieqiimg:'',
    srcvideojieqi:'',
    tab_videojieqi:'none',
    jingdu:'',
    weidu:'',
    xiangxi:'',
    title:'',
    share: {
      show: 'hide'
    },
    videoImg:{
      show:'show'
    },
    video: {
      show: 'hide'
    },
    jieqiImg:{
      show:'show'
    },
    jieqiVideo:{
      show:'hide'
    },
    historyCitys:'',
    inputVal:'',
    searchRecord: [],
    twoHourForecast: "未来两个小时没有雨",
    curveId:'none',
    curve:{
      show:'hide'
    }
  },
  openHistorySearch: function () {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [],//若无储存则为空
    })
  },
  clearSearchStorage: function () {
    wx.clearStorageSync('searhRecord')
    this.setData({
      searchRecord: []
    })
  },
  // 分享到朋友圈
  // pengyouquan: function (event) {
  //   wx.navigateTo({ url: '../pengyouquan/pengyouquan?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  // },
  about: function () {
    wx.navigateTo({ url: '../../pageC/about/about' })
  },
  yijian: function () {
    wx.navigateTo({ url: '../../pageC/yijian/yijian' })
  },
  download: function () {
    wx.navigateTo({ url: '../../pageC/download/download' })
  },
  // 分享
  share:function(){
    this.setData({
      share: {
        show: 'show'
      },
    })
  },
  // 关闭分享
  quxiao: function () {
    this.setData({
      share: {
        show: 'hide'
      },
    })
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
  returnbtn:function(){
    var that = this;
    that.setData({
      configg:{
        showhide:"hide"
      },
      config3: {
        shouye: 'show'
      }
    })
  },
  // 点击进入台风页面
  taifeng: function (e) {
    wx.navigateTo({ url: '../../pageC/taifeng/taifeng?jing=' + e.currentTarget.dataset.postJingdu + '&weidu=' + e.currentTarget.dataset.postWeidu })
  },
  taifengID: function (e) {
    wx.navigateTo({ url: '../../pageC/taifeng/taifeng?id=' + e.currentTarget.dataset.postId })
  },
  baoyuzhuanti: function (e) {
    wx.navigateTo({ url: '../../pageC/baoyuzhuanti/baoyuzhuanti?jing=' + e.currentTarget.dataset.postJingdu + '&weidu=' + e.currentTarget.dataset.postWeidu })
  },
  baoyuzhuantiID: function (e) {
    wx.navigateTo({ url: '../../pageC/baoyuzhuanti/baoyuzhuanti?id=' + e.currentTarget.dataset.postId })
  },
  gaowenzhuanti: function (e) {
    wx.navigateTo({ url: '../../pageC/gaowenzhuanti/gaowenzhuanti?id=' + e.currentTarget.dataset.postId })
  },
  // 开始播放
  bindplay: function (e) {
    var that = this;
    that.setData({
      videoImg: {
        show: 'hide'
      },
      video: {
        show: 'show'
      },
      jieqiImg:{
        show:'hide'
      },
      jieqiVideo:{
        show:'show'
      }
    })
  },
  // 播放结束
  bindended:function(){
    var that = this;
    that.setData({
      videoImg: {
        show: 'show'
      },
      video: {
        show: 'hide'
      },
      jieqiImg: {
        show: 'show'
      },
      jieqiVideo: {
        show: 'hide'
      }
    })
  },
  bofang:function(){
    var videoContext = wx.createVideoContext("video");
    videoContext.play();
    var that = this;
    that.setData({ 
      videoImg:{
        show:'hide'
      },
      video: {
        show: 'show'
      },
    });
  },
  jieqibo:function(){
    var videoContext = wx.createVideoContext("videojieqi");
    videoContext.play();
    var that = this;
    that.setData({
      jieqiImg: {
        show: 'hide'
      },
      jieqiVideo: {
        show: 'show'
      },
    });
  },
  jieqi: function () {
    wx.navigateTo({ url: '../../pageB/jieqi/jieqi' })
  },
  buttonClickgj: function (event) {
    wx.redirectTo({ url: '../../pageC/indexgj/indexgj' })
  },
  buttonClickjq:function(){
    wx.redirectTo({ url: '../../pageB/indexjq/indexjq' })
  },
  test:function(){
    wx.navigateTo({
      url:'../../pageB/test/test'
    })
  },
  yantu:function(){
    wx.navigateTo({
      url: '../../pageC/yantu/yantu'
    })
  },
  watchPassWord: function (event) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxsearch?search=' + event.detail.value,
      method: 'get',
      success: function (res) {
        that.setData({
          fhjieguo: res.data
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  // 去重
  removerepeatattr:function(a){
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
  hotcity: function (event) {
    var that = this;
    var demo = new QQMapWX({
      key: '4FDBZ-MNQL5-HYPII-QHRYD-DVTXS-Y6FU7' // 必填
    });
    var inputVal = event.currentTarget.dataset.postName;
    var id = event.currentTarget.dataset.postId;
    var searchRecord = that.data.searchRecord;
    if (inputVal == '') {
      //输入为空时的处理
    }
    else {
      //将搜索值放入历史记录中,只能放前10条
      if (searchRecord.length < 10) {
        searchRecord.unshift(
          {
            value: inputVal,
            id: id,
            index: searchRecord.length
          }
        )
      }
      else {
        searchRecord.pop()//删掉旧的时间最早的第一条
        searchRecord.unshift(
          {
            value: inputVal,
            id: id,
            index: searchRecord.length
          }
        )
      }
      var a = searchRecord;
      a = that.removerepeatattr(a);
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', a);
      this.openHistorySearch()
    }
    // 调用接口
    demo.geocoder({
      address: event.currentTarget.dataset.postName,
      success: function (res) {
        wx.setStorage({
          key: 'lat',
          data: res.result.location.lat,
        })
        wx.setStorage({
          key: 'lng',
          data: res.result.location.lng,
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
       
      }
    });
    that.setData({
      configg: {
        showhide: 'hide'
      },
      config3: {
        shouye: 'show'
      },
      config4: {
        shouye: 'hide'
      },
      jiangshui:'none',
      jutishow:'none'
    })
    var width;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth;
        that.setData({
          width: width
        })
      }
    })
    var cityid = event.currentTarget.dataset.postId;
    // 切换城市之后降水用id
    this.setData({
      confifenID: {
        show: 'show'
      },
      confifen: {
        show: 'hide'
      }
    })
    var optionsname = event.currentTarget.dataset.postName;
    this.sk(cityid, optionsname);
    this.aqi(cityid, optionsname);
    this.aqiyubao(cityid, optionsname);
    this.yujing(cityid, optionsname);
    this.fif(cityid, optionsname, width);
    this.ershisi(cityid, optionsname);
    this.zhishu('ct', cityid);
    this.zhishu('xc', cityid);
    this.zhishu('uv', cityid);
    this.zhishu('pp', cityid);
    this.zhishu('yd', cityid);
    this.zhishu('gm', cityid);
    this.zhishu('dy', cityid);
    this.getlnglatforId(cityid);//通过id获取经纬度
    var ids = wx.getStorageSync("dingweiid");
    wx.setStorage({
      key: "cityid",
      data: cityid
    })
    wx.setStorage({
      key: "cityname",
      data: optionsname
    })
    // 将当前城市存起来
    wx.setStorage({
      key: 'historyCitys',
      data: optionsname,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLaunch: function (options) {
  },
  meirixiangqing: function (event) {
    wx.navigateTo({ url: '../../pageB/video/video?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&yunshi=' })
  },
  meirixiangqing2: function (event) {
    wx.navigateTo({ url: '../../pageB/meirixiangqing/meirixiangqing?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&a=' + event.currentTarget.dataset.postA })
  },
  buttonclickyujing: function (event) {
    wx.navigateTo({ url: '../../pageB/yujing/yujing?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  },
  aqibutton: function (event) {
    wx.navigateTo({ url: '../../pageB/aqi/aqi?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  },
  fifmore: function (event) {
    wx.navigateTo({ url: '../../pageB/fif/fif?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  },
  jiangshui: function (e) {
      wx.navigateTo({ url: '../../pageB/pop/pop?jing=' + e.currentTarget.dataset.postJingdu + '&weidu=' + e.currentTarget.dataset.postWeidu })
    },
  jiangshuiID:function(e){
    wx.navigateTo({ url: '../../pageB/pop/pop?id=' + e.currentTarget.dataset.postId })
  },
  // 24小时详情
  ershisixq: function (event) {
    wx.navigateTo({ url: '../../pageA/ershisixq/ershisi?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  },
  zhishuxq: function (event) {
    wx.navigateTo({ url: '../../pageB/zhishuxq/zhishuxq?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&type=' + event.currentTarget.dataset.postType + '&mingzi=' + event.currentTarget.dataset.postMingzi })
  },
  video: function (event) {
    wx.navigateTo({ url: '../../pageB/video/video?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&yunshi=yunshi' })
  },
  videobox: function (event) {
    wx.navigateTo({ url: '../../pageB/video/video?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&yunshi=' })
  },
  popCurve:function(event){
    if(event.currentTarget.dataset.postId == "curveId"){
      wx.navigateTo({ url: '../../pageB/pop/pop?jing=' + event.currentTarget.dataset.postJingdu + '&weidu=' + event.currentTarget.dataset.postWeidu })
    }else{
      wx.navigateTo({ url: '../../pageB/pop/pop?id=' + event.currentTarget.dataset.postId })
    }
  },
  meitianshipin: function (e) {
    var that = this;
    that.setData({
      CityName: e
    })
  },
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.openHistorySearch()
    var juti = wx.getStorageSync("juti");
    var yijuhua = wx.getStorageSync("yijuhua");
    var lingyis = wx.getStorageSync("lingyi");
    var lingers = wx.getStorageSync("linger");
    var xiangxi = wx.getStorageSync("juti");
    var city = wx.getStorageSync("city");
    if (options.id == undefined && options.c != "xuanze") {
      this.dingwei();
    }else{
      this.setData({
        hiddenLoading: true,
      })
    }
    showView: (
      options.showView == "true" ? true : false
    )
    if (options.id == undefined) {
      options.id = "101010100"
    }
    if (options.name == undefined) {
      options.name = "北京"
    }
    wx.setNavigationBarTitle({
      title: "气象在线",
    })
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getXcxfximg',
      method: 'get',
      success: function (shareimg) {
        wx.setStorage({
          key: 'shareimg',
          data: shareimg.data.fximg,
        })
      }
    })
    setTimeout(function () {
      that.setData({
        tianjia: {
          show: 'hide'
        }
      })
    }, 3000);
    that.setData({
      juti:juti,
      yijuhua: yijuhua,
      jingdu: lingyis,
      weidu: lingers,
      xiangxi: xiangxi,
      city: city
    })
    wx.request({
      url: 'https://m.weatherol.com.cn/getSolarTerm24Controller?stdate=' + starTime,
      method: 'get',
      success: function (res) {
        if (res.data.video != "") {
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
    if (options.c == "xuanze") {
      that.setData({
        configg: {
          showhide: 'show'
        },
        config3: {
          shouye: 'hide'
        }
      })
    }
    var width;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth;
        that.setData({
          width: width
        })
      }
    })
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxstation',
      method: 'get',
      success: function (res) {
        if (res.data != null) {
          that.setData({
            hot: res.data[0].item,
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
    var cityid = options.id;
    var optionsname = options.name;
    this.sk(cityid, optionsname);
    this.aqi(cityid, optionsname);
    this.aqiyubao(cityid, optionsname);
    this.yujing(cityid, optionsname);
    this.fif(cityid, optionsname, width);
    this.ershisi(cityid, optionsname);
    this.zhishu('ct', cityid);
    this.zhishu('xc', cityid);
    this.zhishu('uv', cityid);
    this.zhishu('pp', cityid);
    this.zhishu('yd', cityid);
    this.zhishu('gm', cityid);
    this.zhishu('dy', cityid);
    this.getlnglatforId(cityid);//通过id获取经纬度
    wx.setStorage({
      key: "cityid",
      data: cityid
    })
    wx.setStorage({
      key: "cityname",
      data: optionsname
    })
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
        var twoHour = res.data.result.minutely.precipitation_2h;
        var datar = '[' + twoHour + ']';
        var twoHourBox = [];
        var xzhou = [];
        for (var i = 0; i < twoHour.length; i++) {
          if (i % 5 == 0) {
            twoHourBox.push(that.getPosition(twoHour[i]));
            xzhou.push('');
          }
        };
        that.popEchart(twoHourBox,xzhou);
        that.setData({
          twoHourForecast: res.data.result.forecast_keypoint
        })
        var sum = 0;
        for (let i = 0; i < twoHour.length; i++) {
          sum += twoHour[i];
        }
        sum = (sum.toFixed(1));
        if(sum == 0){
          that.setData({
            curve:{
              show:'hide'
            }
          })
        }else{
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
      legend:false,
      categories: xzhou,
      animation: true,
      dataPointShape:false,
      splitLine:false,
      extra: {
        lineStyle: 'curve'
      },
      xAxis: {
        disabled: true,
        gridColor:"rgba(255,255,255,0)"
      },
      yAxis:{
        format: function (val) {
          return val
        },
        gridColor:"rgba(255,255,255,0)",
        disabled:true,
        min:0,
        max:85
      },
      series: [{
        type: 'line',
        smooth: true,
        data: twoHourBox,
        color:"#ffffff"
      }],
      dataLabel: false,
      width: 195,
      height: 100
    }
    new _wxcharts2(option)
  },
  getPosition: function (value) {
    var max = 85;
    var result = 0;
    if (value < 0 || value == 0) {
      return 0;
    } else if ((0 < value && value < 0.25)|| value == 0.25 ){
      result = value * max / 0.75;
    } else if ((0.25 < value && value < 0.35)|| value == 0.35) {
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
        var lng = res.data.location[1];
        var lat = res.data.location[0];
        that.twohourPrecipitationData(lng, lat)
      }
    })
  },
  zhishu: function (ty, cityid) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getIndexData?type=' + ty + '&id=' + cityid,
      method: 'get',
      dataType: 'json',
      success: function (res) {
        if (res.data != null) {
          if (ty == "ct") {
            that.setData({
              cy: res.data.level,
            })
          } else if (ty == "xc") {
            that.setData({
              xc: res.data.level,
            })
          } else if (ty == "uv") {
            that.setData({
              uv: res.data.level,
            })
          } else if (ty == "pp") {
            that.setData({
              pp: res.data.level,
            })
          } else if (ty == "yd") {
            that.setData({
              yd: res.data.level,
            })
          } else if (ty == "gm") {
            that.setData({
              gm: res.data.level,
            })
          } else if (ty == "dy") {
            that.setData({
              dy: res.data.level,
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
  sk: function (cityid, optionsname,status) {
    var that = this;
    // 实况天气
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxcurrent?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null) {
          wx.request({
            url: 'https://m.weatherol.com.cn/getVideoInfo?objid=e4dc738&weather=' + res.data.weather,
            method:'get',
            success:function(res){
              that.setData({
                srcvideo: res.data.videofile,
                videoimg: res.data.imgfile
              })
            }
          })
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
          if (status == "curveId"){
            that.setData({
              curveId: "curveId",
            })
          }else{
            that.setData({
              curveId: cityid,
            })
          }
          that.setData({
            skwendu: res.data.temperature,
            sktianqi: res.data.weatherDecoder,
            sktime: res.data.reportTime,
            fjibie: res.data.windDirDecoder+res.data.windPowerDecoder,
            shidu: res.data.humidity,
            CityName: optionsname,
            aqiid: cityid,
            aqiname: optionsname,
            yaqiang: res.data.pressure
          })
          wx.setStorage({
            key: "tianqi",
            data: res.data.weatherDecoder
          })
          wx.setStorage({
            key: "wendu",
            data: res.data.temperature
          })
          // 限行
          wx.request({
            url: 'https://m.weatherol.com.cn/getXianXing?id=' + cityid,
            method: 'get',
            success: function (res) {
              if(res.data != ""){
                var xianxing = res.data[0].restriction.limits[0].plates;
                var xianxingV = [];
                for (var i = 0; i < xianxing.length; i++) {
                  xianxingV.push(xianxing[i]);
                }
                that.setData({
                  xxx:{
                    show: 'show' 
                  },
                  dyy: {
                    show: 'hide'
                  },
                  xx: xianxingV
                })
              }else{
                that.setData({
                  dyy: {
                    show: 'show'
                  },
                  xxx: {
                    show: 'hide'
                  }
                })
              }
              
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
  aqi: function (cityid, optionsname) {
    var that = this;
    // 实况空气质量
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxac?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data == null) {
          that.setData({
            configaqi: {
              show: 'hide'
            }
          })
          wx.setStorage({
            key: 'aqi',
            data: "",
          })
        } else if (res.data.aQI == "—") {
          that.setData({
            configaqi: {
              show: 'hide'
            }
          })
          wx.setStorage({
            key: 'aqi',
            data: "",
          })
        } else {
          that.setData({
            configaqi: {
              show: 'show'
            },
            aqijiebie: res.data.aQI_level,
            aqiicon: res.data.pic,
            aqicolorsk: res.data.aQI_level_color,
            aqishuzhi: res.data.aQI
          })
          wx.setStorage({
            key: 'aqi',
            data: res.data.aQI_level,
          })
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  aqiyubao: function (cityid, optionsname) {
    var that = this;
    // 空气质量预报
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxf5d1y?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data == null) {

        } else {
          that.setData({
            aqicolor: res.data[0].maxbgcolor,
            taqicolor: res.data[1].maxbgcolor
          })
        }
      },
      fail: function (res) {  
      },
      complete: function (res) {
      }
    })
  },
  yujing: function (cityid, optionsname) {
    var that = this;
    // 预警
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxalert?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null) {
          that.setData({
            yujingbox: res.data,
            config: {
              tipsshow: "show"
            }
          })
          wx.setStorage({
            key: 'yujing',
            data: res.data[0],
          })
        } else {
          that.setData({
            config: {
              tipsshow: "hide"
            }
          })
          wx.setStorage({
            key: 'yujing',
            data: "",
          })
        }
      },
      fail: function (res) {

      },
      complete: function (res) {
      }
    })
  },
  fif: function (cityid, optionsname, width) {
    var that = this;
    //十五天预报
    wx.request({
      url: 'https://m.weatherol.com.cn/xcx15df?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null) {
          var maxzhi = [];
          var minzhi = [];
          
          var fif = [];
          for (var i = 0; i < 11; i++) {
            fif.push(res.data[i]);
            maxzhi.push(res.data[i].bai_temperature);
            minzhi.push(res.data[i].wan_temperature);
            if (res.data[i].bai_windDirDecoder == "") {
              res.data[i].bai_windDirDecoder = "无"
            }
            if (res.data[i].wan_windDirDecoder == "") {
              res.data[i].wan_windDirDecoder = "无"
            }
          }
          that.setData({
            fif: fif,
          });
          var tianqi01 = res.data[1].bai_weatherDecoder;
          var tianqi02 = res.data[1].wan_weatherDecoder;
          var tianqi03 = res.data[2].bai_weatherDecoder;
          var tianqi04 = res.data[2].wan_weatherDecoder;
          if (tianqi01 == tianqi02) {
            that.setData({
              tadaytianqi: res.data[1].bai_weatherDecoder,
            })
          } else {
            that.setData({
              tadaytianqi: res.data[1].bai_weatherDecoder + '转' + res.data[1].wan_weatherDecoder,
            })
          }
          if (tianqi03 == tianqi04) {
            that.setData({
              tomorowtianqi: res.data[2].bai_weatherDecoder,
            })
          } else {
            that.setData({
              tomorowtianqi: res.data[2].bai_weatherDecoder + '转' + res.data[2].wan_weatherDecoder,
            })
          }
          if (width == "320") {
            that.setData({
              top: 140,
              left: -38
            })
          } else if (width < "375" || width == "375") {
            that.setData({
              top: 176,
              left: -38
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
            todaywentu: res.data[1].bai_temperature + '/' + res.data[1].wan_temperature,
            tadayicon: res.data[1].bai_weather,
            tomorowwendu: res.data[2].bai_temperature + '/' + res.data[2].wan_temperature,
            tomorowicon: res.data[2].bai_weather
          }),
          
          
          // 十五天曲线图
          setTimeout(function(){
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
          },1000) 
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  ershisiCanvas:function(res){
    
  },
  ershisi: function (cityid, optionsname) {
    var that = this;
    //24小时预报
    wx.request({
      url: 'https://m.weatherol.com.cn/xcx24hf?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null) {
          that.setData({
            ershisihour: res.data,
          })
          that.ershisiCanvas(res.data);
        }
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
  },
  dingweis: function () {
    this.dingwei();
    
  },
  dingwei: function () {
    // 腾讯地图定位
    qqmapsdk = new QQMapWX({
      key: '4FDBZ-MNQL5-HYPII-QHRYD-DVTXS-Y6FU7' // 必填
    });
    var that = this;
    var width;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth;
        that.setData({
          width: width
        })
      }
    })
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        //2、根据坐标获取当前位置名称，显示在顶部:腾讯地图逆地址解析
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            wx.setStorage({
              key: 'juti',
              data: addressRes.result.address_component.street_number,
            })
            wx.setStorage({
              key: 'lat',
              data: res.latitude,
            })
            wx.setStorage({
              key: 'lng',
              data: res.longitude,
            })
            var lingyi = addressRes.result.location.lng;
            var linger = addressRes.result.location.lat;
            that.twohourPrecipitationData(lingyi, linger);
            var city = addressRes.result.address_component.city + '' + addressRes.result.address_component.district;
            wx.setStorage({
              key: 'lingyi',
              data: lingyi,
            })
            wx.setStorage({
              key: 'linger',
              data: linger,
            });
            wx.setStorage({
              key: 'city',
              data: city,
            });
            that.setData({
              jingdu: lingyi,
              weidu: linger,
            })
            wx.request({
              url: 'https://m.weatherol.com.cn/xcxposition?provice=' + addressRes.result.address_component.province + '&city=' + addressRes.result.address_component.city + '&dis=' + addressRes.result.address_component.district,
              method: 'get',
              success: function (res) {
                that.setData({
                  hiddenLoading: true,
                  dingweiF: {
                    show: 'hide'
                  },
                });
                // 点击定位后选择城市页面隐藏，首页显示
                that.setData({
                  configg: {
                    showhide: 'hide'
                  },
                  config3: {
                    shouye: 'show'
                  },
                  confifenID:{
                    show:'hide'
                  },
                  confifen: {
                    show: 'show'
                  },
                })
                wx.setStorage({
                  key: 'dingweiid',
                  data: res.data.id,
                })
                var cityid = res.data.id;
                var optionsname = addressRes.result.address_component.city+' '+addressRes.result.address_component.district;
                that.sk(cityid, optionsname,"curveId");
                that.aqi(cityid, optionsname);
                that.aqiyubao(cityid, optionsname);
                that.yujing(cityid, optionsname);
                that.fif(cityid, optionsname, width);
                that.ershisi(cityid, optionsname);
                that.zhishu('ct', cityid);
                that.zhishu('xc', cityid);
                that.zhishu('uv', cityid);
                that.zhishu('pp', cityid);
                that.zhishu('yd', cityid);
                that.zhishu('gm', cityid);
                that.zhishu('dy', cityid);
                wx.setStorage({
                  key: "cityid",
                  data: cityid
                })
                wx.setStorage({
                  key: "cityname",
                  data: optionsname
                })
                // 将当前城市存起来
                wx.setStorage({
                  key: 'historyCitys',
                  data: optionsname,
                })
              },
              fail: function (res) {
              },
              complete: function (res) {
                
              },
            })
          }, fail: function () {
          }
        })
      }, fail: function (res) {
        var lingyi = "161";
        var linger = "39";
        wx.setStorage({
          key: 'lingyi',
          data: lingyi,
        })
        wx.setStorage({
          key: 'linger',
          data: linger,
        });
        // 定位失败的时候loading消失
        that.setData({
          hiddenLoading: true,
          dingweiF: {
            show: 'show'
          },
        });
        
        // 选择城市页面隐藏，首页显示
        that.setData({
          configg: {
            showhide: 'hide'
          },
          config3: {
            shouye: 'show'
          }
        })
      },
      complete:function(){
      }
    })
  },
  guanbiDingweiF: function () {
    var that = this;
    that.setData({
      dingweiF: {
        show: 'hide'
      },
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo');
    var that = this;
  },
  lineShow: function (min, max, width) {
    let line = {
      animation: false, //是否有动画
      canvasId: 'lineGraph',
      type: 'line',
      canvasHeight: 300,
      symbolSize:'1',
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
  onShow: function () {

  },
  onHide: function () {
    var _this = this;
    _this.setData({
      share:{
        show:'hide'
      }
    })
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
  onShareAppMessage: function (e) {
    var tianqi = wx.getStorageSync('tianqi');
    var wendu = wx.getStorageSync('wendu');
    var cityname = wx.getStorageSync('cityname');
    var cityid = wx.getStorageSync('cityid');
    var img = wx.getStorageSync('shareimg');
    var yujing = wx.getStorageSync('yujing');
    var aqi = wx.getStorageSync('aqi');
    if(yujing == ""){
      return {
        title: cityname + ' ' + tianqi + ' ' + wendu + '°' + ' ' + "空气质量：" + aqi,
        imageUrl: img,
        path: '/page/pageA/index/index?id=' + cityid + '&name=' + cityname
      }
    }else{
      return {
        title: cityname + ' ' + tianqi + ' ' + wendu + '°' + ' ' + "空气质量：" + aqi + ' ' + yujing.type + yujing.level + '预警',
        imageUrl: img,
        path: '/page/pageA/index/index?id=' + cityid + '&name=' + cityname
      }
    }
  }
})