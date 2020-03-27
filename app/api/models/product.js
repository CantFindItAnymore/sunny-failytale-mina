import {
  HTTP
} from '../http.js'

class ProductModel extends HTTP {
  getList() {
    return this.request({
      url: 'api-product/product/page',
      type: 'json',
      data: {
        "page": 1,
        "size": 10
      }
    })
  }

}

export {
  ProductModel
}