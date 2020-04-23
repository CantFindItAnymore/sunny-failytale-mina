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
  }
})