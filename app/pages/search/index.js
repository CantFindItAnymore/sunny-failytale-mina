// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWord: '',
    onceList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    wx.getStorageSync('keyWords').length && this.setData({
      onceList: wx.getStorageSync('keyWords')
    })
  },

  onKeyChange(e) {
    const keyWord = e.currentTarget.dataset.key || e.detail.replace(/^\s*|\s*$/g,"")
    this.setData({
      keyWord
    })

    const from = e.currentTarget.dataset.from
    from === 'once' && this.handleSearch()
  },

  handleSearch() {
    if (!this.data.keyWord) {
      return
    }

    let once = this.data.onceList
    once.unshift(this.data.keyWord)

    // 去重
    once = Array.from(new Set(once))
    // 10个
    once = once.slice(0, 10)

    wx.setStorageSync('keyWords', once)
    wx.setStorageSync('classify', this.data.keyWord)
    wx.navigateTo({
      url: '/pages/shop/index?key=' + this.data.keyWord
    })
  },

  handleDelKey() {
    this.setData({
      onceList: []
    })

    wx.setStorageSync('keyWords', [])
  }
})