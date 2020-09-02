var user = require('../../../model/user');
var infomation = require('../../../model/personal/infomation');
var app = getApp();
var buy = require('../../../model/personal/buy')
var door = require('../../../model/personal/door')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    number: '',
    wxInfo: null,
    areaList: [{
      name: '辖区一',
      title: 1
    }, {
      name: '辖区二',
      title: 1
    }, {
      name: '辖区三',
      title: 1
    }, {
      name: '辖区四',
      title: 1
    }],
    area_id: ''
  },

  onLoad: function (options) {
    this.setData({
      name: wx.getStorageSync('name'),
      number: wx.getStorageSync('number')
    })
  },
  onShow() {},
  toLogin() {
    wx.navigateTo({
      url: "/pages/register/index"
    });
  },

  // 选择辖区
  rentChange(e) {
    console.log(e)
    wx.navigateTo({
      url: '../rent/rent/rent?area_id=' + e.detail.value,
    })
  },
  // 选择学校
  schoolChange(e) {
    wx.navigateTo({
      url: '../school/school/school?area_id=' + e.detail.value,
    })
  },
  // 选择门禁机
  accessChange(e) {
    wx.navigateTo({
      url: '../access/access/access?area_id=' + e.detail.value,
    })
  },
  // 可疑人脸
  toDubious() {
    wx.navigateTo({
      url: '../dubious/dubious/dubious'
    })
  },
})