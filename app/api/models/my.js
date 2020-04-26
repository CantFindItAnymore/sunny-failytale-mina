import {
  HTTP
} from '../http.js'

class MyModel extends HTTP {
  getPerformance(id) {
    return this.request({
      url: 'api-admin/performance/getUser/' + id
    })
  }

  getMyCustom() {
    return this.request({
      url: 'api-user/admin/company/user/count'
    })
  }

  getMyCustomList() {
    return this.request({
      url: 'api-user/admin/company/user/list'
    })
  }

  getMyCustomCount(page = 1) {
    return this.request({
      url: 'api-order/order/employee/page',
      method: 'POST',
      type: 'json',
      data: {
        page
      }
    })
  }

  login(jsCode) {
    return this.request({
      url: 'user/auth/login',
      data: {
        jsCode
      }
    })
  }

}

export {
  MyModel
}