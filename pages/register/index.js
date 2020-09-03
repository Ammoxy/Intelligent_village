let api = require('../../model/area/area');
let user = require('../../model/register/register');
let reg = require('../../utils/reg')
const qiniuUploader = require('../../utils/qiniu');
let app = getApp();

function getQiniuToken() {
  let options = {
    region: 'SCN',
    uptoken: '',
    uptokenURL: 'https://api.fengniaotuangou.cn/api/upload/token',
    uptokenFunc: function () {},
    domain: 'https://tu.fengniaotuangou.cn',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    name: '',
    password: '',
    phone: '',
    id_card: '',
    number: '',
    face_image: 'https://tu.fengniaotuangou.cn/tmp_fce0223cd644085c0c5f56d98327176ed8358371f6721238.jpg', // 人脸图片
    station_id: '',

    areaList: '', // 获取辖区列表
    area_index: '', // 下标
    area: '', // 辖区回显
    showCamera: false,
    cameraConfig: {
      flash: 'off',
      position: 'front'
    },
    isLogin: true, // 是否登录显示不同按钮
    open_face: true // 人脸开关显示
  },

  onLoad() {
    this.showCamera = false; //是否显示照相机
    this.cameraConfig = { //照相机参数配置
      flash: 'off',
      position: 'front'
    };
    this.getAreaList();
  },
  onShow() {
    if (wx.getStorageSync('token')) {
      this.setData({
        isLogin: false
      })
    }
    if (this.data.face_image) {
      wx.hideToast();
    }
  },

  // 获取辖区列表
  getAreaList() {
    let self = this;
    api.policeStations(1, 1000).then(res => {
      self.setData({
        areaList: res.data
      })
    })
  },

  changeArea(e) {
      this.setData({
        station_id: this.data.areaList[e.detail.value].id,
        area_index: e.detail.value
      });
  },

  nameInput(e) {
    this.data.name = e.detail.value;
  },
  passwordInput(e) {
    this.data.password = e.detail.value;
  },
  phoneInput(e) {
    this.data.phone = e.detail.value;
  },
  IDCardInput(e) {
    this.data.id_card = e.detail.value;
    // reg.reg(this.data.id_card)
  },
  numberInput(e) {
    this.data.number = e.detail.value;
  },
  register() {
    let self = this;
    self.data.face_image = 'https://tu.fengniaotuangou.cn/tmp_fce0223cd644085c0c5f56d98327176ed8358371f6721238.jpg';
    // 登录态为在线则是修改传id
    if (wx.getStorageSync('token')) {
      console.log('走修改');
      if (self.data.name && self.data.password && self.data.phone && self.data.id_card && self.data.number && self.data.face_image && self.data.station_id) {
        user.register(self.data.id, self.data.name, self.data.password, self.data.phone, self.data.face_image, self.data.id_card, self.data.number, self.data.station_id).then(res => {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            success: (res) => {
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/personal/index/index',
                })
              }, 2000)
            }
          })
        })
      } else {
        wx.showToast({
          title: '请补充完整信息',
          icon: 'none'
        })
      }
    } else {
      // 新增注册
      console.log('走注册');
      if (self.data.name && self.data.phone && self.data.id_card && self.data.number && self.data.face_image && self.data.station_id) {
        user.register(self.data.id, self.data.name, self.data.password, self.data.phone, self.data.face_image, self.data.id_card, self.data.number, self.data.station_id).then(res => {
          wx.showToast({
            title: '注册成功',
            icon: 'none',
            success: (res) => {
              setTimeout(() => {
                wx.reLaunch({
                  url: '/pages/personal/index/index',
                })
              }, 2000)
            }
          })
        })
      } else {
        wx.showToast({
          title: '请补充完整信息',
          icon: 'none'
        })
      }
    }
  },

  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },
  // 调用相机
  cameraDisable() {
    let self = this;
    self.showCamera = !self.showCamera;
    self.setData({
      showCamera: self.showCamera
    })
  },
  // 拍照
  takePhoto(e) {
    let self = this;
    getQiniuToken()
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'normal',
      success(res) {
        console.log(res)
        self.cameraDisable();
        wx.showToast({
          title: '上传中...',
          icon: 'loading',
          duration: 1000
        });
        qiniuUploader.upload(res.tempImagePath, res => {
          self.setData({
            face_image: res.fileURL
          })
        }, error => {
          wx.showModal({
            title: '错误提示',
            content: '上传失败！',
            showCancel: false,
            success: function (res) {}
          })
        })
      }
    })
  },
  // 显示隐藏相机
  cameraDisable: function () {
    console.log('隐藏相机')
    this.showCamera = !this.showCamera;
    this.setData({
      showCamera: this.showCamera
    })
  },
  // 照相机停止运行
  cameraStop: function (e) {
    console.log('相机停止运行')
    console.log(e)
    this.cameraDisable();
    app.showNone('相机停止运行')
  },
  // 照相机没授权
  cameraError: function (e) {
    var self = this;
    self.setData({
      showCamera: false
    })
    console.log(e)
    // app.showTip('相机错误')
    wx.showModal({
      title: '摄像头授权',
      content: '您未开启相机权限，无法上传照片，是否开启',
      cancelText: '取消',
      confirmText: '开启',
      success: function (res) {
        if (res.confirm) {
          wx.getSetting({
            success: (res) => {
              if (!res.authSetting['scope.camera']) {
                wx.authorize({
                  scope: 'scope.camera',
                  success: function () {
                    console.log('允许')
                  },
                  fail: function () {
                    console.log('拒绝')
                    wx.openSetting({
                      success: res => {
                        self.cameraDisable(); // 开启相机
                      }
                    })
                  }
                })
              }
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            icon: "none",
            title: '您未开启相机权限，无法上传照片,需要开启相机权限',
            duration: 4000,
            success: () => {
              self.setData({
                showCamera: false
              })
            }
          })
        }
      }
    })
  },
  // 切换闪光灯状态
  flashChange: function () {
    switch (this.cameraConfig.flash) {
      case 'off':
        this.cameraConfig.flash = 'on';
        break;
      case 'on':
        this.cameraConfig.flash = 'auto';
        break;
      case 'auto':
        this.cameraConfig.flash = 'off';
        break;
    }
    this.setData({
      cameraConfig: this.cameraConfig
    })
  },
  // 切换前后置摄像头
  positionChange() {
    console.log(111)

    switch (this.cameraConfig.position) {
      case 'front':
        this.cameraConfig.position = 'back';
        break;
      case 'back':
        this.cameraConfig.position = 'front';
        break;
    }
    console.log(111)

    this.setData({
      cameraConfig: this.cameraConfig
    })
  }
})