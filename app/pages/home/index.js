import { classifyList, rainbowList, outfitList } from '../../utils/common-json/home'

Page({

  data: {
    classifyList,
    rainbowList,
    outfitList
  },

  onLoad: function (options) {

  },

  goSearch() {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },

  toShopCar() {
    wx.switchTab({
      url: '/pages/shopping-car/index'
    })
  },

  openMenu() {
    wx.switchTab({
      url: '/pages/classify/index'
    })
  }
})