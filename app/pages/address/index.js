import { MyModel } from '../../api/models/my'
import areaList from '../../utils/common-json/area'
const My = new MyModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: [],
    list: [1,2,{isDefault: true}],
    dialogShow: false,
    activeIndex: null,
    addressInfo: {
      name: '',
      mobile: '',
      areaAddress: {
        code: '',
        name: ''
      },
      address: ''
    },
    areaShow: false,
    areaList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    My.getMyAddress()
      .then(res => {
        this.setData({
          addressList: res
        })
      })
  },

  onChange(e) {
    let addressInfo = this.data.addressInfo
    addressInfo[e.currentTarget.dataset.type] = e.detail
    this.setData({
      addressInfo
    })
  },

  openDialog(e) {
    if (e.currentTarget.dataset.index === this.data.activeIndex) {
      this.setData({
        dialogShow: true
      })
    } else {
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        addressInfo: e.currentTarget.dataset.index >= 0 ? {
          name: this.data.addressList[e.currentTarget.dataset.index].userName,
          mobile: this.data.addressList[e.currentTarget.dataset.index].phoneNumber,
          areaAddress: {
            code: this.data.addressList[e.currentTarget.dataset.index].areaPath,
            name: this.data.addressList[e.currentTarget.dataset.index].areaAddress
          },
          address: this.data.addressList[e.currentTarget.dataset.index].address
        } : {
          name: '',
          mobile: '',
          areaAddress: {
            code: '',
            name: ''
          },
          address: ''
        },
        dialogShow: true
      })
    }
  },

  showArea() {
    this.setData({
      areaShow: true
    })
  },

  onAreaClose() {
    this.setData({
      areaShow: false
    })
  },

  handleConfirmArea(e) {
    console.log(e.detail.values)
    let code = '.'
    let name = ''
    e.detail.values.map(item => {
      code += `${item.code}.`
      name += `${item.name} `
    })
    name = name.substring(0, name.length - 1)

    let addressInfo = this.data.addressInfo
    addressInfo.areaAddress.name = name
    addressInfo.areaAddress.code = code

    this.setData({
      addressInfo,
      areaShow: false
    })

  },

  handleDelAddress(e) {
    My.delAddress([e.currentTarget.dataset.id])
      .then(() => {
        this.onLoad()
      })
  },

  onClose() {
    this.setData({
      dialogShow: false
    })
  },

  setDefault(e) {
    My.defaultAddress(e.currentTarget.dataset.id)
      .then(() => {
        this.setData({
          addressInfo: {
            name: '',
            mobile: '',
            areaAddress: {
              code: '',
              name: ''
            },
            address: ''
          }
        })
        this.onLoad()
      })
  },

  onConfirm() {
    if (!this.data.addressInfo.address) {
      wx.showToast({
        title: '详细地址不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!this.data.addressInfo.areaAddress.name) {
      wx.showToast({
        title: '区域地址不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!this.data.addressInfo.mobile) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!this.data.addressInfo.name) {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.activeIndex < 0) {
      // 新增
      My.addAddress({
        address: this.data.addressInfo.address,
        areaAddress: this.data.addressInfo.areaAddress.name,
        areaPath: this.data.addressInfo.areaAddress.code,
        phoneNumber: this.data.addressInfo.mobile,
        userName: this.data.addressInfo.name,
      })
        .then(() => {
          this.setData({
            dialogShow: false
          })
          this.onLoad()
        })
    } else {
      // 编辑
      My.editAddress({
        address: this.data.addressInfo.address,
        areaAddress: this.data.addressInfo.areaAddress.name,
        areaPath: this.data.addressInfo.areaAddress.code,
        phoneNumber: this.data.addressInfo.mobile,
        userName: this.data.addressInfo.name,
        id: this.data.addressList[this.data.activeIndex].id
      })
        .then(() => {
          this.setData({
            dialogShow: false
          })
          this.onLoad()
        })
    }
  }
})