import {
  HTTP
} from '../http.js'

class CollectionModel extends HTTP {

  getCollection() {
    return this.request({
      url: 'collection/mine'
    })
  }

  addCollection(id) {
    return this.request({
      url: 'collection/add',
      data: {
        productId: id
      }
    })
  }

  delCollection(list) {
    return this.request({
      url: 'collection/remove',
      method: 'POST',
      data: {
        list
      }
    })
  }

}

export {
  CollectionModel
}