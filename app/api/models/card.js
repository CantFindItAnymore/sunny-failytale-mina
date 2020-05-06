import {
  HTTP
} from '../http.js'

class CardModel extends HTTP {

  getCard({
    current,
    status
  }) {
    return this.request({
      url: 'coupon/user/query-user-coupons',
      method: 'POST',
      data: {
        current,
        status
      }
    })
  }

}

export {
  CardModel
}