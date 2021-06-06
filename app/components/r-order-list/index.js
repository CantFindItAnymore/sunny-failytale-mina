import { OrderModel } from '../../api/models/order'
const Order = new OrderModel()


import { ShopModel } from '../../api/models/shop'
const Shop = new ShopModel()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: ['待付款', '待发货',  '待收货', '已完成', '已取消']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e) {
      wx.navigateTo({
        url: '/pages/goods-detail/index?gid=' + e.currentTarget.dataset.id
      })
    },

    handleDetail(e) {
      wx.navigateTo({
        url: '/pages/order-detail/index?orderId=' + e.currentTarget.dataset.id
      })
    },

    handleBuyNow(e) {

      Shop.pay({
        orderNo: e.currentTarget.dataset.code,
        orderId: e.currentTarget.dataset.id,
        totalFee: (e.currentTarget.dataset.realprice)*100
        // totalFee: '2'
      })
        .then(res => {
          const _this = this
          wx.requestPayment({
            timeStamp: res.timestamp.toString(),
            nonceStr: res.nonceStr,
            package: res.packageValue,
            signType: 'MD5',
            paySign: res.paySign,
            success () {
              let timer = setTimeout(() => {
                Shop.checkPay(e.currentTarget.dataset.code)
                  .then(() => {
                    clearTimeout(timer)
                    wx.redirectTo({
                      url: '/pages/buy-suc/index?oid=' + e.currentTarget.dataset.id
                    })
                  })
              }, 1000)
            },
            fail (res) {
              console.log(res)
            }
          })
        })
    },
    handleCancel(e) {
      Order.cancelOrder(e.currentTarget.dataset.id)
        .then(() => {
          wx.showToast({
            title: '取消订单成功',
            icon: 'none',
            duration: 2000
          })

          this.triggerEvent('refresh', {}, {})
        })
    },
    handleLook(e) {
      wx.navigateTo({
        url: '/pages/log/index?expressCode=' + e.currentTarget.dataset.expressCode
      })
    },

    handleSureGot(e) {
      Order.sureGotOrder(e.currentTarget.dataset.id)
        .then(() => {
          wx.showToast({
            title: '确认收货成功',
            icon: 'none',
            duration: 2000
          })

          this.triggerEvent('refresh', {}, {})
        })
    },

    handleComment(e) {
      wx.setStorageSync('commentSkuList', e.currentTarget.dataset.skuList)
      wx.navigateTo({
        url: '/pages/comment/index?orderId=' + e.currentTarget.dataset.id
      })
    },
    handleRefund(e) {
      wx.navigateTo({
        url: `/pages/refund/index?type=${e.currentTarget.dataset.type}&orderId=${e.currentTarget.dataset.id}`
      })
    },
    handleExchange(e) {
      wx.navigateTo({
        url: `/pages/refund/index?type=${e.currentTarget.dataset.type}&orderId=${e.currentTarget.dataset.id}`
      })
    },
  }
})
