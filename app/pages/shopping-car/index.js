// pages/shopping-car/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: '/imgs/selected.png',
    unSelected: '/imgs/unSelected.png',
    selectedAll: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  switchSelect() {
    this.setData({
      selectedAll: !this.data.selectedAll
    })
  },

  onBuy() {
    if (!this.data.selectedAll) {
      wx.showToast({
        title: '未选择商品',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.navigateTo({
      url: '/pages/buy/index'
    })
  }
})