import { classifyList, rainbowList, outfitList } from '../../utils/common-json/home'

import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({

  data: {
    classifyList,
    rainbowList,
    outfitList,

    //pic(9个)
    brandStoryDisplayPic: '', // 品牌故事
    carouselPics: [], // 轮播
    carouselPics2: [], // 轮播2
    couponDisplayPic: '', // 优惠券
    hotProductsDisplayPic: '', // 热销
    indexProducts: [], // 首页商品
    newProductsDisplayPic: '', // 新品
    saleDisplayPic: '', // 晒图有礼
    typePics: [], // 分类图
    videoUrl: '', // 视频
  },

  onLoad: function () {
    Home.getImgs()
      .then(res => {
        this.setData({
          brandStoryDisplayPic: res.brandStoryDisplayPic,
          carouselPics: res.carouselPics,
          carouselPics2: res.carouselPics2,
          couponDisplayPic: res.couponDisplayPic,
          hotProductsDisplayPic: res.hotProductsDisplayPic,
          indexProducts: res.indexProducts,
          newProductsDisplayPic: res.newProductsDisplayPic,
          saleDisplayPic: res.saleDisplayPic,
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

  toShop(e) {
    const { typeids, keyword, type, classify } = e.currentTarget.dataset
    console.log(e)

    classify && wx.setStorageSync('classify', classify)

    wx.navigateTo({
      url: `/pages/shop/index?pid=${typeids}&key=${keyword}&type=${type}`
    })
  },

  toGoods(e) {
    const { id } = e.currentTarget.dataset
    console.log(e)

    wx.navigateTo({
      url: `/pages/goods-detail/index?gid=${id}`
    })
  },

  toCard () {
    wx.navigateTo({
      url: `/pages/card/index`
    })
  },
  toGift () {
    wx.navigateTo({
      url: `/pages/gift/index`
    })
  },

  toStory () {
    wx.navigateTo({
      url: `/pages/story/index`
    })
  },

  toStoryLine () {
    wx.navigateTo({
      url: `/pages/story-line/index`
    })
  },

  _getTrueUrl() {
    // 单个图
    let sixList = [
      {
        name: 'brandStoryDisplayPic',
        url: this.data.brandStoryDisplayPic
      },
      {
        name: 'couponDisplayPic',
        url: this.data.couponDisplayPic
      },
      {
        name: 'hotProductsDisplayPic',
        url: this.data.hotProductsDisplayPic
      },
      {
        name: 'newProductsDisplayPic',
        url: this.data.newProductsDisplayPic
      },
      {
        name: 'saleDisplayPic',
        url: this.data.saleDisplayPic
      },
      {
        name: 'videoUrl',
        url: this.data.videoUrl
      },
    ]

    Home.getUrl(sixList)
      .then(res => {
        res.map(item => {
          if (item.name === 'brandStoryDisplayPic') {
            this.setData({
              brandStoryDisplayPic: item.url
            })
          }
          if (item.name === 'couponDisplayPic') {
            this.setData({
              couponDisplayPic: item.url
            })
          }
          if (item.name === 'hotProductsDisplayPic') {
            this.setData({
              hotProductsDisplayPic: item.url
            })
          }
          if (item.name === 'newProductsDisplayPic') {
            this.setData({
              newProductsDisplayPic: item.url
            })
          }
          if (item.name === 'saleDisplayPic') {
            this.setData({
              saleDisplayPic: item.url
            })
          }
          if (item.name === 'videoUrl') {
            this.setData({
              videoUrl: item.url
            })
          }
        })
      })

    // 轮播
    let currentCarouselList = []
    this.data.carouselPics.map((item, index) => {
      currentCarouselList.push({
        name: index,
        url: item.pic.url
      })
    })
    Home.getUrl(currentCarouselList)
      .then(res => {
        let carouselPics = this.data.carouselPics
        res.map(item => {
          carouselPics[Number(item.name)].pic.url = item.url
        })
        this.setData({
          carouselPics
        })
      })

    let currentCarouselList2 = []
    this.data.carouselPics2.map((item, index) => {
      currentCarouselList2.push({
        name: index,
        url: item.pic.url
      })
    })
    Home.getUrl(currentCarouselList2)
      .then(res => {
        let carouselPics2 = this.data.carouselPics2
        res.map(item => {
          carouselPics2[Number(item.name)].pic.url = item.url
        })
        this.setData({
          carouselPics2
        })
      })

      // 分类
      let currentTypePics = []
      this.data.typePics.map((item, index) => {
        currentTypePics.push({
          name: index,
          url: item.pic.url
        })
      })
      Home.getUrl(currentTypePics)
        .then(res => {
          let typePics = this.data.typePics
          res.map(item => {
            typePics[Number(item.name)].pic.url = item.url
          })
          this.setData({
            typePics
          })
        })

      // 首页商品
      let currentIndexProducts = []
      this.data.indexProducts.map((item, index) => {
        currentIndexProducts.push({
          name: index,
          url: item.mainPicUrl
        })
      })
      Home.getUrl(currentIndexProducts)
        .then(res => {
          let indexProducts = this.data.indexProducts
          res.map(item => {
            indexProducts[Number(item.name)].mainPicUrl = item.url
          })
          this.setData({
            indexProducts
          })
        })

    
    
   
  }
})