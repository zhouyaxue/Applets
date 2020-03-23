
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "暴雨专题",
    })
    var that = this;
    if (options.jing == undefined && options.id != undefined) {
      that.setData({
        confifenID: {
          show: 'show'
        },
        confifen: {
          show: 'hide'
        },
        jingweidu: '?id=' + options.id
      })
    } else {
      that.setData({
        confifenID: {
          show: 'hide'
        },
        confifen: {
          show: 'show'
        },
        jingweidu: '?lng=' + options.jing + '&lat=' + options.weidu
      })
    }
  },
  /** 
   * 滑动切换tab 
   */

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

  }
})