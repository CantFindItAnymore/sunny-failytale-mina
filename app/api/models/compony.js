import {
  HTTP
} from '../http.js'

class ComponyModel extends HTTP {

  addOrder(
    {
      address,
      amount,
      // areaId,
      // areaName,
      category,
      companyId,
      companyName,
      endDate,
      grorderMaterials,
      patternType,
      product,
      projectName,
      projectProvider,
      receiver,
      recevierTelephone,
      remark,
      startDate,
      userId,
      term
    }
  ) {
    return this.request({
      url: 'api-order/guarantee/add',
      method: 'POST',
      type: 'json',
      data: {
        address,
        amount,
        // areaId,
        // areaName,
        category,
        companyId,
        companyName,
        endDate,
        grorderMaterials,
        patternType,
        product,
        projectName,
        projectProvider,
        receiver,
        recevierTelephone,
        remark,
        startDate,
        userId,
        term
      }
    })
  }

  getUrl(fileName, uploadUrl) {
    return this.request({
      url: `api-file/oss/${uploadUrl}/url`,
      data: {
        fileName
      }
    })
  }

  addCompony(
    {
      companyName,
      creditCode,
      legalPerson,
      legalPersonId,
      companyMaterials,
      contactPerson,
      contactNumber,
      address
    } = {}
  ) {
    return this.request({
      url: `api-user/admin/company/save`,
      method: 'POST',
      type: 'json',
      data: {
        companyName,
        creditCode,
        legalPerson,
        legalPersonId,
        companyMaterials,
        contactPerson,
        contactNumber,
        address
      }
    })
  }

}

export {
  ComponyModel
}
