// pages/personal/rent/rent/rent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toRenter() {
      wx.navigateTo({
        url: '../renter/renter',
      })
  }
})