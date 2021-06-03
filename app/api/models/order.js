import {
  HTTP
} from '../http.js'

class OrderModel extends HTTP {

  getOrder() {
    return this.request({
      url: 'order/mine'
    })
  }

  cancelOrder(id) {
    return this.request({
      url: 'order/cancel/' + id
    })
  }

  sureGotOrder(id) {
    return this.request({
      url: 'order/receipt/' + id
    })
  }

  getOrderDetail(id) {
    return this.request({
      url: 'order/details/' + id
    })
  }

}

export {
  OrderModel
}