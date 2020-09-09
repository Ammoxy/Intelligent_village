let user = require('../../../model/user/user')
let app = getApp();
var global = require('../../../model/global');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
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
    area_id: '',
    open_face: true
  },

  onLoad: function (options) {
    if (wx.getStorageSync('token')) {
      this.getInfo();
    }
    // 开关配置
    var switch_name = '人脸开关';
    var version = '1.0.4';
    global.configs(switch_name, version).then(res => {
      wx.setStorageSync('openFace', res.data.switch_value == 1 ? true : false);
      this.setData({
        open_face: wx.getStorageSync('openFace')
      })
    })
  },
  onShow() {
    if (wx.getStorageSync('token')) {
      this.getInfo();
    }
  },

  // 获取个人信息
  getInfo() {
    let self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    if (wx.getStorageSync('token')) {
      user.info(wx.getStorageSync('token')).then(res => {
        app.globalData.userInfo = res.data;
        self.setData({
          userInfo: app.globalData.userInfo
        })
      })
    }
  },

  toLogin() {
    wx.navigateTo({
      url: "/pages/login/index"
    });
  },

  // 警员信息
  toInfomation() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: "/pages/register/index"
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }

  },

  toDevice() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../access/access/access?station_id=' + app.globalData.userInfo.station_id,
      });
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 选择出租屋
  toRent() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../rent/rent/rent?station_id=' + app.globalData.userInfo.station_id,
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
  toSchool(e) {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../school/school/school?station_id=' + +app.globalData.userInfo.station_id,
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
        url: '../dubious/dubious-capture/dubious-capture'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 2000
      })
    }
  },

  changeUser() {
    wx.removeStorageSync('token');
    app.globalData.userInfo = null;
    wx.reLaunch({
      url: '/pages/login/index',
    })
  }
})