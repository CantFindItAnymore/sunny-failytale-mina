import { ShopModel } from "../../api/models/shop"
const Shop = new ShopModel()

// pages/refund/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: '/imgs/selected.png',
    unSelected: '/imgs/unSelected.png',
    comment: '',
    orderId: '',
    commentSkuList: [],
    activeSku: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { orderId } = options
    this.setData({
      orderId
    })

    let commentSkuList = wx.getStorageSync('commentSkuList')
    if (commentSkuList.length === 1) {
      commentSkuList.map(item => {
        item.nowIsSelect = true
      })
      const activeSku = commentSkuList[0]
      this.setData({
        activeSku
      })
    } else {
      commentSkuList.map(item => {
        item.nowIsSelect = false
      })
    }
    this.setData({
      commentSkuList
    })
  },

  handleInput(e) {
    console.log(e.detail)
    this.setData({
      comment:e.detail
    })
  },

  switchSelected(e) {

    let commentSkuList = this.data.commentSkuList
    let activeSku = this.data.activeSku
    if (commentSkuList.length === 1) {
      return
    } else {
      commentSkuList[e.currentTarget.dataset.index].nowIsSelect = !commentSkuList[e.currentTarget.dataset.index].nowIsSelect

      commentSkuList[e.currentTarget.dataset.index].nowIsSelect === true && (activeSku = commentSkuList[e.currentTarget.dataset.index])

      commentSkuList.map((item, index) => {
        if (index !== e.currentTarget.dataset.index) {
          item.nowIsSelect = false
        }
      })

      this.setData({
        commentSkuList,
        activeSku
      })
    }
  },

  handleRefund() {
    Shop.comment({
      orderId: this.data.orderId,
      comment: this.data.comment,
      productId: this.data.activeSku.productId,
      skuId: this.data.activeSku.skuId
    })
      .then(() => {
        wx.showToast({
          title: `评价成功`,
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