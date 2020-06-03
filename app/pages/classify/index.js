import {ClassifyModel} from '../../api/models/classify'

const Classify = new ClassifyModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: [],
    classifyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Classify.getClassify()
      .then(res => {
        console.log(res)
        let activeName = []
        res.map(item => {
          activeName.push(item.id)
        })
        
        this.setData({
          classifyList: res,
          activeName
        })
      })
  },

  // onChange(event) {
  //   this.setData({
  //     activeName: event.detail
  //   })
  // },

  toShop (e) {
    e.currentTarget.dataset.classify && wx.setStorageSync('classify', e.currentTarget.dataset.classify)
    const id = e.detail.id || e.currentTarget.dataset.id || ''

    wx.navigateTo({
      url: '/pages/shop/index?pid=' + id
    })
  }

})