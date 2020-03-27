import {
  HTTP
} from '../http.js'

class HistoryModel extends HTTP {

  getHistory(id) {
    return this.request({
      url: 'miniapp/marketer/withdrawalsRecord',
      method: 'POST',
      data: {}
    })
  }

}

export {
  HistoryModel
}