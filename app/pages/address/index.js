// pages/address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [1,2,{isDefault: true}],
    dialogShow: false,
    activeIndex: null,
    addressInfo: {
      name: '',
      mobile: '',
      address: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  openDialog(e) {
    if (e.currentTarget.dataset.index === this.data.activeIndex) {
      this.setData({
        dialogShow: true
      })
    } else {
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        addressInfo: {
          name: '',
          mobile: '',
          address: ''
        },
        dialogShow: true
      })
    }
  },

  onClose() {
    this.setData({
      dialogShow: false
    })
  },

  onConfirm() {
    if (this.data.activeIndex < 0) {
      // 新增
    } else {
      // 编辑
    }
  }
})