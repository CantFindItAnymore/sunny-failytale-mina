import { ShopModel } from '../../api/models/shop'

const Shop = new ShopModel()


import {CollectionModel} from '../../api/models/collection'
const Collection = new CollectionModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gid: '',
    detail: {},
    sku: {},
    comments: [],
    likeList: [],
    likedIdList: [],
    like: '/imgs/like.png',
    unLike: '/imgs/unLike.png',
    skuShow: false,
    skuInfo: {
      url: '',
      price: null,
      selectedSkuName: '',
      // 库存
      remainStoreNum: 0,
      count: 1,
      skuId: null,
      props: {}
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {gid} = options
    console.log(gid)
    Shop.getDetail(gid)
      .then(res => {
        console.log(res)
        this.setData({
          detail: res,
          gid
        })
      })

    // 收藏
    this._getCollection()
    // sku
    Shop.gwtShopSKU(gid)
      .then(res => {
        console.log(res)
        this.setData({
          sku: res
        })

        // 给skuInfo添加相关属性
        let skuInfo = this.data.skuInfo

        res.skuProps.map(item => {
          skuInfo.props[item.name] = {
            skuName: '',
            skuId: null
          }
        })

        this.setData({
          skuInfo
        })
      })
    //评论
    Shop.getComment(gid)
      .then(res => {
        console.log(res)
        this.setData({
          comments: res
        })
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

  toShopCar() {
    wx.switchTab({
      url: '/pages/shopping-car/index'
    })
  },

  openSku(e) {
    this.setData({
      activeBuyType: e.currentTarget.dataset.type,
      skuShow: true
    })
  },

  closeSku() {
    this.setData({
      skuShow: false
    })
  },

  handleSelectSku(e) {
    const {skuprop, skuname, skuid} = e.currentTarget.dataset
    console.log(skuprop, skuname, skuid)

    // 选中
    let skuInfo = this.data.skuInfo
    skuInfo.props[skuprop]['skuName'] = skuname
    skuInfo.props[skuprop]['skuId'] = skuid
    this.setData({
      skuInfo
    })

    // 全部选中后匹配sku
    let selectedSkuName = []
    for (const key in this.data.skuInfo.props) {
      if (this.data.skuInfo.props[key].skuName) {
        selectedSkuName.push(`${key}:${this.data.skuInfo.props[key].skuName}`)
      }
    }

    selectedSkuName = selectedSkuName.join(' ')

    console.log(selectedSkuName)

    this.data.sku.skuOptGroup.map(item => {
      if (item.skuName === selectedSkuName) {
        console.log('匹配到sku了')
        let skuInfo = this.data.skuInfo
        // 限制最大购买量
        skuInfo.remainStoreNum = item.remainStoreNum
        skuInfo.price = item.price
        skuInfo.skuId = item.id
        skuInfo.selectedSkuName = selectedSkuName
        this.setData({
          skuInfo
        })
      }
    })
  },

  onCountChange(e) {
    let skuInfo = this.data.skuInfo
    skuInfo.count = e.detail
    this.setData({
      skuInfo
    })
  },

  addOrBuy() {
    if (!this.data.skuInfo.skuId) {
      wx.showToast({
        title: '请选择规格',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (!this.data.skuInfo.remainStoreNum) {
      wx.showToast({
        title: '库存已不足',
        icon: 'none',
        duration: 2000
      })
      return
    }


    let productType = []
    this.data.detail.productType.map(item => {
      productType.push(item.id)
    })
    if (this.data.activeBuyType === 'add') {
      Shop.addShopCar({
        addPrice: this.data.skuInfo.price,
        count: this.data.skuInfo.count,
        productId: this.data.gid,
        skuId: this.data.skuInfo.skuId,
        productType
      })
        .then(() => {
          wx.showToast({
            title: '添加成功',
            icon: 'none',
            duration: 2000
          })
          this.setData({
            skuShow: false
          })
        })
    }

    if (this.data.activeBuyType === 'buy') {

      let buyList = []
      this.data.catList.all && this.data.catList.all.map(item => {
        if (item.nowIsSelect) {
          buyList.push(item)
        }
      })
      this.data.catList.depreciates && this.data.catList.depreciates.map(item => {
        if (item.nowIsSelect) {
          buyList.push(item)
        }
      })

      wx.setStorageSync('buyList', buyList)

      wx.navigateTo({
        url: '/pages/buy/index'
      })
    }
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