import {
  HTTP
} from '../http.js'

class ShopModel extends HTTP {

  getShop({productType=null, keyword=''}) {
    return this.request({
      url: 'product/page',
      method: 'POST',
      data: {
        productType,
        keyword
      }
    })
  }

}

export {
  ShopModel
}