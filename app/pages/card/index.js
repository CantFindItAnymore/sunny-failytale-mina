import { CardModel } from '../../api/models/card'
const Card = new CardModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: '/imgs/selected.png',
    unSelected: '/imgs/unSelected.png',
    lose: '/imgs/lose.png',
    used: '/imgs/used.png',
    current: 0,
    cardList: []
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