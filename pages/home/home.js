
let info = require('../../model/information/information')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    information: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function () {
    this.getInformation();
  },
  // 获取资讯
  getInformation() {
    // let self = this;
    // info.information(wx.getStorageSync('token'), 1, 10).then(res => {
    //   self.setData({
    //     information: res.data.data
    //   })
    // })
  }
})