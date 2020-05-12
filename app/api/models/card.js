import {
  HTTP
} from '../http.js'

class CardModel extends HTTP {

  getCard({
    current
  }) {
    return this.request({
      url: 'coupon/user/query-user-coupons',
      method: 'POST',
      data: {
        current
      }
    })
  }

}

export {
  CardModel
}