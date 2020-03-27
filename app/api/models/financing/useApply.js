import {
  HTTP
} from '../../http.js'

class useApplyModel extends HTTP {

  // 助贷 单子详情
  getDetail(oid) {
    return this.request({
      url: `api-order/loan/detail/${oid}`
    })
  }

  // 获取助贷 单子
  getLoanList({ companyId, productId }) {
    return this.request({
      url: 'api-order/loan/product/company',
      method: 'POST',
      type: 'json',
      data: {
        companyId,
        productId
      }
    })
  }

  // 获取某个助贷的所需材料
  getMaterialList(tid) {
    return this.request({
      url: `api-product/productmaterial/product/${tid}`
    })
  }

  // 申请用款 增加单子
  addLoan({
    companyId,
    companyName,
    loanAmount,
    materials,
    product,
    productId,
    projectName,
    userId
  }) {
    return this.request({
      url: 'api-order/loan/add',
      method: 'POST',
      type: 'json',
      data: {
        companyId,
        companyName,
        loanAmount,
        materials,
        product,
        productId,
        projectName,
        userId
      }
    })
  }

}

export {
  useApplyModel
}