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
    orderNo: null,
    orderId: null,
    totalFee: 0,
    selectedCard: null
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
    buyList?.length>0 && buyList.map(item => {
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

    const selectedCard = wx.getStorageSync('selectedCard')
    selectedCard && this.setData({
      selectedCard
    })
  },

  changeAddress() {
    wx.navigateTo({
      url: '/pages/address/index?from=buyPage'
    })
  },

  toCard() {
    wx.navigateTo({
      url: '/pages/card/index?from=buyPage'
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
      carriage: '0.00',
      couponPrice: this.data.selectedCard?this.data.selectedCard.couponPrice:null,
      couponUserId: this.data.selectedCard?this.data.selectedCard.id:null,
      leaveWord: this.data.remark,
      realPrice: this.data.totalFee - (this.data.selectedCard?this.data.selectedCard.couponPrice:0),
      skuList,
      totalPrice: this.data.totalFee
    })
      .then(res => {
        this.setData({
          orderNo: res.code,
          orderId: res.id
        })
        // 清除优惠券&buyList
        wx.removeStorageSync('selectedCard')
        wx.removeStorageSync('buyList')
        return Shop.pay({
          orderNo: res.code,
          orderId: res.id,
          totalFee: (this.data.totalFee) * 1000 / 10 - (this.data.selectedCard?this.data.selectedCard.couponPrice:0.00) * 100 / 10
          // totalFee: (this.data.totalFee) * 100 - (this.data.selectedCard?this.data.selectedCard.couponPrice:0) * 100
        })
      })
      .then(res => {
        console.log(res.packageValue)
        const _this = this
        wx.requestPayment({
          timeStamp: res.timestamp.toString(),
          nonceStr: res.nonceStr,
          package: res.packageValue,
          signType: 'MD5',
          paySign: res.paySign,
          success () {
            let timer = setTimeout(() => {
              Shop.checkPay(_this.data.orderNo)
                .then(() => {
                  clearTimeout(timer)
                  wx.redirectTo({
                    url: '/pages/buy-suc/index?oid='+_this.data.orderId
                  })
                })
            }, 1000)
          },
          fail (res) {
            console.log(res)
            wx.redirectTo({
              url: '/pages/order/index?type=pay'
            })
          }
        })
      })
  }
})