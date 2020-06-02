
import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    Home.getStory()
      .then(res => {
        res.map(item => {
          Home.getUrl([{
            name: item.sort,
            url: item.url
          }])
            .then(oo => {
              if (oo[0].name == item.sort) {
                item.url = oo[0].url
              }
              this.setData({
                list: res
              })
            })
        })
      })
  }
})