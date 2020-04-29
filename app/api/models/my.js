import {
  HTTP
} from '../http.js'

class MyModel extends HTTP {
  login(jsCode) {
    return this.request({
      url: 'user/auth/login',
      data: {
        jsCode
      }
    })
  }

  getMyAddress() {
    return this.request({
      url: 'address/mine'
    })
  }

  addAddress({
    address,
    areaAddress,
    areaPath,
    phoneNumber,
    userName
  }) {
    return this.request({
      url: 'address/management',
      method: 'POST',
      data: {
        address,
        areaAddress,
        areaPath,
        phoneNumber,
        userName
      }
    })
  }

  editAddress({
    address,
    areaAddress,
    areaPath,
    phoneNumber,
    userName,
    id
  }) {
    return this.request({
      url: 'address/management',
      method: 'POST',
      data: {
        address,
        areaAddress,
        areaPath,
        phoneNumber,
        userName,
        id
      }
    })
  }

  delAddress(list) {
    return this.request({
      url: 'address/delete',
      method: 'POST',
      data: {
        list
      }
    })
  }

  defaultAddress(id) {
    return this.request({
      url: 'address/default',
      data: {
        id
      }
    })
  }

  getMyCar() {
    return this.request({
      url: 'cart/mine'
    })
  }

  delCarShop(list) {
    return this.request({
      url: 'cart/delete',
      method: 'POST',
      data: {
        list
      }
    })
  }

}

export {
  MyModel
}