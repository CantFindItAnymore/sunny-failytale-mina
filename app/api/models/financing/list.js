import {
  HTTP
} from '../../http.js'

class financingListModel extends HTTP {

  // 获取公司列表
  getCompanyList(status) {
    return this.request({
      url: 'api-order/credit/user',
      data: {
        status
      }
    })
  }

  // 获取 单子列表
  getList({ companyIds = []}) {
    return this.request({
      url: 'api-order/loan/orders',
      method: 'POST',
      // type: 'json',
      data: {
        companyIds
      }
    })
  }

  // 获取 单子详情
  getDetail(company) {
    return this.request({
      url: 'api-order/loan/orders/details',
      method: 'POST',
      type: 'json',
      data: company
    })
  }

  // 获取月度/季度状况
  getCondition({ companyId, type = 0 }) {
    return this.request({
      url: `api-user/management/get/company/${companyId}`,
      data: {
        type
      }
    })
  }

  // 添加月度
  addMonthTarget({
    companyId,
    dataPath,
    description,
    fieldType,
    status,
    type=0,
    successfulBid = null,
    statisticsStart = null,
    statisticsEnd = null
  }) {
    return this.request({
      url: 'api-user/management/add/company/loan',
      method: 'POST',
      type: 'json',
      data: {
        companyId,
        dataPath,
        description,
        fieldType,
        status,
        type,
        successfulBid,
        statisticsStart,
        statisticsEnd
      }
    })
  }

  // 修改月度
  editMonthTarget({
    companyId,
    dataPath,
    description,
    fieldType,
    status,
    type = 0,
    id='',
    successfulBid=null,
    statisticsStart=null,
    statisticsEnd=null
  }) {
    return this.request({
      url: 'api-user/management/update/company/loan',
      method: 'POST',
      type: 'json',
      data: {
        companyId,
        dataPath,
        description,
        fieldType,
        status,
        type,
        id,
        successfulBid,
        statisticsStart,
        statisticsEnd
      }
    })
  }

  // 添加季度
  addQuarterTarget({
    companyId,
    dataPath=null,
    description=null,
    fieldType,
    status=null,
    type=1,
    successfulBid = null,
    statisticsStart = null,
    statisticsEnd = null,
    financingStatus=null
  }) {
    return this.request({
      url: 'api-user/management/add/company/loan',
      method: 'POST',
      type: 'json',
      data: {
        companyId,
        dataPath,
        description,
        fieldType,
        status,
        type,
        successfulBid,
        statisticsStart,
        statisticsEnd,
        financingStatus
      }
    })
  }

  // 修改季度
  editQuarterTarget({
    companyId,
    dataPath=null,
    description=null,
    fieldType,
    status=null,
    type = 1,
    id='',
    successfulBid=null,
    statisticsStart=null,
    statisticsEnd=null,
    financingStatus=null
  }) {
    return this.request({
      url: 'api-user/management/update/company/loan',
      method: 'POST',
      type: 'json',
      data: {
        companyId,
        dataPath,
        description,
        fieldType,
        status,
        type,
        id,
        successfulBid,
        statisticsStart,
        statisticsEnd,
        financingStatus
      }
    })
  }
}

export {
  financingListModel
}