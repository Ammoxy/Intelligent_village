var api = require('../../api/index')

var address = {}

// 获取辖区列表
address.stationRelations = function(token, station_id, type, address, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.StationRelations, {
            token: token,
            station_id: station_id,
            type: type,
            address: address,
            page: page,
            limit: limit
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


// 获取设备
address.devices = function(address_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.AddressDevices, {
            address_id: address_id
        }, function(response) {
            if(response.msg === 'ok') {
                var res = response.data
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 一键开门
address.openDoor = function(uuid) {
    return new Promise((resolve, reject) => {
        api.post(api.url.OpenDoor, {
            uuid: uuid,
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

module.exports = address;