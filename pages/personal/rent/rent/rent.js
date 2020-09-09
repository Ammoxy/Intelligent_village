let address = require('../../../../model/address/address')
Page({

    /**
     * 页面的初始数据
     */
    data: {
      rentAddressList: [],
      station_id: '',
    },
    onLoad(opt) {
      this.setData({
        station_id: opt.station_id
      });
      this.getRentAddress();
    },
    // 获取辖区出租地址
    getRentAddress() {
      let self = this;
      address.stationRelations(wx.getStorageSync('token'), self.data.station_id, 'CZW').then(res => {
          self.setData({
            rentAddressList: res.data.data
          })
      })
    },
    toRenter() {
        wx.navigateTo({
          url: '../renter/renter',
        })
    }
})