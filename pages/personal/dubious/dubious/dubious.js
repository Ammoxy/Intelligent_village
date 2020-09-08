let danger = require('../../../../model/danger/danger')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dangerFaceList: null
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDangerFace()
  },

  // 获取可疑人脸信息
  getDangerFace() {
    let self = this;
    danger.dangerFace(wx.getStorageSync('token'), 1, 100).then(res => {
      self.setData({
        dangerFaceList: res.data.data
      })
    })
  },

  // 获取抓拍记录
  toCapture(e) {
    wx.navigateTo({
      url: '../dubious-capture/dubious-capture?danger_id=' + e.currentTarget.dataset.id
    })
  }

})