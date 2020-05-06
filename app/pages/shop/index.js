import {ShopModel} from '../../api/models/shop'

const Shop = new ShopModel()

import {CollectionModel} from '../../api/models/collection'
const Collection = new CollectionModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify: '',
    list: [],
    likeList: [],
    likedIdList: [],
    like: '/imgs/like.png',
    unLike: '/imgs/unLike.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Shop.getShop({
      productType: options.pid?[options.pid]:[],
      keyword: options.key
    })
      .then(res => {
        this.setData({
          list: res
        })
      })

    this._getCollection()

    this.setData({
      classify: wx.getStorageSync('classify')
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.list.current >= this.data.list.pages) {
      wx.showToast({
        title: '没有更多啦~',
        icon: 'none',
        duration: 2000
      })
      return
    }

    Shop.getShop({
      productType: options.pid?[options.pid]:[],
      keyword: options.key,
      page: this.data.list.current+1
    })
      .then(res => {
        res.data = [...this.data.list.data, ...res.data]
        this.setData({
          list: res
        })
      })
  },

  toSearch() {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },

  switchCollect(e) {
    const {cid, is} = e.currentTarget.dataset

    console.log(is)

    is || Collection.addCollection(cid)
      .then(res => {
        this._getCollection()
      })

    if(is) {
      const delIds = []
      this.data.likeList.map(item => {
        if (item.productId === cid) {
          delIds.push(item.id)
        }
      })
      Collection.delCollection(delIds)
      .then(res => {
        this._getCollection()
      })
    }
  },

  toShopDetail(e) {
    wx.navigateTo({
      url: '/pages/goods-detail/index?gid=' + e.currentTarget.dataset.gid
    })
  },

  _getCollection() {
    // 获取收藏 // 没有登陆/认证就不去拿
    wx.getStorageSync('token') && Collection.getCollection()
      .then(res => {
        let likedIdList = []
        res && res.all && res.all.map(item => {
          likedIdList.push(item.productId)
        })

        res && res.all && this.setData({
          likeList: res.all
        })

        this.setData({
          likedIdList
        })
      })
  }
})