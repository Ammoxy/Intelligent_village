let device = require('../../../../model/device/device') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_id: '',
    deviceList: []
  },

  onLoad: function (opt) {
    this.setData({
      address_id: opt.address_id
    });
    this.getDevice();
  },

  getDevice() {
    let self = this;
    device.stationDevice(wx.getStorageSync('token'), 1, 100, self.data.address_id).then(res => {
     self.setData({
      deviceList: res.data.data
     })
    })
  },

  // 查看设备信息
  toDeviceInfo(e) {
    wx.navigateTo({
      url: '../access-device-info/access-device-info?uuid=' + e.currentTarget.dataset.uuid,
    })
  },

  // 查看进出记录
  toInOutLogs(e) {
    var self = this;
    wx.navigateTo({
      url: '../access-device-inout/access-device-inout?address_id=' + e.currentTarget.dataset.addressid,
    })
  },
  // 抓拍记录
  toCapture() {
    var self = this;
    wx.navigateTo({
      url: '../access-device-capture/access-device-capture',
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})