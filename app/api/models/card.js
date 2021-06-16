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

  checkCard({
    invalidTime,
    productTypes,
    skuList,
    validPrice,
    validTime
  }) {
    return this.request({
      url: 'coupon/user/verify-useable',
      method: 'POST',
      data: {
        invalidTime,
        productTypes,
        skuList,
        validPrice,
        validTime
      }
    })
  }

}

export {
  CardModel
}