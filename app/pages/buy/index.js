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
      totalFee += (item.productSkuVo.price*100)*item.nowCount
    })
    totalFee = totalFee/100
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
        amount: item.nowCount,
        price: item.addPrice,
        productId: item.productId,
        productMainPicUrl: item.productSkuVo.mainPicUrl,
        productName: item.productSkuVo.name,
        productType: item.productSkuVo.productType,
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
      carriage: '10.00',
      // couponId: '',
      // couponPrice: ,
      // couponUserId: '',
      leaveWord: this.data.remark,
      realPrice: this.data.totalFee + 10,
      skuList,
      totalPrice: this.data.totalFee + 10
    })
      .then(res => {
        return Shop.pay({
          orderNo: res,
          // totalFee: (this.data.totalFee + 10)*100
          totalFee: 1
        })
      })
      .then(res => {
        console.log(res.packageValue)
        wx.requestPayment({
          timeStamp: res.timestamp.toString(),
          nonceStr: res.nonceStr,
          package: res.packageValue,
          signType: 'MD5',
          paySign: res.paySign,
          success () {
            wx.redirectTo({
              url: '/pages/buy-suc/index'
            })
          },
          fail (res) {
            console.log(res)
          }
        })
      })
  }
})