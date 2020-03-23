Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading:false,
    yujingimg:'',
    yujingneirong:'',
    yujingjiebie:'',
    yujingzhinan:'',
    config: {
      tipsshow: "show"
    },
    newTitle:'',
    yujingtime:'',
    configs:{
      color:''
    },
    bg:'bg'
  },
  about: function () {
    wx.navigateTo({ url: '../../pageC/about/about' })
  },
  yijian: function () {
    wx.navigateTo({ url: '../../pageC/yijian/yijian' })
  },
  newsXq:function(e){
    console.log(e);
    wx.navigateTo({ url: '../../pageB/news/news?id='+e.currentTarget.dataset.postId })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxalc?id=' + options.id,
      method: 'get',
      success: function (res) {
        console.log(res.data);
        if (res.data.level == "蓝色"){
          that.setData({
            configs:{
              color:'blue'
            }
          })
        } else if (res.data.level == "红色"){
          that.setData({
            configs: {
              color: 'red'
            }
          })
        } else if (res.data.level == "黄色") {
          that.setData({
            configs: {
              color: 'yellow'
            }
          })
        } else if (res.data.level == "橙色") {
          that.setData({
            configs: {
              color: 'orange'
            }
          })
        }
        that.setData({
          yujingimg: res.data.img,
          yujingneirong: res.data.content,
          yujingjibie: res.data.title,
          cityname: res.data.title,
          yujingtime: res.data.reportime
        })
        wx.setStorage({
          key: "yujing",
          data: res.data.title
        })
        var title = res.data.title;
        if (title.search("大风") != "-1"){
          that.newsList(17)
          that.setData({
            newTitle:'气象灾害防御系列之大风'
          })
        } else if (title.search("寒潮") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之寒潮'
          })
          that.newsList(16);
        } else if (title.search("暴雪") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之暴雪'
          })
          that.newsList(15);
        } else if (title.search("道路结冰") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之道路结冰'
          })
          that.newsList(23);
        } else if (title.search("台风") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之台风'
          })
          that.newsList(24);
        } else if (title.search("冰雹") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之冰雹'
          })
          that.newsList(25);
        } else if (title.search("高温") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之高温'
          })
          that.newsList(26);
        } else if (title.search("沙尘暴") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之沙尘暴'
          })
          that.newsList(27);
        } else if (title.search("雷电") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之雷电'
          })
          that.newsList(28);
        } else if (title.search("暴雨") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之暴雨'
          })
          that.newsList(29);
        } else if (title.search("大雾") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之大雾'
          })
          that.newsList(30);
        } else if (title.search("霾") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之霾'
          })
          that.newsList(31);
        } else if (title.search("霜冻") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之霜冻'
          })
          that.newsList(18);
        } else if (title.search("干旱") != "-1") {
          that.setData({
            newTitle: '气象灾害防御系列之干旱'
          })
          that.newsList(32);
        } else {
        }
        
        wx.setStorage({
          key: "yujingid",
          data: options.id
        })
      },
      fail: function (res) {
      },
      complete: function (res) {
      }
    })
    wx.request({
      url: 'https://m.weatherol.com.cn/xcxalfy?id='+options.id,
      method: 'get',
      success: function (res) {
        if(res.data != null){
          that.setData({
            config: {
              tipsshow: "show"
            },
            yujingzhinan: res.data.defense
          })
        } else if (res.data == null){
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
      }
    })
  },
  newsList:function(type){
    var that = this;
    wx.request({
      url: 'https://m.weatherol.com.cn/getWeatherNews?type='+ type +'&limit='+ 4,
      method:'get',
      success:function(res){
        console.log(res);
        if(res.data != "" && res.data != null){
          that.setData({
            newList:res.data
          })
        }
      }
    })
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
    var title = wx.getStorageSync('yujing');
    var cityname = wx.getStorageSync('cityname');
    var cityid = wx.getStorageSync('yujingid');
    var path = '/page/pageB/yujing/yujing?id=' + cityid + '&name=' + cityname;
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