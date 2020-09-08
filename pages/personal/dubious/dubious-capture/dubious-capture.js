let danger = require('../../../../model/danger/danger')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      danger_id: '',
      dangerFaceLogsList: null,
      images: [], // 人脸照片组
      catImages: [], // 抓拍照片组
  },

  onLoad: function (opt) {
    this.setData({
      danger_id: opt.danger_id
    });
    this.getDangerFaceLogs();
    wx.showToast({
      title: '获取数据中',
      icon: 'loading',
      duration: 10000
    })
  },

  getDangerFaceLogs() {
    let self = this;
    danger.dangerFaceLogs(wx.getStorageSync('token'), 1, 100, '').then(res => {
      self.setData({
        dangerFaceLogsList: res.data.data
      });
      res.data.data.forEach(item => {
        if(item.danger.href) {
          self.data.images.push(item.danger.href)
        }
        if(item.log.image) {
          self.data.catImages.push(item.log.image)
        }
      })
    })
  },

  // 预览人脸照片
  preview(e) {
    let self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.image, // 当前显示图片的http链接
      urls: self.data.images // 需要预览的图片http链接列表
    })
  },

    // 预览抓拍照片
    catPreview(e) {
      let self = this;
      wx.previewImage({
        current: e.currentTarget.dataset.catimage, // 当前显示图片的http链接
        urls: self.data.catImages // 需要预览的图片http链接列表
      })
    }

 
})