import {ShopModel} from '../../api/models/shop'

const Shop = new ShopModel()

import {CollectionModel} from '../../api/models/collection'
const Collection = new CollectionModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'all',
    likeList: [],
    failuresList: [],
    likedIdList: [],
    like: '/imgs/like.png',
    unLike: '/imgs/unLike.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this._getCollection()
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

        res && res.failures && this.setData({
          failuresList: res.failures
        })

        this.setData({
          likedIdList
        })
      })
  }
})