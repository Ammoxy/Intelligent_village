var api = require('../../api/index')

var user = {}

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
                var res = response.data;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

module.exports = user;