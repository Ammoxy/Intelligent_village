// pages/personal/IT-MJ/IT-MJ/IT-MJ.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: ''
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
  // 详情--楼顶管理
  toBuilding() {
    var self = this;
    wx.navigateTo({
      url: '../building/building',
    })
  },
  bindKeyInput(e) {
    console.log(e.detail.value);
    var self = this;
    self.setData({
      keyword: e.detail.value
    })
  },
  // 搜索
  search() {
    var self = this;
    if (self.data.keyword) {
      console.log(111);
    } else {
      wx.showToast({
        icon: "none",
        title: '请输入地址',
      })
    }
    console.log(self.data.keyword);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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