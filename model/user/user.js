var api = require('../../api/index')

var user = {}

// 注册/修改
user.register = function(id, name, password, phone, face_image, id_card, number, station_id) {
    return new Promise((resolve, reject) => {
        api.post(api.url.Register, {
            id: id,
            name: name,
            password: password,
            phone: phone,
            face_image: face_image,
            id_card: id_card,
            number: number,
            station_id: station_id
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

user.changeUser = function (token, id, name, phone, face_image, id_card, number, station_id) {
    return new Promise((resolve, reject) => {
        api.post(api.url.Register, {
            token: token,
            id: id,
            name: name,
            phone: phone,
            face_image: face_image,
            id_card: id_card,
            number: number,
            station_id: station_id
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

// 登录
user.login = function(username, password) {
    return new Promise((resolve, reject) => {
        api.post(api.url.Login, {
            username: username,
            password: password
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

// 获取个人信息
user.info = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Policeman, {
            token: token
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

module.exports = user;