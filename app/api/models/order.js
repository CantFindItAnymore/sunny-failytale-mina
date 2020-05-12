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

}

export {
  OrderModel
}