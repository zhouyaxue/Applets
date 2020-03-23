
import util from '../../../js/util';
Page({
  data: {
    save:{
      show:'show'
    },
    goshare:{
      show:'hide'
    },
    friendbox:{
      show:'show'
    },
    hiddenLoading:false, //默认开启loading
    previewHidden: true,
  },
  // 绘制圆角矩形
  yuanjiaoJuxing: function (ctx){
    
  },
  canvasshare:function(id,name){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var todayTime = M +'月' + D+'日';
    var width;
    wx.getSystemInfo({
      success: function (res) {
        width = res.windowWidth;
      }
    })
    var _this = this;
    // 实况天气
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxcurrent?id=' + id,
      method: 'get',
      success: function (res) { 
        if (res.data != null) {
          // 实况空气质量
          wx.request({
            url: 'https://m.weatherol.com.cn/xcxac?id=' + id,
            method: 'get',
            success: function (datas) {
              if (datas.data == null) {
                
              } else if (datas.data.aQI == "—") {
                
              } else {
                _this.huitu(id,res, datas, width, name, todayTime, _this);
              }
            },
            fail: function (res) {
            },
            complete: function (res) {
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
  huitu: function (id,res, datas, width, name, todayTime, _this){
    wx.request({
      url: 'https://m.weatherol.com.cn/getXcxfximg',
      method: 'get',
      success: function (shareimg) {
        // 如果有预警就显示预警信息
        console.log(shareimg);
        wx.request({
          url: 'https://m.weatherol.com.cn/xcxalert?id='+id,
          method:'get',
          success:function(yujing){
            console.log(yujing);
            var context = wx.createCanvasContext('myCanvas');
            var bgImg = shareimg.data.bcimg;//背景图
            // var bgImg = "https://m.weatherol.com.cn/img/bg.jpg";
            var wxMa = '../../../image/sharelogo.png';//小程序码
            //这个地方的图片是需要注意，图片需要下载不然，手机上不能正常显示
            if (width < 376) {
              context.drawImage(bgImg, 0, 0, 300, 460);
              context.drawImage(wxMa, 80, 410, 100, 35);
            } else {
              context.drawImage(bgImg, 0, 0, 320, 460);
              context.drawImage(wxMa, 100, 410, 100, 35);
            }
            var shiKuang = res.data.feelTemperature + '°';//这是要绘制的文本
            var tianqi = res.data.weatherDecoder;
            var aqi = '空气质量 ' + datas.data.aQI_level;
            var aqiyanse = datas.data.aQI_level_color;
            context.setFillStyle("#ffffff");
            context.setFontSize(34);
            context.setFillStyle("#ffffff");
            context.fillText(shiKuang, 20, 60, 400, 60);
            context.setFontSize(14);
            context.setFillStyle("#ffffff");
            context.fillText(tianqi, 85, 60, 400, 60);
            context.setFillStyle(aqiyanse);
            if (datas.data.aQI_level.length == 1) {
              context.fillRect(20, 70, 82, 16);
            } else if (datas.data.aQI_level.length == 2) {
              context.fillRect(20, 70, 92, 16);
            } else if (datas.data.aQI_level.length == 4) {
              context.fillRect(20, 70, 125, 16);
            }
            context.setFontSize(14);
            context.setFillStyle("#ffffff");
            context.fillText(aqi, 22, 84, 400, 60);
            context.setFontSize(14);
            context.setFillStyle("#000");
            if(yujing.data != null){
              // 预警框
              context.setFillStyle(yujing.data[0].color);
              // 预警信息
              var yujing = yujing.data[0].type + yujing.data[0].level + '预警';
              if (yujing.length > 6) {
                context.fillRect(20, 96, 100, 16);
              }else{
                context.fillRect(20, 96, 82, 16);
              }
              context.setFontSize(12);
              context.setFillStyle("#ffffff");
              
              context.fillText(yujing, 22, 110, 400, 60);
            }
            context.setFillStyle("#999999");
            var text = shareimg.data.describe;//这是要绘制的文本
            var chr = text.split("");//这个方法是将一个字符串分割成字符串数组
            var temp = "";
            var row = [];
            for (var a = 0; a < chr.length; a++) {
              if (width < 376) {
                if (context.measureText(temp).width < 155) {
                  temp += chr[a];
                }
                else {
                  a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
                  row.push(temp);
                  temp = "";
                }
              } else {
                if (context.measureText(temp).width < 200) {
                  temp += chr[a];
                }
                else {
                  a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
                  row.push(temp);
                  temp = "";
                }
              }
            }
            row.push(temp);
            //如果数组长度大于2 则截取前两个
            if (row.length > 2) {
              var rowCut = row.slice(0, 2);
              var rowPart = rowCut[1];
              var test = "";
              var empty = [];
              for (var a = 0; a < rowPart.length; a++) {
                if (context.measureText(test).width < 220) {
                  test += rowPart[a];
                }
                else {
                  break;
                }
              }
              empty.push(test);
              var group = empty[0] + "..."//这里只显示两行，超出的用...表示
              rowCut.splice(1, 1, group);
              row = rowCut;
            }
            for (var b = 0; b < row.length; b++) {
              context.fillText(row[b], 10, 350 + b * 30, 410);
            }
            context.setFontSize(12);
            context.setFillStyle("#999999");
            if (width < 376) {
              context.fillText(name, 235, 350, 400, 60);
            } else {
              context.fillText(name, 275, 350, 400, 60);
            }
            context.setFontSize(12);
            context.setFillStyle("#999999");
            if (width < 376) {
              context.fillText(todayTime, 230, 370, 400, 60);
              context.setFillStyle("#dedede");
              context.fillRect(10, 400, 265, 1);
            } else {
              context.fillText(todayTime, 260, 370, 400, 60);
              context.setFillStyle("#dedede");
              context.fillRect(10, 400, 292, 1);
            }

            context.draw();
            _this.setData({
              hiddenLoading: true
            })
          }
        }) 
      }
    })
  },
  share: function () {
    var that = this
    wx.showLoading({
      title: '努力生成中...'
    })
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 318,
      height: 460,
      destWidth: 318,
      destHeight: 460,
      canvasId: 'myCanvas',
      success: function (res) {
        that.setData({
          preurl: res.tempFilePath,
          previewHidden: false,
        });
        that.save();
        wx.hideLoading()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  save: function () {
    var that = this
    // 生产环境时 记得这里要加入获取相册授权的代码
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              // 用户已经同意小程序相册功能，后续调用 wx.saveImageToPhotosAlbum 接口不会弹窗询问
              that.startSaveImage()
            }
          })
        } else {
          that.startSaveImage()
        }
      }
    })
  },
  startSaveImage: function () {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: that.data.preurl,
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好哒',
          confirmColor: '#72B9C3',
          success: function (res) {
            if (res.confirm) {
              that.setData({
                previewHidden: true
              })
            }
          }
        })
      }
    })
  },
  onLoad: function (options) {
    var _this = this;
    _this.canvasshare(options.id, options.name);
    wx.setNavigationBarTitle({
      title: "分享到朋友圈",
    })
  }
})