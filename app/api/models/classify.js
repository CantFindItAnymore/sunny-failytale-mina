import {
  HTTP
} from '../http.js'

class ClassifyModel extends HTTP {

  getClassify() {
    return this.request({
      url: 'product/type/tree'
    })
  }

}

export {
  ClassifyModel
}