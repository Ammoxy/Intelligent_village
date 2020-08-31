// pages/personal/snap/snap/snap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateBegin: '', // 开始时间
    dateEnd: '', // 结束时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  // 抓拍记录
  toRecord() {
    var self = this;
    wx.navigateTo({
      url: '../../snap/record/record',
    })
  },

  bindBegin(e) {
    var self = this;
    console.log(e);
    self.setData({
      dateBegin: e.detail.value
    })
  },
  bindEnd(e) {
    var self = this;
    self.setData({
      dateEnd: e.detail.value
    })
  },

  search() {
    var self = this;
    if (self.data.dateBegin && self.data.dateEnd) {
      console.log(111);
    } else {
      wx.showToast({
        icon: "none",
        title: '请选择时间',
      })
    }
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