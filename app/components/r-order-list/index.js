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
    handleBuyNow(e) {

      Shop.pay({
        orderNo: e.currentTarget.dataset.id,
        // totalFee: (e.currentTarget.dataset.realPrice)*100
        totalFee: 101
      })
        .then(res => {
          wx.requestPayment({
            timeStamp: res.timestamp.toString(),
            nonceStr: res.nonceStr,
            package: res.packageValue,
            signType: 'MD5',
            paySign: res.paySign,
            success () {
              wx.redirectTo({
                url: '/pages/buy-suc/index'
              })
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

    },
    handleComment(e) {
      wx.navigateTo({
        url: '/pages/comment/index'
      })
    },
  }
})
