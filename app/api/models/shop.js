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
    skuId,
    productType
  }) {
    return this.request({
      url: 'cart/add',
      method: 'POST',
      data: {
        addPrice,
        count,
        productId,
        skuId,
        productType
      }
    })
  }


  place({
    address,
    carriage,
    couponId=null,
    couponPrice=null,
    couponUserId=null,
    leaveWord=null,
    realPrice,
    skuList,
    totalPrice
  }) {
    return this.request({
      url: 'order/place',
      method: 'POST',
      data: {
        address,
        carriage,
        couponId,
        couponPrice,
        couponUserId,
        leaveWord,
        realPrice,
        skuList,
        totalPrice
      }
    })
  }

  //pay
  pay({
    orderNo,
    orderId,
    totalFee
  }) {
    return this.request({
      url: 'wechat/pay/evoke-pay',
      method: 'POST',
      data: {
        orderNo,
        orderId,
        totalFee
      }
    })
  }

  checkPay(orderNo) {
    return this.request({
      url: 'wechat/pay/pay-query',
      method: 'POST',
      data: {
        orderNo
      }
    })
  }

  refundOrExchange({
    orderId,
    reason,
    type
  }) {
    return this.request({
      url: 'order/returns/apply',
      method: 'POST',
      data: {
        agree,
        expressCode,
        expressCompanyName,
        id,
        orderId,
        reason,
        rejectReason,
        returnsPrice,
        type
      }
    })
  }

  cancelOrder(id) {
    return this.request({
      url: 'order/cancel/' + id
    })
  }
}

export {
  ShopModel
}