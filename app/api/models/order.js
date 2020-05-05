import {
  HTTP
} from '../http.js'

class OrderModel extends HTTP {

  getOrder() {
    return this.request({
      url: 'order/mine'
    })
  }

}

export {
  OrderModel
}