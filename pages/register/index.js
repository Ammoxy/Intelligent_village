// pages/register/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: '',
    phone: '',
    number: ''
  },

  nameInput(e) {
    this.data.name = e.detail.value;
  },
  passwordInput(e) {
    this.data.password = e.detail.value
  },
  phoneInput(e) {
    this.data.phone = e.detail.value  
  },
  numberInput(e) {
    this.data.number = e.detail.value
  },
  register() {
    if(this.data.name && this.data.password && this.data.phone && this.data.number) {
      wx.setStorageSync('name', this.data.name);
      wx.setStorageSync('number', this.data.number)

      wx.reLaunch({
        url: '/pages/personal/index/index',
      })
    } else {
      wx.showToast({
        title: '请补充完整信息',
        icon: 'none'
      })
    }
  },

  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  }
})