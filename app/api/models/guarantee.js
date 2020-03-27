import {
  HTTP
} from '../http.js'

class GuaranteeModel extends HTTP {
  regist(jsCode, encryptedData, iv) {
    return this.request({
      url: 'oauth/regist',
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
      url: 'oauth/openId/token',
      method: 'POST',
      data: {
        openId
      }
    })
  }

  getAreaList() {
    return this.request({
      url: 'api-user/area/all',
      method: 'POST'
    })
  }

}

export {
  GuaranteeModel
}