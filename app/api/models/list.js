import {
  HTTP
} from '../http.js'

class ListModel extends HTTP {
  getGuaranteeList({userId, status=null, page=1, companyId, companyName, startDate, endDate}) {
    return this.request({
      url: 'api-order/guarantee/orders',
      method: 'POST',
      type: 'json',
      data: {
        userId,
        status,
        page,
        companyId,
        companyName,
        startDate,
        endDate
      }
    })
  }

  getLoanList({userId, status=null, page=1, companyId, companyName, startDate, endDate, repaymentStatus}) {
    return this.request({
      url: 'api-order/loan/list/page',
      method: 'POST',
      type: 'json',
      data: {
        userId,
        status,
        page,
        companyId,
        companyName,
        startDate,
        endDate,
        repaymentStatus
      }
    })
  }

  getGuaranteeListDetail( id ) {
    return this.request({
      url: 'api-order/guarantee/' + id
    })
  }

  getLoanListDetail(id) {
    return this.request({
      url: 'api-order/loan/detail/' + id
    })
  }

  getMaterial (id) {
    return this.request({
      url: 'api-order/grorder/list/' + id
    })
  }

  updateMaterial(grorderMaterials, orderId) {
    return this.request({
      url: 'api-order/grorder/updateMaterial',
      method: 'POST',
      type: 'json',
      data: {
        grorderMaterials,
        orderId
      }
    })
  }

  payUpload(orderId, paymentAmount, paymentPaths, productCategory) {
    return this.request({
      url: 'api-order/order/pay/payment',
      method: 'POST',
      type: 'json',
      data: {
        orderId,
        paymentAmount,
        paymentPaths,
        productCategory
      }
    })
  }

}

export {
  ListModel
}