import {
  HTTP
} from '../http.js'

class LogModel extends HTTP {

  log(username, password) {
    return this.request({
      url: 'oauth',
      method: 'POST',
      data: {
        username: username,
        password: password
      }
    })
  }

  getKey(phone) {
    return this.request({
      url: 'tob/rest/user/sms',
      method: 'POST',
      data: {
        mobile: phone,
        type: 'miniapp'
      }
    })
  }

}

export {
  LogModel
}