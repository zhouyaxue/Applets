var QQMapWX = require('../../../js/qqmap-wx-jssdk.min.js');//腾讯地图sdk
Page({
  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: false,
    // yijuhua:'正在加载',
    jingdu: '',
    wendu:'',
    jingweidu:'',
    newsid:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      newsid:options.id
    })
    wx.setStorage({
      key: "newsid",
      data: options.id
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
    var newsid = wx.getStorageSync("newsid");
    return {
      title: '点击查看新闻详情',
      path: '/page/pageB/news/news?id=' + newsid
    }}
})