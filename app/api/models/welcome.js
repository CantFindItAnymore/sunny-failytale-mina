import {
  HTTP
} from '../http.js'

class WelcomeModel extends HTTP {
  regist(jsCode, encryptedData, iv) {
    return this.request({
      url: 'api-uaa/oauth/regist',
      method: 'POST',
      type: 'json',
      data: {
        jsCode,
        encryptedData,
        iv
      }
    })
  }

  getToken(openId) {
    return this.request({
      url: 'api-uaa/oauth/openId/token',
      method: 'POST',
      data: {
        openId
      }
    })
  }

  getUserInfoMiddleWare(username) {
    return this.request({
      url: 'api-admin/users/name',
      data: {
        username
      }
    })
  }

  getUserInfo() {
    return this.request({
      url: 'api-admin/users/current'
    })
  }

}

export {
  WelcomeModel
}