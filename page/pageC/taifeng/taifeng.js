Page({
  data: {
    jingdu: '',
    wendu: '',
  },
  onLoad: function (options) {
    console.log(options);
    console.log(options.jing);
    console.log(options.weidu);
    console.log(options.id);
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
  onShareAppMessage: function () {
    return {
      title: '台风专题',
      path: '/page/pageC/taifeng/taifeng'
    }
  }
})