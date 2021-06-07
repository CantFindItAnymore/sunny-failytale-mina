
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
    Home.getSale()
      .then(res => {
        return Home.getUrl(res)

      })
      .then(res1 => {
        this.setData({
          list: res1
        })
      })
  }
})