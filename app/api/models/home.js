import {
  HTTP
} from '../http.js'

class HomeModel extends HTTP {

  getImgs() {
    return this.request({
      url: 'system-index/front'
    })
  }

  getUrl(files) {
    return this.request({
      url: 'oss/get',
      method: 'POST',
      type: 'json',
      data: files
    })
  }

  getStory() {
    return this.request({
      url: 'system-index/brand'
    })
  }

  getSale() {
    return this.request({
      url: 'system-index/sale'
    })
  }



}

export {
  HomeModel
}