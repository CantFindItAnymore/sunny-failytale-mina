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
    ],
    refundInfo: {},
    expressCompanyName: '',
    expressCode: ''
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

    this._getRefundDetail()
  },

  _getRefundDetail() {
    Shop.getRefundInfo(this.data.orderId)
      .then(res=>{
        console.log('refund', res)
        this.setData({refundInfo: res})
      })
  },

  handleInput(e) {
    console.log(e.detail)
    this.setData({
      reason:e.detail
    })
  },

  handleExpressCompanyNameInput(e) {
    console.log(e.detail)
    this.setData({
      expressCompanyName:e.detail
    })
  },
  handleExpressCodeInput(e) {
    console.log(e.detail)
    this.setData({
      expressCode:e.detail
    })
  },

  handleSubmitExpress() {
    Shop.refundSubmitExpress({
      expressCode: this.data.expressCode,
      expressCompanyName:this.data.expressCompanyName,
      returnId: this.data.refundInfo.id
    })
      .then(() => {
        wx.showToast({
          title: `申请成功,请耐心等待`,
          icon: 'none',
          duration: 2000
        })

        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)
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
          title: `申请${typeText[this.data.type]}成功`,
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