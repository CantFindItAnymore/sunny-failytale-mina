import {
  HTTP
} from '../http.js'

class HomeModel extends HTTP {

  getImgs() {
    return this.request({
      url: 'system-index/front'
    })
  }



}

export {
  HomeModel
}