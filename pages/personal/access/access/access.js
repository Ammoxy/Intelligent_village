let address = require('../../../../model/address/address')
Page({

  data: {
    station_id: '',
  },
  onLoad(opt) {
    this.setData({
      station_id: opt.station_id
    });
    this.getDevices();
  },

  // onShow() {
  //   this.getDevices();
  // },

  getDevices() {
    let self = this;
    address.stationRelations(wx.getStorageSync('token'), self.data.station_id, '').then(res => {
      self.setData({
        deviceList: res.data.data
      })
    })
  },
  toDevice(e) {
    console.log(e)
    wx.navigateTo({
      url: '../access-device/access-device?address_id=' + e.currentTarget.dataset.addressid,
    })
  }
})