import { classifyList, rainbowList, outfitList } from '../../utils/common-json/home'

import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({

  data: {
    classifyList,
    rainbowList,
    outfitList,

    //pic
    carouselPics: [],
    indexProducts: [],
    typePics: [],
    videoUrl: ''
  },

  onLoad: function () {
    Home.getImgs()
      .then(res => {
        this.setData({
          carouselPics: res.carouselPics,
          indexProducts: res.indexProducts,
          typePics: res.typePics,
          videoUrl: res.videoUrl
        })

        this._getTrueUrl()
      })
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
  },

  goShop() {
    wx.navigateTo({
      url: '/pages/shop/index'
    })
  },

  _getTrueUrl() {
    this.data.carouselPics.map(item => {
      item.pic.url
    })

    this.data.indexProducts.map(item => {
      item.mainPicUrl
    })

    this.data.typePics.map(item => {
      item.pic.url
    })
  }
})