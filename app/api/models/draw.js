import {
  HTTP
} from '../http.js'

class DrawModel extends HTTP {

  draw(amount, openid) {
    return this.request({
      url: 'miniapp/marketer/withdraw',
      method: 'POST',
      data: {
        amount: amount,
        openId: openid
      }
    })
  }

}

export {
  DrawModel
}