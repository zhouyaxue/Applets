Page({
  data: {
    hiddenLoading: false,
    jiebie:'',
    tixing:'',
    bg:'',
    baike:'',
    tianqi:'',
    wendu:'',
    fengji:'',
    richuriluo:'',
    bgg:''
  },
  about: function () {
    wx.navigateTo({ url: '../../pageC/about/about' })
  },
  yijian: function () {
    wx.navigateTo({ url: '../../pageC/yijian/yijian' })
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.mingzi,
    })
    var that = this;
    var baike = ["穿衣指数是贴近人们生活的气象指标，在四季不同的季节里，人们会通过不同的天气条件而选择穿衣薄厚，穿衣指数这时候就起到了提醒的作用，提请人们根据天气变化而进行换装，减少疾病的发生，尤其是感冒。", "洗车指数是指过去12小时和未来48小时有无雨雪天气，路面是否有积雪和泥水，是否容易使汽车溅上泥水，是否有沙尘等天气条件，给广大爱车族提供是否适宜洗车和建议。洗车指数共分为4级，级数越高，就越不适宜洗车。", "紫外线指数是指一天当中太阳在天空中的位置最高时（也即中午前后），到达地面的太阳光线中紫外线辐射对人体皮肤的可能损伤程度。紫外线指数一般用0－15表示。通常规定，夜间紫外线指数为0，在热带或高原地区、晴天无云时，紫外线最强，指数为15。可见紫外线指数值越大，表示紫外线辐射对人体危害越大，也表示在较短时间内对皮肤的伤害愈强。", "化妆指数是根据气象条件对人的皮肤的影响制定出来的指数，主要影响有温度、湿度、风速、紫外线强度，根据不同的气象条件来采取不同的保护措施，如保湿、防晒、保湿防晒、去油、防脱水等等一系列的措施，以减少恶劣气象条件对皮肤的伤害", "运动指数是考虑气象因素和环境对人体的影响，包括紫外线、风力、气压、温度、光照以及雨雪沙尘等，为广大老百姓提供的是否适宜运动的建议。运动指数分为3级，级数越高，就越不适宜运动。", "感冒指数是气象部门就气象条件对人们发生感冒的影响程度，根据当日温度、湿度、风速、天气现象、温度日较差等气象因素提出来的，以便市民们，特别是儿童、老人等易发人群可以在关注天气预报的同时，用感冒指数来确定感冒发生的几率和衣服的增减及活动的安排等。","钓鱼指数是根据气象因素对垂钓的影响程度，提取出影响垂钓的主要气象因素：温度、风速、天气现象、温度日变化等，进行综合考虑计算得出，利用钓鱼指数人们可以选择合适的水域，在有利于钓鱼的气象条件下垂钓。"]
    wx.request({
      url: 'https://m.weatherol.com.cn/getIndexData?type='+options.type+'&id=' + options.id,
      method: 'get',
      dataType: 'json',
      success: function (res) {
        that.setData({
          jiebie: res.data.level,
          tixing: res.data.content,
          bgg:res.data.type
        })
        var jibies = res.data.level;
        var types = res.data.type;
        if (res.data.type == "ct"){
          that.setData({
            baike:baike[0],
            bg: "chuanyi",
          })
        } else if (res.data.type == "xc"){
          that.setData({
            baike: baike[1],
            bg: "zhishuicon_xc",
          })
        } else if (res.data.type == "uv") {
          that.setData({
            baike: baike[2],
            bg: "ziwaixian",
          })
        } else if (res.data.type == "pp") {
          that.setData({
            baike: baike[3],
            bg: "zhishu_huazhuang",
          })
        } else if (res.data.type == "yd") {
          that.setData({
            baike: baike[4],
            bg: "zhishu_yundong",
          })
        } else if (res.data.type == "gm") {
          that.setData({
            baike: baike[5],
            bg: "ganmao",
          })
        } else if (res.data.type == "dy") {
          that.setData({
            baike: baike[6],
            bg: "zhishu_dy",
          })
        }
        // 实况天气
        wx.request({
          url: 'https://m.weatherol.com.cn/xcxcurrent?id=' + options.id,
          method: 'get',
          success: function (res) {
            that.setData({
              hiddenLoading: true,
              wendu: res.data.temperature,
              tianqi: res.data.weatherDecoder,
              fengji: res.data.windPowerDecoder,
            })
            var wendu = res.data.temperature;
            // var wendu = "30";
            if (types == "ct"){
              var img = [
                  { 0: "1-1", 1: "1-2", 2: "1-3"},
                  { 0: "2-1", 1: "2-2", 2: "2-3" },
                  { 0: "3-1", 1: "3-2", 2: "3-3" },
                  { 0: "4-1", 1: "4-2", 2: "4-3" },
                  { 0: "5-1", 1: "5-2", 2: "5-3" },
                  { 0: "6-1", 1: "6-2", 2: "6-3" }
              ]
              var shuzi = [1,2,3];
              var len = shuzi.length;
              var i = Math.ceil(Math.random() * (len)) % len;
              if (jibies=="舒适") {//舒适
                that.setData({
                  bgg: "xcxChuanyi/"+img[5][i]
                })
              } else if (jibies == "较舒适") { //较舒适
                that.setData({
                  bgg: "xcxChuanyi/" +img[2][i]
                })
              } else if (jibies == "热") { //炎热
                that.setData({
                  bgg: "xcxChuanyi/" +img[4][i]
                })
              } else if (jibies == "炎热") { //炎热
                that.setData({
                  bgg: "xcxChuanyi/" + img[4][i]
                })
              } else if (jibies == "较冷"){ //较冷
                that.setData({
                  bgg: "xcxChuanyi/" +img[1][i]
                })
              } else if (jibies == "冷"){ //冷
                that.setData({
                  bgg: "xcxChuanyi/" +img[3][i]
                })
              } else if (jibies == "寒冷") { //寒冷
                that.setData({
                  bgg: "xcxChuanyi/" +img[0][i]
                })
              }
            }
            if (types == "pp") {
              var img = [1,2,3,4,5,6,7,8]
              var len = img.length;
              var i = Math.ceil(Math.random() * (len)) % len;
              that.setData({
                bgg: "hufu/" +img[i]
              })
            }
            if (types == "yd") {
              var shuzi = [1, 2, 3, 4];
              var len = shuzi.length;
              var i = Math.ceil(Math.random() * (len)) % len;
              if (jibies == "较适宜"){
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
      var that = this;
      wx.request({
        url: 'https://m.weatherol.com.cn/xcx15df?id=' + options.id,
        method: 'get',
        success: function (res) {
          that.setData({
            richuriluo:res.data[1].sunrise+'/'+res.data[1].sunset
          })
        },
        fail: function (res) {
        },
        complete: function (res) {
        },
      })
  },
  loadInfo: function (){
  },
  loadCity: function (longitude, latitude) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      hiddenLoading:true
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
    var type = wx.getStorageSync('type');
    console.log(cityid);
    console.log(type);
    var path = '/page/pageB/zhishuxq/zhishuxq?id=' + cityid + '&type=' + type;
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