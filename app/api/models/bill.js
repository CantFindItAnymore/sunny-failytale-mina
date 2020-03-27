import {
  HTTP
} from '../http.js'

class BillModel extends HTTP {

  getBill(kind) {
    return this.request({
      url: 'miniapp/marketer/commissionBill',
      method: 'POST',
      data: {
        type: kind
      }
    })
  }

}

export {
  BillModel
}