import { MyModel } from '../../api/models/my'
const My = new MyModel()

import { ShopModel } from '../../api/models/shop'
const Shop = new ShopModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    buyList: [],
    remark: '',
    totalFee: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    My.getMyAddress()
      .then(res => {
        res.map(item => {
          if (item.isDefault) {
            wx.setStorageSync('address', item)
            this.setData({
              address: item
            })
          }
        })
      })
  },

  onShow: function () {
    const buyList = wx.getStorageSync('buyList')
    let totalFee = 0
    buyList && buyList.map(item => {
      totalFee += item.addPrice
    })
    this.setData({
      buyList,
      totalFee
    })

    const address = wx.getStorageSync('address')
    address && this.setData({
      address
    })
  },

  changeAddress() {
    wx.navigateTo({
      url: '/pages/address/index?from=buyPage'
    })
  },

  onChange(e) {
    this.setData({
      remark: e.detail
    })
  },

  onPay() {
    let skuList = []
    this.data.buyList.map(item => {
      skuList.push({
        amount: item.count,
        price: item.addPrice,
        productId: item.productId,
        productMainPicUrl: item.productSkuVo.mainPicUrl,
        productName: item.productSkuVo.name,
        // productType: item.productSkuVo.productType,
        skuId: item.productSkuVo.skuId,
        skuName: item.productSkuVo.skuName,
        skuPicUrl: item.productSkuVo.picUrl
      })
    })

    Shop.place({
      address: {
        areaAddress: this.data.address.areaAddress,
        consignee: this.data.address.userName,
        detailedAddress: this.data.address.address,
        phone: this.data.address.phoneNumber
      },
      carriage: 1000,
      couponId: '',
      couponPrice: '',
      couponUserId: '',
      leaveWord: this.data.remark,
      realPrice: this.data.totalFee,
      skuList,
      totalPrice: this.data.totalFee + 1000
    })
      .then(() => {
        // return
      })
    // ShopModel.pay({
    //   openId: '',
    //   orderNo: '',
    //   totalFee: ''
    // })
    //   .then(res => {

    //   })
  }
})