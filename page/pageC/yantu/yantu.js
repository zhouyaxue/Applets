Page({
  data: {
    time:''
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: "沿途天气",
    })
  },
  onShareAppMessage: function () {
    return {
      title: '沿途天气',
      path: '/page/pageC/yantu/yantu'
    }
  }
})