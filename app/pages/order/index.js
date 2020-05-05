import { OrderModel } from '../../api/models/order'
const Order = new OrderModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 'all',
    allList: [1,2,3],
    postList: [],
    getList: [],
    finishedList: [],
    cancelledList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    Order.getOrder()
      .then(res => {
        
      })
  }
})