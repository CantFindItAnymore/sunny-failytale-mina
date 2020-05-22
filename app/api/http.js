import {
  config
} from './config'

const http = class HTTP {
  request({
    url,
    data = {},
    method = 'GET',
    type = 'json'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, type)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET', type) {
    wx.showLoading({
      mask: true
    })

    const header = {
      'content-type': `application/${type}`,
      'Authorization': wx.getStorageSync('token')?wx.getStorageSync('token'):''
    }

    wx.request({
      url: config.baseUrl + url,
      method: method,
      header: header,
      data: data,
      success: res => {
        const code = res.data.code
        const status = res.statusCode.toString()
        if (status.startsWith('2')) {
          switch (code) {
            case 10000:
              wx.hideLoading()
              resolve(res.data.data)
              break;
            case 10005:
              this._tokenOut()
              break;
            case 10009:
              this._unAuth()
              break;
            default:
              console.log('IO成功但请求失败：', res)
              this._showErr(res.data.message)
              setTimeout(() => {
                reject()
              }, 2000)
              break;
          }
        }
      },
      fail: err => {
        console.log(err)
        this._showErr(err.errMsg)
        setTimeout(() => {
          reject(err)
        }, 2000)
      },
      complete: () => {
        wx.hideLoading()
      }
    })
  }

  // 私有方法，用以输出错误信息
  _showErr(err) {
    if (!err) {
      err = '未知错误'
    }
    wx.showToast({
      title: err,
      icon: 'none',
      duration: 2000
    })
  }

  _tokenOut () {
    console.log('un login')
    wx.showLoading({
      mask: true
    })
    // 无token
    wx.getSetting({
			success: (data) => {
				if (data.authSetting['scope.userInfo']) {
          this._showErr('账号过期，正在重新登录')
          // 1. token丢失(静默重新获取token)
          wx.login({
            success(res) {
              if (res.code) {
                wx.setStorageSync('jsCode', res.code)
                wx.request({
                  url: config.baseUrl + 'user/auth/login/',
                  header: {
                    'content-type': 'application/json'
                  },
                  data: {
                    jsCode: res.code,
                    nickName: wx.getStorageSync('nickName')
                  },
                  success (res) {
                    wx.setStorageSync('token', res.data.data.token)
                    wx.showToast({
                      title: '登录成功',
                      icon: 'none',
                      duration: 2000
                    })
                    wx.switchTab({
                      url: '/pages/home/index'
                    })
                  }
                })
              }
            },
          })
        }
        else {
          // 2. 新用户未登录
          wx.showModal({
            title: '提示',
            content: '请点击头像登录后再进行该操作',
            success (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/my/index'
                })
              } else if (res.cancel) {
              }
            }
          })
        }
			},
			complete() {
				wx.hideLoading()
      }
    })
  }

  _unAuth () {
    console.log('un auth')
    // 1. 新用户未认证
    wx.showModal({
      title: '提示',
      content: '请认证后再进行该操作',
      success (res) {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/person/index'
          })
        } else if (res.cancel) {
        }
      }
    })
  }
}

export {
  http as HTTP
}