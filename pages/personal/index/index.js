var user = require('../../../model/user');
var infomation = require('../../../model/personal/infomation');
var app = getApp();
var buy = require('../../../model/personal/buy')
var door = require('../../../model/personal/door')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxInfo: null,
    areaList: [],
    area_id: ''
  },

  onLoad: function (options) {

    this.setData({
      
    })

  },
  onShow() {
    this.getPersonalInfo();
    

    this.setData({
      wxInfo: wx.getStorageSync('wxInfo'),
    })

    
  },
  getPersonalInfo() {
    
  },
  
  getUserInfo(e) {
    var self = this;
    wx.login({
      success(res) {
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            success: (res) => {
              console.log(code)
              console.log(res.iv)
              console.log(res.encryptedData)
              user.login(code, res.iv, res.encryptedData).then(res => {
                  wx.setStorage({
                      data: res.token,
                      key: 'token',
                  })
                  // 全局
                  var wxInfo = {
                      avatarUrl: res.info.avatarUrl,
                      nickName: res.info.nickName
                  };
                  wx.setStorageSync('wxInfo', wxInfo)
                  self.setData({
                      wxInfo: wxInfo
                  });
                
              })
            }
          })
        }
      }
    });
 
  },
  // 去个人信息
  toInfomation() {
    // if (!wx.getStorageSync('token')) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请先登录'
    //   })
    //   wx.removeStorageSync('wxInfo')
    // } else {
      wx.navigateTo({
        url: '../information/information/information'
      })
    // }
  },
  // 去可疑人脸
  toDubious() {
    var self = this
    // if (!wx.getStorageSync('token')) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请先登录'
    //   });
    //   wx.removeStorageSync('wxInfo')
    // } else {
    //   console.log('房屋管理', self.data.detailedAddress_id);
    //   console.log('房屋管理', self.data.typestring);

    //   wx.navigateTo({
    //     url: '../house/house/house?detailedAddress_id=' + self.data.detailedAddress_id + '&typestring=' + self.data.typestring
    //   })
    // }
    wx.navigateTo({
      url: '../dubious-face/dubious-face/dubious-face'
    })
  },

  // 去门禁机
  toIT_MJ() {
    var self = this;
    // if (!wx.getStorageSync('token')) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请先登录'
    //   });
    //   wx.removeStorageSync('wxInfo')
    // } else {
    //   var detailedAddress_id = self.data.detailedAddress_id
    //   var address = self.data.address;
    //   var room_id = self.data.room_id
    //   wx.navigateTo({
    //     url: '../infomation/children/children?detailedAddress_id=' + detailedAddress_id + '&address=' + address + '&room_id=' + room_id
    //   })
    // }
    wx.navigateTo({
      url: '../device/device'
    })
  },
  // 去抓拍抢
  choiceArea() {
    var self = this;
    // if (!wx.getStorageSync('token')) {
    //   wx.showToast({
    //     icon: "none",
    //     title: '请先登录'
    //   });
    //   wx.removeStorageSync('wxInfo')
    // } else {
      
    // }
    
  },

  // 去出租屋
  toLet() {
    var self = this;

    wx.navigateTo({
      url: '../lets/lets'
    })
  },

  // 去学校
  toSchool() {
    var self = this;

    wx.navigateTo({
      url: '../school/school'
    })
  },

})