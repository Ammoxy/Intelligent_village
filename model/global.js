var api = require('../api/index')
var global = {}
// 手机号登录
global.configs = function(switch_title, version) {
    return new Promise((resolve, reject) => {
        api.get(api.url.FaceSwitch, {
            switch_title: switch_title,
            version: version
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

module.exports = global;