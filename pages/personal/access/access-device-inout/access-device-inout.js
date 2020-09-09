let device = require('../../../../model/device/device')
let dateTimePicker = require('../../../../utils/dateTimePicker');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address_id: '',
    faceLogsList: null,
    startTime: '', // 开始日期
    endTime: '', // 结束日期
    images: [], // 人脸照片
    page: 1, // 分页
    total: 0, // 总数
    preBtn: false, // 禁用分页
    nextBtn: false, // 禁用分页
    inpPage: '', // 前往几页
    // 日期选择
    startDateTimeArray: null,
    startDateTime: null,
    endDateTimeArray: null,
    endDateTime: null,
    startYear: 1970,
    endYear: 2050,
  },

  onLoad: function (opt) {
    this.setData({
      address_id: opt.address_id,
      inpPage: this.data.page
    });
    if (this.data.page == 1) {
      this.setData({
        preBtn: true
      })
    }
    this.getDevice();

    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);

    this.setData({
      startDateTime: obj.dateTime,
      startDateTimeArray: obj.dateTimeArray,
      endDateTime: obj.dateTime,
      endDateTimeArray: obj.dateTimeArray
    });
  },
  changeStartDateTime(e) {
    var self = this;
    self.setData({
      startDateTime: e.detail.value
    });
    var arr = self.data.startDateTime,
      dateArr = self.data.startDateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    self.setData({
      startDateTimeArray: dateArr,
      startDateTime: arr,
      startTime: self.data.startDateTimeArray[0][self.data.startDateTime[0]] + '-' + self.data.startDateTimeArray[1][self.data.startDateTime[1]] + '-' + self.data.startDateTimeArray[2][self.data.startDateTime[2]] + ' ' + self.data.startDateTimeArray[3][self.data.startDateTime[3]] + ':' + self.data.startDateTimeArray[4][self.data.startDateTime[4]] + ':' + self.data.startDateTimeArray[5][self.data.startDateTime[5]]
    });
  },
  changeEndDateTime(e) {
    var self = this;
    self.setData({
      endDateTime: e.detail.value
    });
    var arr = self.data.endDateTime,
      dateArr = self.data.endDateTimeArray;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    self.setData({
      endDateTimeArray: dateArr,
      endDateTime: arr,
      endTime: self.data.endDateTimeArray[0][self.data.endDateTime[0]] + '-' + self.data.endDateTimeArray[1][self.data.endDateTime[1]] + '-' + self.data.endDateTimeArray[2][self.data.endDateTime[2]] + ' ' + self.data.endDateTimeArray[3][self.data.endDateTime[3]] + ':' + self.data.endDateTimeArray[4][self.data.endDateTime[4]] + ':' + self.data.endDateTimeArray[5][self.data.endDateTime[5]]
    });
    let startDate = new Date(self.data.startTime).getTime();
    let endDate = new Date(self.data.endTime).getTime();
    if (endDate < startDate) {
      self.setData({
        startTime: self.data.endTime,
        endTime: self.data.startTime
      });
    }
    self.getDevice();
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
  },

  getDevice() {
    let self = this;
    device.faceLogs(wx.getStorageSync('token'), 1, 9, self.data.address_id, self.data.startTime, self.data.endTime).then(res => {
      // device.faceLogs(wx.getStorageSync('token'), 1, 8, 165, '2019-01-01 00:00:00', '2020-09-08 00:00:00').then(res => {
      self.setData({
        faceLogsList: res.data.data,
        total: parseInt(res.data.total / 10 + 1),
        page: 1,
        inpPage: 1
      })
      res.data.data.forEach(item => {
        if (item.image) {
          self.data.images.push(item.image);
        }
      })
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
    device.faceLogs(wx.getStorageSync('token'), self.data.page, 9, self.data.address_id, self.data.startTime, self.data.endTime).then(res => {

      // device.faceLogs(wx.getStorageSync('token'), self.data.page, 8, 165, '2019-01-01 00:00:00', '2020-09-08 00:00:00').then(res => {
      self.setData({
        faceLogsList: res.data.data,
        total: parseInt(res.data.total / 10 + 1),
        inpPage: self.data.page
      })

      res.data.data.forEach(item => {
        if (item.image) {
          self.data.images.push(item.image);
        }
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
    device.faceLogs(wx.getStorageSync('token'), self.data.page, 9, self.data.address_id, self.data.startTime, self.data.endTime).then(res => {
      // device.faceLogs(wx.getStorageSync('token'), self.data.page, 8, 165, '2019-01-01 00:00:00', '2020-09-08 00:00:00').then(res => {
      self.setData({
        faceLogsList: res.data.data,
        total: parseInt(res.data.total / 10 + 1),

        inpPage: self.data.page

      })
      if (self.data.page == self.data.total) {
        self.setData({
          nextBtn: true
        })
      }
      res.data.data.forEach(item => {
        if (item.image) {
          self.data.images.push(item.image);
        }
      })
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
      if(self.data.inpPage == self.data.total) {
        self.setData({
          nextBtn: true
        })
      }
      device.faceLogs(wx.getStorageSync('token'), self.data.inpPage, 9, self.data.address_id, self.data.startTime, self.data.endTime).then(res => {
        // device.faceLogs(wx.getStorageSync('token'), self.data.page, 8, 165, '2019-01-01 00:00:00', '2020-09-08 00:00:00').then(res => {
        self.setData({
          faceLogsList: res.data.data,
          total: parseInt(res.data.total / 10 + 1),

          page: self.data.inpPage
        })
        if (self.data.page == res.data.total) {
          self.setData({
            nextBtn: true
          })
        }
        res.data.data.forEach(item => {
          if (item.image) {
            self.data.images.push(item.image);
          }
        })
      })
    } else {
      wx.showToast({
        title: '请输入1到' + self.data.total + '之间的页数',
        icon: 'none',
        duration: 2000
      })
    }
  },

  // 预览人脸照片
  preview(e) {
    let self = this;
    wx.previewImage({
      current: e.currentTarget.dataset.image, // 当前显示图片的http链接
      urls: self.data.images // 需要预览的图片http链接列表
    })
  },
})