var api = require('../../api/index')

var device = {}

// 获取辖区列表
device.stationDevice = function(token, page, limit, address_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.StationDevices, {
            token: token,
            page: page,
            limit: limit,
            address_id: address_id
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 获取单个设备
device.oneDevice = function (token, uuid) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Device, {
            token: token,
            uuid: uuid
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 获取抓拍/进出记录
device.faceLogs = function (token, page, limit, address_id, start, end) {
    return new Promise((resolve, reject) => {
        api.get(api.url.PoliceFaceLogs, {
            token: token,
            page: page,
            limit: limit,
            address_id: address_id,
            start: start,
            end: end
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

module.exports = device;