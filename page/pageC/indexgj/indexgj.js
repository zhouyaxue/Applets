var _wxcharts = require('../../../js/wxcharts');
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
    CityNamegj: "",
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
    searchRecordGJ: [],
    cy:'',
    xc:'',
    uv:'',
    qc:'',
    pb:'',
    gm:'',
    dy:'',
    cl:'',
    imgwidth:'',
    imgleft:''
  },
  openHistorySearchGJ: function () {
    this.setData({
      searchRecordGJ: wx.getStorageSync('searchRecordGJ') || [],//若无储存则为空
    })
  },
  clearSearchStorageGJ: function () {
    wx.clearStorageSync('searchRecordGJ')
    this.setData({
      searchRecordGJ: []
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
    var that = this;
    that.setData({
      configg: {
        showhide: 'hide'
      },
      config4: {
        shouye: 'show'
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
  buttonClickjq: function (event) {
    wx.redirectTo({ url: '../../pageB/indexjq/indexjq?c=xuanze' })
  },
  fifmore: function (event) {
    wx.navigateTo({ url: '../../pageC/fifgj/fifgj?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  },
  zhishuxq: function (event) {
    wx.navigateTo({ url: '../../pageC/zhishugj/zhishugj?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&type=' + event.currentTarget.dataset.postType})
  },
  ershisixq: function (event){
    wx.navigateTo({ url: '../../pageC/ershisigjxq/ershisi?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName })
  },
  meirixiangqing2:function(event){
    wx.navigateTo({ url: '../../pageC/meirixiangqinggj/meirixiangqinggj?id=' + event.currentTarget.dataset.postId + '&name=' + event.currentTarget.dataset.postName + '&a=' + event.currentTarget.dataset.postA })
  },
  watchPassWord2: function (event) {
    //用搜索结果获取返回值
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxfsearch?search=' + event.detail.value,
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
  hotcity2: function (event) {
    var that = this;
    var inputVal = event.currentTarget.dataset.postName;
    var id = event.currentTarget.dataset.postId;
    var searchRecordGJ = that.data.searchRecordGJ;
    if (inputVal == '') {
      //输入为空时的处理
    }
    else {
      //将搜索值放入历史记录中,只能放前10条
      if (searchRecordGJ.length < 10) {
        searchRecordGJ.unshift(
          {
            value: inputVal,
            id: id,
            index: searchRecordGJ.length
          }
        )
      }
      else {
        searchRecordGJ.pop()//删掉旧的时间最早的第一条
        searchRecordGJ.unshift(
          {
            value: inputVal,
            id: id,
            index: searchRecord.length
          }
        )
      }
      var a = searchRecordGJ;
      a = that.removerepeatattr(a);
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecordGJ', a);
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
    this.skgj(cityid, optionsname);
    this.fifgj(cityid, width, optionsname);
    this.ershisigj(cityid);
    this.zhishu('ct', cityid);
    this.zhishu('xc', cityid);
    this.zhishu('uv', cityid);
    this.zhishu('qc', cityid);
    this.zhishu('pb', cityid);
    this.zhishu('gm', cityid);
    this.zhishu('dy', cityid);
    this.zhishu('cl', cityid);
    wx.setStorage({
      key: "cityidgj",
      data: cityid
    })
    wx.setStorage({
      key: "citynamegj",
      data: optionsname
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLaunch: function (options) {
    
  },
  onLoad: function (options) {
    if (options.id == undefined) {
      options.id = "HUS4071374006000"
    }
    if (options.name == undefined) {
      options.name = "纽约"
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
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxstagw',
      method: 'get',
      success: function (res) {
        if(res.data != null && res.data != ""){
          that.setData({
            hot2: res.data[0].item
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
    this.skgj(cityid, optionsname);
    this.fifgj(cityid, width, optionsname);
    this.ershisigj(cityid);
    wx.setStorage({
      key: "cityid",
      data: cityid
    })
    wx.setStorage({
      key: "cityname",
      data: optionsname
    })
  },
  zhishu: function (ty, cityid) {
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getgjIndexsAllData?type=' + ty + '&id=' + cityid,
      method: 'get',
      dataType: 'json',
      success: function (res) {
        if (res.data != null) {
          if (ty == "ct") {
            that.setData({
              cy: res.data[7].level,
            })
          } else if (ty == "xc") {
            that.setData({
              xc: res.data[5].level,
            })
          } else if (ty == "uv") {
            that.setData({
              uv: res.data[6].level,
            })
          } else if (ty == "qc") {
            that.setData({
              qc: res.data[4].level,
            })
          } else if (ty == "pb") {
            that.setData({
              pb: res.data[3].level,
            })
          } else if (ty == "gm") {
            that.setData({
              gm: res.data[2].level,
            })
          } else if (ty == "dy") {
            that.setData({
              dy: res.data[1].level,
            })
          } else if (ty == "cl") {
            that.setData({
              cl: res.data[0].level,
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
  skgj:function(cityid,optionsname){
    console.log(cityid);
    var that = this;
    // 实况天气
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxfc?&id=' + cityid,
      method: 'get',
      success: function (res) {
        console.log(res.data);
        if(res.data != null && res.data != ""){
          var tianss = res.data.iconDecoder;
          that.setData({
            fjibie: res.data.wDirDecoder + res.data.wSpeed + '级',
          })
          wx.request({
            url: 'https://m.weatherol.com.cn/getVideoInfo?objid=e4dc738&weather=' + res.data.wxIcon,
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
          that.setData({
            skwendugj: res.data.temp,
            sktianqigj: res.data.iconDecoder,
            sktimegj: res.data.reportTime,
            shidugj: res.data.humid,
            tadayicongj: res.data.wxIcon,
            CityNamegj: optionsname,
            Cityidgj: cityid,
            yaqianggj: res.data.pressure
          })
        } 
      },
      fail: function (res) {
      },
      complete: function (res) {
      },
    })
  },
  fifgj: function (cityid, width, optionsname){
    var that = this;
    //十天预报
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxff?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null && res.data != "") {
          var maxzhi = [];
          var minzhi = [];
          for (var i = 0; i < res.data.length; i++) {
            maxzhi.push(res.data[i].maxTemp);
            minzhi.push(res.data[i].minTemp);
          }
          if (res.data[1].day_iconText == res.data[1].night_iconText) {
            that.setData({
              tadaytianqi: res.data[1].day_iconText,
            })
          } else {
            that.setData({
              tadaytianqi: res.data[1].day_iconText + '转' + res.data[0].night_iconText,
            })
          }
          if (res.data[2].day_iconText == res.data[2].night_iconText) {
            that.setData({
              tomorowtianqi: res.data[2].day_iconText,
            })
          } else {
            that.setData({
              tomorowtianqi: res.data[2].day_iconText + '转' + res.data[2].night_iconText,
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
          that.lineShowgj(minzhi, maxzhi, width)
          that.setData({
            fifgj: res.data,
            todaywentugj: res.data[1].minTemp + '/' + res.data[1].maxTemp,
            tomorowwendugj: res.data[2].minTemp + '/' + res.data[2].maxTemp,
            tomorowicongj: res.data[2].day_icon,
          })
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
  ershisigj: function (cityid){
    var that = this;
    //24小时预报
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxf24hf?id=' + cityid,
      method: 'get',
      success: function (res) {
        if (res.data != null && res.data != "") {
          that.setData({
            ershisihourgj: res.data
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
  lineShowgj: function (min, max, width) {
    console.log(min);
    console.log(max);
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
      path: '/page/pageC/indexgj/indexgj?id=' + cityidgj + '&name=' + citynamegj+'&c=fenxiang'
    }
  }
})