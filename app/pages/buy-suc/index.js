// pages/buy-suc/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      oid: options.oid
    })
  },

  toShop() {
    wx.navigateTo({
      url: '/pages/shop/index'
    })
  },

  toOrder() {
    wx.navigateTo({
      url: '/pages/order-detail/index?oid='+ this.data.oid
    })
  }
})