// pages/personal/dubious/dubious/dubious.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    showFoot: false,
    hasMore: true, // 还有数据, 上拉加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 获取数据
  getData() {
    var self = this;
    // wx.showLoading({
    //   title: '加载中...',
    // })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  toDubiousInfo() {
    wx.navigateTo({
      url: '../dubious-info/dubious-info',
    })
  },

  toCapture() {
    wx.navigateTo({
      url: '../dubious-capture/dubious-capture',
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
    if (this.data.hasMore) {
      this.setData({
        page: this.data.page + 1
      })
      this.getData(this.data.cateid)
    } else {
      this.setData({
        showFoot: true
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})