let address = require('../../../../model/address/address')
Page({

  data: {
    page: 1,
    deviceList: [],
    station_id: '',

    address_name: '', // 地址搜索
  },
  onLoad(opt) {
    this.setData({
      station_id: opt.station_id
    });
    this.getDevices();
  },

  // onShow() {
  //   this.getDevices();
  // },

  getDevices() {
    let self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    address.stationRelations(wx.getStorageSync('token'), self.data.station_id, '', self.data.address_name, self.data.page, 25).then(res => {
      if (res.data.data.length > 0) {
        self.setData({
          deviceList: self.data.deviceList.concat(res.data.data)
        })
      } else {
        wx.showToast({
          title: '暂无更多数据',
          icon: 'none'
        })
      }
    })
  },
  toDevice(e) {
    console.log(e)
    wx.navigateTo({
      url: '../access-device/access-device?address_id=' + e.currentTarget.dataset.addressid,
    })
  },

  onReachBottom() {
    console.log('上拉')

    var self = this;
    var page = self.data.page + 1; //获取当前页数并+1
    self.setData({
      page: page, //更新当前页数
    })
    self.getDevices(); //重新调用请求获取下一页数据
  },

  // 搜索地址
  addressNameBlur(e) {
    let self = this;
    console.log(e)
    self.setData({
      address_name: e.detail.value
    })
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    address.stationRelations(wx.getStorageSync('token'), self.data.station_id, '', self.data.address_name, self.data.page, 25).then(res => {
      self.data.deviceList = [];
      if (res.data.data.length > 0) {
        self.setData({
          deviceList: self.data.deviceList.concat(res.data.data)
        })
      } else {
        wx.showToast({
          title: '暂无更多数据',
          icon: 'none'
        })
      }
    })
  },
})