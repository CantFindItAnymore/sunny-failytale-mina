
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
      job: ''
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
    activeSheetType: ''
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
          likeActivity: actionsList.likeActivity.filter(item => (item.value === res.favoriteActivity.toString()))[0],
          likeService: actionsList.likeService.filter(item => (item.value === res.favoriteService.toString()))[0],
          likeEnvironment: actionsList.likeEnvironment.filter(item => (item.value === res.favoriteShopping.toString()))[0],
          likeMethod: actionsList.likeMethod.filter(item => (item.value === res.favoriteShoppingWay.toString()))[0],
          job: actionsList.job.filter(item => (item.value === res.job.toString()))[0]
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
    console.log(this.data.activeSheetType, e.detail)
    this._changeUserInfo(this.data.activeSheetType, e.detail)
    this.setData({
      sheetShow: false
    })
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
      favoriteActivity: this.data.userInfo.likeActivity.value || null,
      favoriteService: this.data.userInfo.likeService.value || null,
      favoriteShopping: this.data.userInfo.likeEnvironment.value || null,
      favoriteShoppingWay: this.data.userInfo.likeMethod.value || null,
      job: this.data.userInfo.job.value || null,
      name: this.data.userInfo.name,
      phoneNumber: this.data.userInfo.mobile,
      sex: this.data.userInfo.sex==='男'?0:(this.data.userInfo.sex==='女'?1:null),
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