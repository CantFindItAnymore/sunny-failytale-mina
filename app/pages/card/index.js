import { CardModel } from '../../api/models/card'
const Card = new CardModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    cardList: [1,2,3]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    Card.getCard({
      current: this.data.current,
      status: 0
    })
      .then(res => {
        this.setData({
          cardList: res
        })
      })
  }
})