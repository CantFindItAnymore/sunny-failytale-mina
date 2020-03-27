import {
  HTTP
} from '../http.js'

class HomeModel extends HTTP {

  getHome() {
    return this.request({
      url: 'miniapp/marketer/initialize',
      method: 'POST',
      data: {}
    })
  }

}

export {
  HomeModel
}