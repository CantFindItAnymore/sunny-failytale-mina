import { OrderModel } from '../../api/models/order'
const Order = new OrderModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'all',
    allList: [],
    payList: [],
    deliveryList: [],
    receiptList: [],
    finishList: [],
    cancelList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    Order.getOrder()
      .then(res => {
        this.setData({
          allList: res.all,
          payList: res.pay,
          deliveryList: res.delivery,
          receiptList: res.receipt,
          finishList: res.finish,
          cancelList: res.cancel,
        })
      })
  },

  onClickTab(e) {
    this.setData({
      active: e.detail.name
    })
  }
})