/*
 * charts for WeChat small app v1.0
 *
 * https://github.com/xiaolin3303/wx-charts
 * 2016-11-28
 *
 * Designed and built with all the love of Web
 */
"use strict";
function assign(t, e) {
  if (null == t) throw new TypeError("Cannot convert undefined or null to object");
  for (var i = Object(t), a = 1; a < arguments.length; a++) {
    var n = arguments[a];
    if (null != n)
      for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (i[o] = n[o])
  }
  return i
}
function findRange(t, e, i) {
  if (isNaN(t)) throw new Error("[wxCharts] unvalid series data!");
  i = i || 10, e = e ? e : "upper";
  for (var a = 1; i < 1;) i *= 10, a *= 10;
  for (t = "upper" === e ? Math.ceil(t * a) : Math.floor(t * a); t % i !== 0;) "upper" === e ? t++ : t--;
  return t / a
}
function calRotateTranslate(t, e, i) {
  var a = t,
    n = i - e,
    o = a + (i - n - a) / Math.sqrt(2);
  o *= -1;
  var r = (i - n) * (Math.sqrt(2) - 1) - (i - n - a) / Math.sqrt(2);
  return {
    transX: o,
    transY: r
  }
}
function convertCoordinateOrigin(t, e, i) {
  return {
    x: i.x + t,
    y: i.y - e
  }
}
function avoidCollision(t, e) {
  if (e)
    for (; util.isCollision(t, e);) t.start.x > 0 ? t.start.y-- : t.start.x < 0 ? t.start.y++ : t.start.y > 0 ? t.start.y++ : t.start.y--;
  return t
}
function fillSeriesColor(t, e) {
  var i = 0;
  return t.map(function (t) {
    return t.color || (t.color = e.colors[i], i = (i + 1) % e.colors.length), t
  })
}
function getDataRange(t, e) {
  var i = 0,
    a = e - t;
  return i = a >= 1e4 ? 1e3 : a >= 1e3 ? 100 : a >= 100 ? 10 : a >= 10 ? 5 : a >= 1 ? 1 : a >= .1 ? .1 : .01, {
    minRange: findRange(t, "lower", i),
    maxRange: findRange(e, "upper", i)
  }
}
function mesureText(t) {
  t = String(t);
  var t = t.split(""),
    e = 0;
  return t.forEach(function (t) {
    e += /[a-zA-Z]/.test(t) ? 7 : /[0-9]/.test(t) ? 5.5 : /\./.test(t) ? 2.7 : /-/.test(t) ? 3.25 : /[\u4e00-\u9fa5]/.test(t) ? 10 : /\(|\)/.test(t) ? 3.73 : /\s/.test(t) ? 2.5 : /%/.test(t) ? 8 : 10
  }), e
}
function dataCombine(t) {
  return t.reduce(function (t, e) {
    return (t.data ? t.data : t).concat(e.data)
  }, [])
}
function calCategoriesData(t, e, i) {
  var a = {
    angle: 0,
    xAxisHeight: i.xAxisHeight
  },
    n = getXAxisPoints(t, e, i),
    o = n.eachSpacing,
    r = t.map(function (t) {
      return mesureText(t)
    }),
    s = Math.max.apply(this, r);
  return s + 2 * i.xAxisTextPadding > o && (a.angle = 45 * Math.PI / 180, a.xAxisHeight = 2 * i.xAxisTextPadding + s * Math.sin(a.angle) + i.padding), a
}
function getPieDataPoints(t) {
  var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
    i = 0,
    a = 0;
  return t.forEach(function (t) {
    i += t.data
  }), t.forEach(function (t) {
    t._proportion_ = t.data / i * e
  }), t.forEach(function (t) {
    t._start_ = a, a += 2 * t._proportion_ * Math.PI
  }), t
}
function getPieTextMaxLength(t) {
  t = getPieDataPoints(t);
  var e = 0;
  return t.forEach(function (t) {
    var i = t.format ? t.format(+t._proportion_.toFixed(2)) : util.toFixed(100 * t._proportion_) + "%";
    e = Math.max(e, mesureText(i))
  }), e
}
function fixColumeData(t, e, i, a, n) {
  return t.map(function (t) {
    return t.width = (e - 2 * n.columePadding) / i, t.width = Math.min(t.width, 25), t.x += (a + .5 - i / 2) * t.width, t
  })
}
function getXAxisPoints(t, e, i) {
  var a = i.yAxisWidth + i.yAxisTitleWidth,
    n = e.width - 2 * i.padding - a,
    o = n / t.length,
    r = [],
    s = i.padding + a,
    l = e.width - i.padding;
  return t.forEach(function (t, e) {
    r.push(s + e * o)
  }), r.push(l), {
      xAxisPoints: r,
      startX: s,
      endX: l,
      eachSpacing: o
    }
}
function getDataPoints(t, e, i, a, n, o, r) {
  var s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 1,
    l = [],
    h = o.height - 2 * r.padding - r.xAxisHeight - r.legendHeight;
  return t.forEach(function (t, d) {
    var c = {};
    c.x = a[d] + Math.round(n / 2);
    var x = h * (t - e) / (i - e);
    x *= s, c.y = o.height - r.xAxisHeight - r.legendHeight - Math.round(x) - r.padding, l.push(c)
  }), l
}
function getYAxisTextList(t, e, i) {
  var a = dataCombine(t),
    n = "number" == typeof e.yAxis.min ? e.yAxis.min : Math.min.apply(this, a),
    o = Math.max.apply(this, a);
  if (n === o) {
    var r = o || 1;
    n -= r, o += r
  }
  for (var s = getDataRange(n, o), l = s.minRange, h = s.maxRange, d = [], c = (h - l) / i.yAxisSplit, x = 0; x <= i.yAxisSplit; x++) d.push(l + c * x);
  return d.reverse()
}
function calYAxisData(t, e, i) {
  var a = getYAxisTextList(t, e, i),
    n = i.yAxisWidth,
    o = a.map(function (t) {
      return t = util.toFixed(t, 2), t = e.yAxis.format ? e.yAxis.format(Number(t)) : t, n = Math.max(n, mesureText(t) + 5), t
    });
  return e.yAxis.disabled === !0 && (n = 0), {
    rangesFormat: o,
    ranges: a,
    yAxisWidth: n
  }
}
function drawPointShape(t, e, i, a) {
  a.beginPath(), a.setStrokeStyle("rgba(0,0,0,0)"), a.setLineWidth(0.5), a.setFillStyle(e), "diamond" === i ? t.forEach(function (t, e) {
    a.moveTo(t.x, t.y - 4.5), a.lineTo(t.x - 4.5, t.y), a.lineTo(t.x, t.y + 4.5), a.lineTo(t.x + 4.5, t.y), a.lineTo(t.x, t.y - 4.5)
  }) : "circle" === i ? t.forEach(function (t, e) {
    a.moveTo(t.x + 3.5, t.y), a.arc(t.x, t.y, 4, 0, 2 * Math.PI, !1)
  }) : "rect" === i ? t.forEach(function (t, e) {
    a.moveTo(t.x - 3.5, t.y - 3.5), a.rect(t.x - 3.5, t.y - 3.5, 7, 7)
  }) : "triangle" === i && t.forEach(function (t, e) {
    a.moveTo(t.x, t.y - 4.5), a.lineTo(t.x - 4.5, t.y + 4.5), a.lineTo(t.x + 4.5, t.y + 4.5), a.lineTo(t.x, t.y - 4.5)
  }), a.closePath(), a.fill(), a.stroke()
  
}
function drawPointText(t, e, i, a) {
  var n = e.data;
  //此处setfillstyle为设置每个点上字体颜色
  a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle("#ffffff"), t.forEach(function (t, i) {
    var o = e.format ? e.format(n[i]) : n[i];
    //此处为设置点的字体位置
    a.fillText(o, t.x - mesureText(o) / 4, t.y + e.position);
  }), a.closePath(), a.stroke()
}
function drawYAxisTitle(t, e, i, a) {
  var n = i.xAxisHeight + (e.height - i.xAxisHeight - mesureText(t)) / 2;
  a.save(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle("#FFFFFF"), a.translate(0, e.height), a.rotate(-90 * Math.PI / 180), a.fillText(t, n, i.padding + .5 * i.fontSize), a.stroke(), a.closePath(), a.restore()
}
function drawLineDataPoints(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
    o = calYAxisData(t, e, i),
    r = o.ranges,
    s = getXAxisPoints(e.categories, e, i),
    l = s.xAxisPoints,
    h = s.eachSpacing,
    d = r.pop(),
    c = r.shift();
  t.forEach(function (t, o) {
    var r = t.data,
      s = getDataPoints(r, d, c, l, h, e, i, n);
    if (a.beginPath(), a.setStrokeStyle(t.color), a.setLineWidth(1), a.moveTo(s[0].x, s[0].y), s.forEach(function (t, e) {
      e > 0 && a.lineTo(t.x, t.y)
    }), a.moveTo(s[0].x, s[0].y), a.closePath(), a.stroke(), e.dataPointShape !== !1) {
      var x = i.dataPointShape[o % i.dataPointShape.length];
      drawPointShape(s, t.color, x, a)
    }
  }), e.dataLabel !== !1 && 1 === n && t.forEach(function (t, o) {
    var r = t.data,
      s = getDataPoints(r, d, c, l, h, e, i, n);
    drawPointText(s, t, i, a)
  })
}
function drawXAxis(t, e, i, a) {
  var n = getXAxisPoints(t, e, i),
    o = n.xAxisPoints,
    r = n.startX,
    s = n.endX,
    l = n.eachSpacing,
    h = e.height - i.padding - i.xAxisHeight - i.legendHeight,
    d = h + i.xAxisLineHeight;
  //最底部横线（刻度尺颜色）
  a.beginPath(), a.setStrokeStyle("rgba(0,0,0,0)"), a.setLineWidth(0.5), a.moveTo(r, h), a.lineTo(s, h), e.xAxis.disableGrid !== !0 && o.forEach(function (t, e) {
    a.moveTo(t, h), a.lineTo(t, d)
    //setFillStyle("rgba(255,255,255,0)")为设置表格最底部x轴字体颜色
  }), a.closePath(), a.stroke(), 0 === i._xAxisTextAngle_ ? (a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle("rgba(0,0,0,0)"), t.forEach(function (t, e) {
    var n = l / 2 - mesureText(t) / 2;
    a.fillText(t, o[e] + n, h  + i.fontSize + 5)
  }), a.closePath(), a.stroke()) : t.forEach(function (t, n) {
    a.save(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle("rgba(0,0,0,0)");
    var r = mesureText(t),
      s = l / 2 - r,
      d = calRotateTranslate(o[n] + l / 2, h + i.fontSize / 2 + 5, e.height),
      c = d.transX,
      x = d.transY;
    a.rotate(-1 * i._xAxisTextAngle_), a.translate(c, x), a.fillText(t, o[n] + s, h + i.fontSize + 5), a.closePath(), a.stroke(), a.restore()
  })
}
function drawYAxis(t, e, i, a) {
  if (e.yAxis.disabled !== !0) {
    for (var n = calYAxisData(t, e, i), o = n.rangesFormat, r = i.yAxisWidth + i.yAxisTitleWidth, s = e.height - 2 * i.padding - i.xAxisHeight - i.legendHeight, l = Math.floor(s / i.yAxisSplit), h = i.padding + r, d = e.width - i.padding, c = (i.padding, e.height - i.padding - i.xAxisHeight - i.legendHeight), x = [], g = 0; g < i.yAxisSplit; g++) x.push(i.padding + l * g);
    // a.setStrokeStyle("rgba(0,0,0,0)")设置横向刻度线颜色
    a.beginPath(), a.setStrokeStyle("rgba(0,0,0,0)"), a.setLineWidth(1), x.forEach(function (t, e) {
      a.moveTo(h, t), a.lineTo(d, t)
      //
    }), a.closePath(), a.stroke(), a.beginPath(), a.setFontSize(i.fontSize), a.setFillStyle("rgba(0,0,0,0)"), o.forEach(function (t, e) {
      var n = x[e] ? x[e] : c;
      a.fillText(t, i.padding + i.yAxisTitleWidth, n + i.fontSize / 2)
    }), a.closePath(), a.stroke(), e.yAxis.title && drawYAxisTitle(e.yAxis.title, e, i, a)
  }
}
function drawLegend(t, e, i, a) {
  if (e.legend) {
    var n = 5,
      o = 0;
    t.forEach(function (t) {
      t.name = t.name || "undefined", o += 2 * n + mesureText(t.name) + 22.5
    });
    var r = (e.width - o) / 2 + n,
      s = e.height - i.legendHeight - 5;
    a.setFontSize(i.fontSize), t.forEach(function (t) {
      switch (e.type) {
        case "line":
          a.beginPath(), a.moveTo(r - 2, s + 5), a.lineTo(r + 17, s + 5), a.stroke(), a.closePath(), a.beginPath(), a.setFillStyle("rgba(0,0,0,0)"), a.moveTo(r + 7.5, s + 5), a.arc(r + 7.5, s + 5, 4, 0, 2 * Math.PI), a.fill(), a.stroke(), a.closePath();
          break;
        case "pie":
        case "ring":
          a.beginPath(), a.setFillStyle(t.color), a.moveTo(r + 7.5, s + 5), a.arc(r + 7.5, s + 5, 7, 0, 2 * Math.PI), a.closePath(), a.fill();
          break;
        default:
          a.beginPath(), a.setFillStyle(t.color), a.moveTo(r, s), a.rect(r, s, 15, 10), a.closePath(), a.fill()
      }
      r += n + 15, a.beginPath(), a.setFillStyle("rgba(0,0,0,0)"), a.closePath(), a.stroke(), r += mesureText(t.name) + n + 7.5
    })
  }
}
function drawPieDataPoints(t, e, i, a) {
  var n = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1;
  t = getPieDataPoints(t, n);
  var o = {
    x: e.width / 2,
    y: (e.height - i.legendHeight) / 2
  },
    r = Math.min(o.x - i.pieChartLinePadding - i.pieChartTextPadding - i._pieTextMaxLength_, o.y - i.pieChartLinePadding - i.pieChartTextPadding);
  r -= e.dataLabel ? 10 : 2 * i.padding, t.forEach(function (t) {
    a.beginPath(), a.setLineWidth(1), a.setStrokeStyle("#ffffff"), a.setFillStyle(t.color), a.moveTo(o.x, o.y), a.arc(o.x, o.y, r, t._start_, t._start_ + 2 * t._proportion_ * Math.PI), a.closePath(), a.fill(), a.stroke()
  }), "ring" === e.type && (a.beginPath(), a.setFillStyle("#ffffff"), a.moveTo(o.x, o.y), a.arc(o.x, o.y, .6 * r, 0, 2 * Math.PI), a.closePath(), a.fill()), e.dataLabel !== !1 && 1 === n && drawPieText(t, e, i, a, r, o)
}
function drawCanvas(t, e) {
  e.draw();
  var that = this;
  wx.canvasToTempFilePath({
    canvasId: 'lineGraph',
    success: function (res) {
      var tempFilePath = res.tempFilePath;
    },
    fail: function (res) {
      //console.log(res);
    }
  });
}
function Animation(t) {
  function e(a) {
    if (null === a) return t.onProcess && t.onProcess(1), void (t.onAnimationFinish && t.onAnimationFinish());
    if (null === o && (o = a), a - o < t.duration) {
      var r = (a - o) / t.duration,
        s = Timing[t.timing];
      r = s(r), t.onProcess && t.onProcess(r), n(e, i)
    } else t.onProcess && t.onProcess(1), t.onAnimationFinish && t.onAnimationFinish()
  }
  t.duration = "undefined" == typeof t.duration ? 1e3 : t.duration, t.timing = t.timing || "linear";
  var i = 17,
    a = function () {
      return "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : "undefined" != typeof setTimeout ? function (t, e) {
        setTimeout(function () {
          var e = +new Date;
          t(e)
        }, e)
      } : function (t) {
        t(null)
      }
    },
    n = a(),
    o = null;
  n(e, i)
}
function drawCharts(t, e, i, a) {
  var n = e.series,
    o = e.categories;
  n = fillSeriesColor(n, i);
  var r = calYAxisData(n, e, i),
    s = r.yAxisWidth;
  if (i.yAxisWidth = s, o && o.length) {
    var l = calCategoriesData(o, e, i),
      h = l.xAxisHeight,
      d = l.angle;
    i.xAxisHeight = h, i._xAxisTextAngle_ = d
  }
  "pie" !== t && "ring" !== t || (i._pieTextMaxLength_ = getPieTextMaxLength(n));
  var c = e.animation ? 1e3 : 3;
  switch (t) {
    case "line":
      Animation({
        timing: "",
        duration: c,
        onProcess: function (t) {
          drawYAxis(n, e, i, a), drawXAxis(o, e, i, a), drawLineDataPoints(n, e, i, a, t), drawLegend(e.series, e, i, a), drawCanvas(e, a)
        }
      });
      break;
    case "column":
      Animation({
        timing: "",
        duration: c,
        onProcess: function (t) {
          drawYAxis(n, e, i, a), drawXAxis(o, e, i, a), drawColumnDataPoints(n, e, i, a, t), drawLegend(e.series, e, i, a), drawCanvas(e, a)
        }
      });
      break;
    case "area":
      Animation({
        timing: "",
        duration: c,
        onProcess: function (t) {
          drawYAxis(n, e, i, a), drawXAxis(o, e, i, a), drawAreaDataPoints(n, e, i, a, t), drawLegend(e.series, e, i, a), drawCanvas(e, a)
        }
      });
      break;
    case "ring":
    case "pie":
      Animation({
        timing: "",
        duration: c,
        onProcess: function (t) {
          drawPieDataPoints(n, e, i, a, t), drawLegend(e.series, e, i, a), drawCanvas(e, a)
        }
      })
  }
}
var config = {
  yAxisWidth: 30,//y轴线距离右边的距离
  yAxisSplit: 3,//x轴线条的数量(数值越大线条越多)
  xAxisHeight: 80,//
  xAxisLineHeight: 50,
  legendHeight: 50,
  yAxisTitleWidth: 30,
  padding: 10,
  fontSize: 12,
  dataPointShape: ["circle", "", "circle", "circle"],
  // 设置折线颜色
  colors: ["rgba(255,255,255,0)", "#39b3fc", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
},
  util = {
    toFixed: function (t, e) {
      return e = e || 2, this.isFloat(t) && (t = t.toFixed(e)), t
    },
    isFloat: function (t) {
      return t % 1 !== 0
    },
    isSameSign: function (t, e) {
      return Math.abs(t) === t && Math.abs(e) === e || Math.abs(t) !== t && Math.abs(e) !== e
    },
    isSameXCoordinateArea: function (t, e) {
      return this.isSameSign(t.x, e.x)
    },
    isCollision: function (t, e) {
      t.end = {}, t.end.x = t.start.x + t.width, t.end.y = t.start.y - t.height, e.end = {}, e.end.x = e.start.x + e.width, e.end.y = e.start.y - e.height;
      var i = e.start.x > t.end.x || e.end.x < t.start.x || e.end.y > t.start.y || e.start.y < t.end.y;
      return !i
    }
  },
  Timing = {
    easeIn: function (t) {
      return Math.pow(t, 3)
    },
    easeOut: function (t) {
      return Math.pow(t - 1, 3) + 1
    },
    easeInOut: function (t) {
      return (t /= .5) < 1 ? .5 * Math.pow(t, 3) : .5 * (Math.pow(t - 2, 3) + 2)
    },
    linear: function (t) {
      return t
    }
  },
  Charts = function (t) {
    t.yAxis = t.yAxis || {}, t.xAxis = t.xAxis || {}, t.legend = t.legend !== !1, t.animation = t.animation !== !1;
    var e = assign({}, config);
    e.legendHeight = t.legend ? e.legendHeight : 0, e.yAxisTitleWidth = t.yAxis.disabled !== !0 && t.yAxis.title ? e.yAxisTitleWidth : 0, e.pieChartLinePadding = t.dataLabel === !1 ? 0 : e.pieChartLinePadding, e.pieChartTextPadding = t.dataLabel === !1 ? 0 : e.pieChartTextPadding;
    var i = wx.createCanvasContext(t.canvasId);
    drawCharts(t.type, t, e, i)
  };
module.exports = Charts;