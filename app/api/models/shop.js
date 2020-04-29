import {
  HTTP
} from '../http.js'

class ShopModel extends HTTP {

  getShop({ productType = null, keyword = '' }) {
    return this.request({
      url: 'product/page',
      method: 'POST',
      data: {
        productType,
        keyword
      }
    })
  }

  getDetail(id) {
    return this.request({
      url: 'product/details/front/' + id
    })
  }

  //根据商品ID获取SKU数据
  gwtShopSKU(id) {
    return this.request({
      url: 'product/sku/data/' + id
    })
  }

  getComment(id) {
    return this.request({
      url: 'product/comment/list/' + id
    })
  }

  // add
  addShopCar({
    addPrice,
    count,
    productId,
    skuId
  }) {
    return this.request({
      url: 'cart/add',
      method: 'POST',
      data: {
        addPrice,
        count,
        productId,
        skuId
      }
    })
  }

  // buy
  buy({
  }) {
    return this.request({
      url: 'order/place',
      method: 'POST',
      data: {
      }
    })
  }
}

export {
  ShopModel
}