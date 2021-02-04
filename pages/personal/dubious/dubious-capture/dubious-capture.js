let danger = require('../../../../model/danger/danger')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    danger_id: '',
    dangerFaceLogsList: null,
    show_mark: false, // 显示遮罩
    address: '',
    danger_href: '',
    log_image: '',
    page: 1, // 分页
    total: 0, // 总数
    preBtn: false, // 禁用分页
    nextBtn: false, // 禁用分页
    inpPage: '', // 前往几页
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
    danger.dangerFaceLogs(wx.getStorageSync('token'), 1, 10, '').then(res => {
      self.setData({
        dangerFaceLogsList: res.data.data,
        total: parseInt(res.data.total / 10 + 1),
        page: 1,
        inpPage: 1
      });
      self.banNext(self.data.total); // 判断下一页按钮使用与否
      self.banPre(); // 页数为1上一页禁用
    })
  },

  // 查看详情
  showDetail(e) {
    console.log(e)
    this.setData({
      show_mark: true,
      address: e.currentTarget.dataset.address, // 抓拍地址
      danger_href: e.currentTarget.dataset.dangerhref, // 人脸照片
      log_image: e.currentTarget.dataset.logimage, // 抓拍原图
    })
  },
  // 人脸库照片预览
  dangerHrefPreview(e) {
    let self = this;
    wx.previewImage({
      current: self.data.danger_href, // 当前显示图片的http链接
      urls: [self.data.danger_href] // 需要预览的图片http链接列表
    })
  },
  // 图片预览
  preview(e) {
    let self = this;
    wx.previewImage({
      current: self.data.log_image, // 当前显示图片的http链接
      urls: [self.data.log_image] // 需要预览的图片http链接列表
    })
  },
  // 关闭查看详情
  close() {
    this.setData({
      show_mark: false
    })
  },

  // 上一页
  prePage() {
    let self = this;
    self.data.page = --self.data.page;
    self.setData({
      page: self.data.page,
      nextBtn: false
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    danger.dangerFaceLogs(wx.getStorageSync('token'), self.data.page, 10, '').then(res => {
      self.setData({
        dangerFaceLogsList: res.data.data,
        total: parseInt(res.data.total / 10 + 1),
        inpPage: self.data.page
      })

    })
    if (self.data.page == 1) {
      self.setData({
        preBtn: true
      })
    }
  },
  // 下一页
  nextPage() {
    let self = this;
    self.data.page = ++self.data.page;
    self.setData({
      page: self.data.page,
      preBtn: false
    })

    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    danger.dangerFaceLogs(wx.getStorageSync('token'), self.data.page, 10, '').then(res => {
      self.setData({
        dangerFaceLogsList: res.data.data,

        total: parseInt(res.data.total / 10 + 1),
        inpPage: self.data.page
      })
      self.banNext(self.data.total); // 判断下一页按钮使用与否
    })
  },
  // 前往几页
  toPage(e) {
    console.log(e)
    let self = this;
    self.setData({
      inpPage: e.detail.value
    });
    if (self.data.inpPage >= 1 && self.data.inpPage <= self.data.total) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 10000
      })
      if (self.data.inpPage == 1) {
        self.setData({
          preBtn: true
        })
      } else {
        self.setData({
          preBtn: false
        })
      }
      if (self.data.inpPage == self.data.total) {
        self.setData({
          nextBtn: true
        })
      }
      danger.dangerFaceLogs(wx.getStorageSync('token'), self.data.inpPage, 10, '').then(res => {
        self.setData({
          dangerFaceLogsList: res.data.data,
          total: parseInt(res.data.total / 10 + 1),
          page: self.data.inpPage
        })
        self.banNext(self.data.total); // 判断上下一页按钮使用与否
      })
    } else {
      wx.showToast({
        title: '请输入1到' + self.data.total + '之间的页数',
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 如果page 跟 total/10+1相等，下一页按钮就禁用
  banNext(val) {
    let self = this;
    if (self.data.page == val) {
      self.setData({
        nextBtn: true
      })
    } else {
      self.setData({
        nextBtn: false
      })
    }
  },

  // 页数为1，上一页禁用
  banPre(val) {
    let self = this;
    if (self.data.page == 1) {
      self.setData({
        preBtn: true
      })
    } else {
      self.setData({
        preBtn: false
      })
    }
  },




})