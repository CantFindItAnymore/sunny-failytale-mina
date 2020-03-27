import {
  HTTP
} from '../../http.js'

class HomeModel extends HTTP {

  getCreditList(companyId ) {
    return this.request({
      url: `api-order/credit/${companyId}`
    })
  }

  creditApply({companyId, companyName, productId, productName, userId}) {
    return this.request({
      url: 'api-order/credit/apply',
      method: 'POST',
      type:'json',
      data: {
        companyId,
        companyName,
        productId,
        productName,
        userId
      }
    })
  }

}

export {
  HomeModel
}