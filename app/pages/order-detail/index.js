import { OrderModel } from '../../api/models/order'
const Order = new OrderModel()

import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    status: ['待付款', '待发货', '待收货', '已完成', '已取消']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Order.getOrderDetail(options.orderId)
      .then(res => {

        res.skuList.map((item, index) => {
          Home.getUrl([{
            name: index,
            url: item.skuPicUrl
          }])
            .then(oo => {
              item.skuPicUrl = oo[0].url
              this.setData({
                detail: res
              })
            })
        })

      })
  },

  toDetail(e) {
    wx.navigateTo({
      url: '/pages/goods-detail/index?gid=' + e.currentTarget.dataset.gid
    })
  }
})