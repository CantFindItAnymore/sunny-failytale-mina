import {
  HTTP
} from '../http.js'

class CollectionModel extends HTTP {

  getCollection() {
    return this.request({
      url: 'collection/mine'
    })
  }

}

export {
  CollectionModel
}