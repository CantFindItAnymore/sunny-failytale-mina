import { ShopModel } from '../../api/models/shop'

const Shop = new ShopModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {gid} = options
    console.log(gid)
    Shop.getDetail(gid)
      .then(res => {
        console.log(res)
      })
  },
})