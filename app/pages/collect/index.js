import {ShopModel} from '../../api/models/shop'

const Shop = new ShopModel()

import {CollectionModel} from '../../api/models/collection'
const Collection = new CollectionModel()


import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'all',
    likeList: [],
    failuresList: [],
    likedIdList: [],
    like: '/imgs/v2/like.png',
    unLike: '/imgs/v2/unLike.png'
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
        if (item.id === cid) {
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
          likedIdList.push(item.id)
        })
        this.setData({
          likedIdList
        })


        res && res.all && res.all.map((item, index) => {
          Home.getUrl([
            {
              name: index,
              url: item.innerProductVo.mainPicUrl
            }
          ])
            .then(oo => {
              item.innerProductVo.mainPicUrl = oo[0].url
              this.setData({
                likeList: res.all
              })
            })
        })

        res && res.failures && res.failures.map((item, index) => {
          Home.getUrl([
            {
              name: index,
              url: item.innerProductVo.mainPicUrl
            }
          ])
            .then(oo => {
              item.innerProductVo.mainPicUrl = oo[0].url
              this.setData({
                failuresList: res.failures
              })
            })
        })

        
      })
  }
})