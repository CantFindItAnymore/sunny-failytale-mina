import { list, my } from '../../utils/common-json/my'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list,
    my,
    defaultHead: '/imgs/default_head.png',
    authorized: false,
    userInfo: null,
    jsCode: ''
  },

  onReady: function () {
    // 尝试主动获取用户信息
    this._userAuthorized()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击微信登录登录按钮
  handleGetUserInfo(e) {
    this.data.authorized || this._getUserInfo(e)
  },

  // （微信登录老用户） 直接拿用户信息
  _userAuthorized() {
    const _this = this
    wx.showLoading()
    wx.getSetting({
      success: data => {
        console.log(data.authSetting)
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      },
      fail () {
        console.log(1)
      },
      complete () {
        wx.hideLoading()
      }
    })
  },

  // （微信登录新用户） 微信授权个人信息
  _getUserInfo(e) {
    const userInfo = e.detail.userInfo
    console.log(userInfo)
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
      wx.hideLoading()
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '请授权登录',
        icon: 'none',
        duration: 2000
      })
    }
  },

  toSomewhere() {}
})