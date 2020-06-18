
import {timestampToTime} from '../../utils/util'
import {actionsList} from '../../utils/common-json/person'

import {UserModel} from '../../api/models/user'

const User = new UserModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: '',
      mobile: '',
      sex: '',
      sexShow: false,
      birthday: '',
      likeActivity: '',
      likeService: '',
      likeEnvironment: '',
      likeMethod: '',
      job: '',
      where: '',
      pet: ''
    },
    typeDesc: {
      likeActivity: '喜欢的活动',
      likeService: '喜欢的服务',
      likeEnvironment: '喜欢的购物环境',
      likeMethod: '喜欢的购物方式',
      job: '工作',
      where: '从哪里了解到我们',
      pet: '宠物'
    },
    babyInfo: {
      name: '',
      sex: '',
      sexShow: false,
      height: '',
      birthday: ''
    },
    activeRole: '',
    // 时间
    datePickerShow: false,
    currentDate: new Date().getTime(),
    minDate: 0,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    // 上拉框
    sheetShow: false,
    actions: [],
    activeSheetType: '',

    // 其他
    editShow: false,
    editContent: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    User.getUserInfo()
      .then(res => {
        console.log(res)
        let userInfo = {
          name: res.name,
          mobile: res.phoneNumber,
          sex: res.sex === 1?'女':(res.sex === 0?'男':''),
          sexShow: false,
          birthday: res.birthday,
          likeActivity: {name: res.favoriteActivity || ''},
          likeService: {name: res.favoriteService || ''},
          likeEnvironment: {name: res.favoriteShopping || ''},
          likeMethod: {name: res.favoriteShoppingWay || ''},
          job: {name: res.job || ''},
          where: {name: res.channel || ''},
          pet: {name: res.pet || ''},
        }

        let babyInfo = {
          name: res.babyName,
          sex: res.babySex === 1?'女':(res.babySex === 0?'男':''),
          sexShow: false,
          height: res.babyHeight,
          birthday: res.babyBirthday
        }
        this.setData({
          userInfo,
          babyInfo
        })
      })
  },

  onUserInfoChange(e) {
    this._changeUserInfo(e.currentTarget.dataset.type, e.detail)
  },

  onBabyInfoChange(e) {
    this._changeBabyInfo(e.currentTarget.dataset.type, e.detail)
  },

  switchSex(e) {
    const {role} = e.currentTarget.dataset
    role==='user' && this._changeUserInfo('sexShow', !this.data.userInfo.sexShow)
    role==='baby' && this._changeBabyInfo('sexShow', !this.data.babyInfo.sexShow)
  },

  handleSwitchSex(e) {
    const {role} = e.currentTarget.dataset
    role==='user' && this._changeUserInfo('sex', e.currentTarget.dataset.name)
    role==='user' && this._changeUserInfo('sexShow', false)

    role==='baby' && this._changeBabyInfo('sex', e.currentTarget.dataset.name)
    role==='baby' && this._changeBabyInfo('sexShow', false)
  },

  openDatePicker(e) {
    this.setData({
      activeRole: e.currentTarget.dataset.role,
      datePickerShow: true
    })
  },

  openSheet(e) {
    this.setData({
      actions: actionsList[e.currentTarget.dataset.type],
      activeSheetType: e.currentTarget.dataset.type,
      sheetShow: true
    })
  },

  closeDatePicker() {
    this.setData({
      datePickerShow: false
    })
  },

  closeSheet() {
    this.setData({
      sheetShow: false
    })
  },

  selectedSheet(e) {

    if (e.detail.name === '其他') {
      this.setData({
        editShow: true,
        editContent: null,
        sheetShow: false
      })
    } else {
      console.log(this.data.activeSheetType, e.detail)
      this._changeUserInfo(this.data.activeSheetType, e.detail)
      this.setData({
        sheetShow: false
      })
    }
  },

  confirmDatePicker(e) {
    this.data.activeRole==='user' && this._changeUserInfo('birthday', timestampToTime(e.detail))
    this.data.activeRole==='baby' && this._changeBabyInfo('birthday', timestampToTime(e.detail))
    this.setData({
      datePickerShow: false
    })
  },

  handleConfirm() {
    if (!this.data.userInfo.mobile) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    User.auth({
      babyBirthday: this.data.babyInfo.birthday,
      babyHeight: this.data.babyInfo.height,
      babyName: this.data.babyInfo.name,
      babySex: this.data.babyInfo.sex==='男'?0:(this.data.babyInfo.sex==='女'?1:null),
      birthday: this.data.userInfo.birthday,
      favoriteActivity: this.data.userInfo.likeActivity.name || null,
      favoriteService: this.data.userInfo.likeService.name || null,
      favoriteShopping: this.data.userInfo.likeEnvironment.name || null,
      favoriteShoppingWay: this.data.userInfo.likeMethod.name || null,
      job: this.data.userInfo.job.name || null,
      name: this.data.userInfo.name,
      phoneNumber: this.data.userInfo.mobile,
      sex: this.data.userInfo.sex==='男'?0:(this.data.userInfo.sex==='女'?1:null),
      channel: this.data.userInfo.where.name || null,
      pet: this.data.userInfo.pet.name || null,
    })
      .then(() => {
        wx.showToast({
          title: '认证成功',
          icon: 'none',
          duration: 2000
        })

        setTimeout(() => {
          wx.switchTab({
            url: '/pages/home/index'
          })
        }, 1000)
      })
  },

  onEditCancel () {
    this.setData({
      editShow: false
    })
  },

  onEditChange(e) {
    this.setData({
      editContent: {
        name: e.detail
      }
    })
  },

  onEditConfirm (e) {
    this._changeUserInfo(this.data.activeSheetType, this.data.editContent)
  },

  _changeUserInfo(field, changedField) {
    let userInfo = this.data.userInfo
    userInfo[field] = changedField
    this.setData({
      userInfo
    })
  },

  _changeBabyInfo(field, changedField) {
    let babyInfo = this.data.babyInfo
    babyInfo[field] = changedField
    this.setData({
      babyInfo
    })
  }
})