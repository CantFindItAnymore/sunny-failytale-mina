import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storieslPics: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Home.getImgs()
      .then(res => {
        this.setData({
          storieslPics: res.stories
        })

        this._getTrueUrl()
      })
  },

  toShop(e) {
    const { typeids, keyword, type, classify } = e.currentTarget.dataset
    console.log(e)

    classify && wx.setStorageSync('classify', classify)

    wx.navigateTo({
      url: `/pages/shop/index?pid=${typeids}&key=${keyword}&type=${type}`
    })
  },

  _getTrueUrl() {
    let currentStorieslList = []
    this.data.storieslPics.map((item, index) => {
      currentStorieslList.push({
        name: index,
        url: item.pic.url
      })
    })
    Home.getUrl(currentStorieslList)
      .then(res => {
        let storieslPics = this.data.storieslPics
        res.map(item => {
          storieslPics[Number(item.name)].pic.url = item.url
        })
        this.setData({
          storieslPics
        })
      })
  }
})