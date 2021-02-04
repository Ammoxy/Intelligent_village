let app = getApp();
Page({

  data: {
    
  },

  toDevice() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../personal/access/access/access?station_id=' + app.globalData.userInfo.station_id,
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
        url: '../personal/rent/rent/rent?station_id=' + app.globalData.userInfo.station_id,
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
        url: '../personal/school/school/school?station_id=' + +app.globalData.userInfo.station_id,
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
        url: '../personal/access/access/access?area_id=' + e.detail.value,
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
        url: '../personal/dubious/dubious-capture/dubious-capture'
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