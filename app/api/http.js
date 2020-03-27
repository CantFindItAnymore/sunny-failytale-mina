import {
  config
} from './config.js'

const http = class HTTP {
  request({
    url,
    data = {},
    method = 'GET',
    type = 'x-www-form-urlencoded'
  }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method, type)
    })
  }

  _request(url, resolve, reject, data = {}, method = 'GET', type = 'x-www-form-urlencoded') {
    wx.showLoading({
      mask: true
    })

    const header = (url === 'api-uaa/oauth/openId/token' || url === 'api-uaa/oauth/regist')
      ? {
        'content-type': `application/${type}`,
        'Authorization': config.defaultToken
      }
      : {
        'content-type': `application/${type}`,
        'Authorization': wx.getStorageSync('token')?'Bearer ' + wx.getStorageSync('token'):''
      }

    wx.request({
      url: config.baseUrl + url,
      method: method,
      header: header,
      data: data,
      success: res => {
        const code = res.data.resp_code === 0 || res.data.code === 0
        const status = res.statusCode.toString()
        if (status.startsWith('2') && code) {
          wx.hideLoading()
          resolve(res.data.datas || res.data.data)
        } else if (status === '401') {
          // 这里判断url的原因是：在welcome页调用了这个接口用于判断token是否过期
          if (url !== 'api-user/admin/company/user/list') {
            this._tokenOut()
          } else {
            wx.hideLoading()
            reject(res)
          }
        } else {
          console.log('IO成功但请求失败：', res)
          this._showErr(res.resp_msg || res.data.resp_msg)
          setTimeout(() => {
            reject(res)
          }, 2000)
        }
      },
      fail: err => {
        console.log(err)
        this._showErr(err.errMsg)
        setTimeout(() => {
          reject(err)
        }, 2000)
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
    this._showErr('账号过期，请重新登录')
    wx.removeStorageSync('token')
    // wx.removeStorageSync('mobile')
    // wx.removeStorageSync('openId')
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/welcome/welcome'
      })
    }, 2000)
  }
}

export {
  http as HTTP
}