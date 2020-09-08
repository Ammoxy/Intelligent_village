let device = require('../../../../model/device/device') 
Page({

    /**
     * 页面的初始数据
     */
    data: {
        uuid: '',
        deviceInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (opt) {
        this.setData({
            uuid: opt.uuid
          });
          this.getDevice();
    },

    getDevice() {
        let self = this;
        device.oneDevice(wx.getStorageSync('token'), self.data.uuid).then(res => {
          self.setData({
              deviceInfo: res.data
          })
        })
      },

   
})