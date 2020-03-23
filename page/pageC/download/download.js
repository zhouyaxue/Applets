
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ios:{
      show:'hide'
    },
    android:{
      show:'hide'
    },
    friendbox:{
      show:'hide'
    },
    friendboxan:{
      show:'hide'
    },
    zhe:{
      show:'hide'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"下载app",
    });
    var context = wx.createCanvasContext('myCanvas');
    // var bgImg = "https://m.weatherol.com.cn/img/iosdownload.png";
    var bgImg = '../../../image/iosdownload.jpg';
    //这个地方的图片是需要注意，图片需要下载不然，手机上不能正常显示
    context.drawImage(bgImg, 0, 0, 250, 250);
    context.draw();


    var contextan = wx.createCanvasContext('myCanvasan');
    // var bgImgs = "https://m.weatherol.com.cn/img/androiddownload.png";
    var bgImgs = '../../../image/androiddownload.jpg';
    //这个地方的图片是需要注意，图片需要下载不然，手机上不能正常显示
    contextan.drawImage(bgImgs, 0, 0, 250, 250);
    contextan.draw();
  },
  ios:function(){
    var that = this;
    that.setData({
      friendbox:{
        show:'show'
      },
      zhe:{
        show:'show'
      }
    })
  },
  Android: function () {
    var that = this;
    that.setData({
      friendboxan: {
        show: 'show'
      },
      zhe: {
        show: 'show'
      }
    })
  },
  shareios:function(e){
    console.log(e);
    this.save(e.currentTarget.dataset.postId)
  },
  close:function(){
    var that = this;
    that.setData({
      friendbox:{
        show:'hide'
      },
      friendboxan:{
        show:'hide'
      },
      zhe:{
        show:'hide'
      }
    })
  },
  eventSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,

      success(res) {

        wx.showToast({

          title: '保存图片成功',

          icon: 'success',

          duration: 2000

        })

      }

    })

  },
  save: function (canvasId){
    var that = this;
    wx.canvasToTempFilePath({

      x: 0,

      y: 0,

      canvasId: canvasId,

      fileType: 'jpg',

      quality: 1,

      success: function (res) {
        that.setData({

          shareImage: res.tempFilePath

        })
        setTimeout(function () {
          wx.showModal({

            title: '提示',

            content: '将生成的二维码保存到手机相册，在微信里打开识别二维码去下载',

            success(res) {

              if (res.confirm) {

                that.eventSave()

              } else if (res.cancel) {

                console.log('用户点击取消')

              }

            }

          })

        }, 1000)

      }

    })
    },
  /** 
   * 滑动切换tab 
   */
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