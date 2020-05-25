import { ShopModel } from "../../api/models/shop"
const Shop = new ShopModel()

// pages/refund/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reason: '',
    orderId: '',
    type: null,
    typeText: [
      '退货',
      '换货'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {orderId, type} = options
    this.setData({
      orderId,
      type
    })
  },

  handleRefund() {
    Shop.refundOrExchange({
      orderId: this.data.orderId,
      reason: this.data.reason,
      type: this.data.type
    })
      .then(() => {
        wx.showToast({
          title: `申请${this.data.type}成功`,
          icon: 'none',
          duration: 2000
        })

        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
      })
  }
})