const url = {
    'Login': '/police/login', // 手机号授权登录
    'Register': '/policeman', // 注册
    'Policeman': '/policeman', // 获取个人信息
    'Face': '/face', //上传人脸图像
    'Configs': '/configs', // 图像开关配置

    'PoliceStations': '/police/stations', // 获取公安辖区

    'Information': '/information', // 获取资讯信息 

    'StationRelations': '/station/relations', // 获取辖区地址,

    'StationDevices': '/station/devices', // 获取辖区设备

    'Device': '/device', // 获取单个设备

    'PoliceFaceLogs': '/police/face/logs', // 获取抓拍/进出记录

    'PoliceDangerFaces': '/police/danger/faces', //  获取可疑人脸
    'PoliceDangerFaceLogs': '/police/danger/face/logs', //  获取可疑人脸抓拍记录

    'FaceSwitch': '/face/switch', //  人脸开关

  
};

module.exports = url;