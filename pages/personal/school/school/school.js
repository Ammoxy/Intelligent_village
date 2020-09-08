let address = require('../../../../model/address/address')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolList: [],
    station_id: '',
  },
  onLoad(opt) {
    this.setData({
      station_id: opt.station_id
    });
    this.getSchoolAddress();
  },
  // 获取辖区出租地址
  getSchoolAddress() {
    let self = this;
    address.stationRelations(wx.getStorageSync('token'), self.data.station_id, 'XX').then(res => {
      self.setData({
        schoolList: res.data.data
      })
    })
  },
  toSchool() {
    wx.navigateTo({
      url: '../school-info/school-info',
    })
  }
})