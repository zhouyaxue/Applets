Page({
  data: {
    hiddenLoading: false,
    jiebie: '',
    tixing: '',
    bg: '',
    baike: '',
    tianqi: '',
    wendu: '',
    fengji: '',
    richuriluo: '',
    bgg: ''
  },
  about: function () {
    wx.navigateTo({ url: '../../pageC/about/about' })
  },
  yijian: function () {
    wx.navigateTo({ url: '../../pageC/yijian/yijian' })
  },
  onLoad: function (options) {
    console.log(options);
    wx.setNavigationBarTitle({
      title: options.name,
    })
    var that = this;
    var baike = ["穿衣指数是贴近人们生活的气象指标，在四季不同的季节里，人们会通过不同的天气条件而选择穿衣薄厚，穿衣指数这时候就起到了提醒的作用，提请人们根据天气变化而进行换装，减少疾病的发生，尤其是感冒。", "洗车指数是指过去12小时和未来48小时有无雨雪天气，路面是否有积雪和泥水，是否容易使汽车溅上泥水，是否有沙尘等天气条件，给广大爱车族提供是否适宜洗车和建议。洗车指数共分为4级，级数越高，就越不适宜洗车。", "紫外线指数是指一天当中太阳在天空中的位置最高时（也即中午前后），到达地面的太阳光线中紫外线辐射对人体皮肤的可能损伤程度。紫外线指数一般用0－15表示。通常规定，夜间紫外线指数为0，在热带或高原地区、晴天无云时，紫外线最强，指数为15。可见紫外线指数值越大，表示紫外线辐射对人体危害越大，也表示在较短时间内对皮肤的伤害愈强。","骑车指数是考虑气象因素和骑行的影响，包括天气现象线，风力、温度等综合条件，为广大用户提供当前时段骑车建议，骑车指数分为4级，级数越高越不适宜。", "跑步指数是考虑气象因素和对人体的影响，包括紫外线，风力、温度等综合条件，为广大用户提供当前时段跑步建议，跑步指数分为4级，级数越高越不适宜。", "感冒指数是气象部门就气象条件对人们发生感冒的影响程度，根据当日温度、湿度、风速、天气现象、温度日较差等气象因素提出来的，以便市民们，特别是儿童、老人等易发人群可以在关注天气预报的同时，用感冒指数来确定感冒发生的几率和衣服的增减及活动的安排等。", "钓鱼指数是根据气象因素对垂钓的影响程度，提取出影响垂钓的主要气象因素：温度、风速、天气现象、温度日变化等，进行综合考虑计算得出，利用钓鱼指数人们可以选择合适的水域，在有利于钓鱼的气象条件下垂钓。","晨练指数是气象部门根据气象因素对晨练人身体健康的影响，综合了温度、风速、天气现象、前一天的降水情况等气象条件，并将一年分为两个时段(冬半年和夏半年)，制定了晨练环境气象要素标准，晨练的人特别是中老年人，应根据晨练指数，有选择地进行晨练，这样才能保证身体不受外界不良气象条件的影响，真正达到锻炼身体的目的。"]
    wx.request({
      url: 'https://m.weatherol.com.cn/getgjIndexsTypeData?type=' + options.type + '&id=' + options.id,
      method: 'get',
      dataType: 'json',
      success: function (res) {
        console.log(res.data);
        wx.setStorage({
          key: "type",
          data: options.type
        })
        wx.setStorage({
          key: "cityid",
          data: options.id
        })
        that.setData({
          jiebie: res.data[0].level,
          tixing: res.data[0].content,
          bgg: "zhishu_" + res.data[0].type,
          bg: 'newzhishu_' + res.data[0].type
        })
        console.log(baike);
        var jibies = res.data.level;
        var types = res.data.type;
        if (res.data[0].type == "ct") {
          that.setData({
            baike: baike[0],
          })
        } else if (res.data[0].type == "xc") {
          that.setData({
            baike: baike[1],
            bgg: "xcxxiche/1"
          })
        } else if (res.data[0].type == "uv") {
          that.setData({
            baike: baike[2],
          })
        } else if (res.data[0].type == "qc") {
          that.setData({
            baike: baike[3],
          })
        } else if (res.data[0].type == "pb") {
          that.setData({
            baike: baike[4],
          })
        } else if (res.data[0].type == "gm") {
          that.setData({
            baike: baike[5],
          })
        } else if (res.data[0].type == "dy") {
          that.setData({
            baike: baike[6],
          })
        } else if (res.data[0].type == "cl") {
          that.setData({
            baike: baike[7],
          })
        }
        // 实况天气
        wx.request({
          url: 'https://m.weatherol.com.cn/getgjCurrentData?id=' + options.id,
          method: 'get',
          success: function (res) {
            console.log(res.data);
            that.setData({
              hiddenLoading: true,
              wendu: res.data.temp,
              tianqi: res.data.iconDecoder,
              fengji: res.data.wDirDecoder,
              richuriluo: res.data.rise + '/' + res.data.set
            })
            var wendu = res.data.temp;
            // var wendu = "30";
            if (types == "ct") {
              var img = [
                { 0: "1-1", 1: "1-2", 2: "1-3" },
                { 0: "2-1", 1: "2-2", 2: "2-3" },
                { 0: "3-1", 1: "3-2", 2: "3-3" },
                { 0: "4-1", 1: "4-2", 2: "4-3" },
                { 0: "5-1", 1: "5-2", 2: "5-3" },
                { 0: "6-1", 1: "6-2", 2: "6-3" }
              ]
              var shuzi = [1, 2, 3];
              var len = shuzi.length;
              var i = Math.ceil(Math.random() * (len)) % len;
              if (jibies == "天气微凉") {//舒适
                that.setData({
                  bgg: "img/xcxChuanyi/4-2.jpg"
                })
              } else if (jibies == "天气稍热") { //较舒适
                that.setData({
                  bgg: 'img/xcxChuanyi/5-3.jpg'
                })
              } else if (jibies == "天气炎热") { //炎热
                that.setData({
                  bgg: 'img/xcxChuanyi/5-2.jpg'
                })
              } else if (jibies == "气温较低") { //炎热
                that.setData({
                  bgg: 'img/xcxChuanyi/1-2.jpg'
                })
              } else if (jibies == "温度极低") { //较冷
                that.setData({
                  bgg: 'img/xcxChuanyi/1-1.jpg'
                })
              }
            }
            if (types == "pp") {
              var img = [1, 2, 3, 4, 5, 6, 7, 8]
              var len = img.length;
              var i = Math.ceil(Math.random() * (len)) % len;
              that.setData({
                bgg: "hufu/" + img[i]
              })
            }
            if (types == "yd") {
              var shuzi = [1, 2, 3, 4];
              var len = shuzi.length;
              var i = Math.ceil(Math.random() * (len)) % len;
              if (jibies == "较适宜") {
                var img = ["2-1", "2-2", "2-3", "2-4"];
                that.setData({
                  bgg: "xcxYundong/" + img[i]
                })
              }
              if (jibies == "较不宜") {
                var img = ["1-1"];
                that.setData({
                  bgg: "xcxYundong/" + img[i]
                })
              }
              if (jibies == "适宜") {
                var img = ["2-1", "2-2", "2-3", "2-4"];
                that.setData({
                  bgg: "xcxYundong/" + img[i]
                })
              }
            }
            if (types == "uv") {
              var shuzi = [1, 2];
              var len = shuzi.length;
              var i = Math.ceil(Math.random() * (len)) % len;
              that.setData({
                bgg: "xcxZiwaixian/" + shuzi[i]
              })
            }
            if (types == "xc") {
              var shuzi = [1, 2];
              var len = shuzi.length;
              var i = Math.ceil(Math.random() * (len)) % len;
              that.setData({
                bgg: "xcxxiche/" + shuzi[i]
              })
            }
          },
          fail: function (res) {
          },
          complete: function (res) {
          },
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
        that.setData({
          hiddenLoading: false
        })
      }
    })
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
    var type = wx.getStorageSync('type');
    var cityid = wx.getStorageSync('cityid');
    var path = '/page/pageC/zhishugj/zhishugj?id=' + cityid + '&type=' + type;
    return {
      title: "指数详情",
      path: path,
      success: function (res) {
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})