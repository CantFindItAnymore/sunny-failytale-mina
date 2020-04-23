import {ShopModel} from '../../api/models/shop'

const Shop = new ShopModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify: '',
    list: [],
    like: '/imgs/like.png',
    unLike: '/imgs/unLike.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {pid, key} = options

    // 分类来的
    pid && Shop.getShop({productType: [options.pid]})
      .then(res => {
        console.log(res)
        this.setData({
          list: res
        })
      })

    // 搜索来的
    key && Shop.getShop({keyword: [options.key]})
      .then(res => {
        console.log(res)
        this.setData({
          list: res
        })
      })

    this.setData({
      classify: wx.getStorageSync('classify')
    })
  },

  toShopDetail(e) {
    wx.navigateTo({
      url: '/pages/goods-detail/index?gid=' + e.currentTarget.dataset.gid
    })
  }
})