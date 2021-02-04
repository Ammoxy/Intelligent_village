let address = require('../../../../model/address/address')


Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    rentAddressList: [],
    station_id: '',

    clickLocal: true,
    address: '广州市图巴诺信息科技有限公司',
    //地图开始的位置
    latitude:  22.93791,
    longitude: 113.34135,
    markers: [],

    uuid: '', // 当前出租屋设备的uuid
    uuidList: null,

    address_name: '', // 地址搜索

    open_face: true // 人脸开关显示
  },
  onLoad(opt) {
    this.setData({
      open_face: wx.getStorageSync('openFace'),
      station_id: opt.station_id
    });
    this.getRentAddress();
  },
  // 获取辖区出租地址
  getRentAddress() {
    let self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    address.stationRelations(wx.getStorageSync('token'), self.data.station_id, 'CZW', self.data.address_name, self.data.page, 23).then(res => {
      if (res.data.data.length > 0) {
        self.setData({
          rentAddressList: self.data.rentAddressList.concat(res.data.data)
        })
        for(let i = 0; i < self.data.rentAddressList.length; i++) {
          self.data.rentAddressList[i].clickLocal = false;
        }
        self.setData({
          rentAddressList: self.data.rentAddressList
        })
      } else {
        wx.showToast({
          title: '暂无更多数据',
          icon: 'none'
        })
      }
    })
  },
  // 查看地图定位
  viewMap(e) {
    let index = e.currentTarget.dataset.index;
    this.data.rentAddressList[index].clickLocal = !this.data.rentAddressList[index].clickLocal;
    console.log(this.data.rentAddressList[index])
    this.setData({
      rentAddressList: this.data.rentAddressList,
      address: this.data.rentAddressList[index].address.address,
      latitude:  this.data.rentAddressList[index].address.lat,
      longitude: this.data.rentAddressList[index].address.lng,
      markers: [{
        id: 0,
        iconPath: '../../../../icons/map.png',
        latitude: this.data.rentAddressList[index].address.lat,
        longitude: this.data.rentAddressList[index].address.lng,
        width: 30,
        height: 30,
        title: this.data.rentAddressList[index].address.address,
        anchor: {
            x: .5,
            y: 1
        },
        alpha: 1
      }]
    });

    // 获取当前出租屋的设备uuid
    address.devices(e.currentTarget.dataset.addressid).then(res => {
      console.log(this.data.uuidList)
      this.setData({
        uuid: res[0].uuid,
        uuidList: res
      })
    })
  },

  // 一键开门
  openDoor() {
    var self = this;
    address.openDoor(self.data.uuid).then(res => {
      wx.showToast({
        title: '开门成功',
        icon: 'none'
      })
    })
  },

  toRenter() {
    wx.navigateTo({
      url: '../renter/renter',
    })
  },

  onReachBottom() {
    console.log('上拉')

    var self = this;
    var page = self.data.page + 1; //获取当前页数并+1
    self.setData({
      page: page, //更新当前页数
    })
    self.getRentAddress(); //重新调用请求获取下一页数据
  },

  addressNameBlur(e) {
    let self = this;

    console.log(e)
    self.setData({
      address_name: e.detail.value
    })
    address.stationRelations(wx.getStorageSync('token'), self.data.station_id, 'CZW', self.data.address_name, self.data.page, 23).then(res => {
      self.data.rentAddressList = [];
      if (res.data.data.length > 0) {
        self.setData({
          rentAddressList: self.data.rentAddressList.concat(res.data.data)
        })
        for(let i = 0; i < self.data.rentAddressList.length; i++) {
          self.data.rentAddressList[i].clickLocal = false;
        }
        self.setData({
          rentAddressList: self.data.rentAddressList
        })
      } else {
        wx.showToast({
          title: '暂无更多数据',
          icon: 'none'
        })
      }
    })
  },
  // 搜索出租屋
  search(e) {
    let self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    address.stationRelations(wx.getStorageSync('token'), self.data.station_id, 'CZW', self.data.address_name, self.data.page, 23).then(res => {
      self.data.rentAddressList = [];
      if (res.data.data.length > 0) {
        self.setData({
          rentAddressList: self.data.rentAddressList.concat(res.data.data)
        })
        for(let i = 0; i < self.data.rentAddressList.length; i++) {
          self.data.rentAddressList[i].clickLocal = false;
        }
        self.setData({
          rentAddressList: self.data.rentAddressList
        })
      } else {
        wx.showToast({
          title: '暂无更多数据',
          icon: 'none'
        })
      }
    })
  }
})