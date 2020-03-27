import {
  HTTP
} from '../http.js'

class SearchModel extends HTTP {
  getAllCompony() {
    return this.request({
      url: 'api-user/admin/company/all',
      method: 'get'
      // type: 'json',
      // data: {
      //   companyHealth: 0
      // }
    })
  }

  getMyCustomList() {
    return this.request({
      url: 'api-user/admin/company/user/list'
    })
  }

  getMaterial(productId, componyId) {
    return this.request({
      url: `api-product/product/select/${productId}/${componyId}`,
    })
  }

}

export {
  SearchModel
}