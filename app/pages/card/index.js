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
    rabish: '/imgs/rabish.png',
    current: 1,
    cardList: [],
    okList: [],
    usedList: [],
    losedList: [],
    rabishList: [],
    active: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    this._getCard()
  },

  onClickTab(e) {
    this.setData({
      active: e.detail
    })
  },

  handleSelectCard(e) {
    console.log(this.data.okList[e.currentTarget.dataset.index])
  },

  _getCard() {
    Card.getCard({
      current: this.data.current
    })
      .then(res => {
        this.setData({
          cardList: res
        })

        let okList = this.data.okList
        let usedList = this.data.usedList
        let losedList = this.data.losedList
        let rabishList = this.data.rabishList
        res.data.map(item => {
          if (item.status === 0) {
            okList.push(item)
          } else if (item.status === 1) {
            usedList.push(item)
          } else if (item.status === 2) {
            losedList.push(item)
          } else if (item.status === 3) {
            rabishList.push(item)
          }
        })

        this.setData({
          okList,
          usedList,
          losedList,
          rabishList,
          current: this.data.current+1
        })

        if (this.data.cardList.next) {
          this._getCard()
        }
      })
  }
})