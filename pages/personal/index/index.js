var app = getApp();

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
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../rent/rent/rent?area_id=' + e.detail.value,
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 选择学校
  schoolChange(e) {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../school/school/school?area_id=' + e.detail.value,
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 选择门禁机
  accessChange(e) {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../access/access/access?area_id=' + e.detail.value,
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 可疑人脸
  toDubious() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../dubious/dubious/dubious'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },
})