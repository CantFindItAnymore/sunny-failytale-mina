import {ClassifyModel} from '../../api/models/classify'

const Classify = new ClassifyModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '',
    classifyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Classify.getClassify()
      .then(res => {
        console.log(res)
        this.setData({
          classifyList: res
        })
      })
  },

  onChange(event) {
    this.setData({
      activeName: event.detail
    })
  },

  toShop (e) {
    const id = e.detail.id || ''

    wx.navigateTo({
      url: '/pages/shop/index?pid=' + id
    })
  }

})