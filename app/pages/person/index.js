
import {timestampToTime} from '../../utils/util'
import {actionsList} from '../../utils/common-json/person'

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
      Job: ''
    },
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

  },

  onUserInfoChange(e) {
    this._changeUserInfo(e.currentTarget.dataset.type, e.detail)
  },

  switchSex() {
    this._changeUserInfo('sexShow', !this.data.userInfo.sexShow)
  },

  handleSwitchSex(e) {
    this._changeUserInfo('sex', e.currentTarget.dataset.name)
    this._changeUserInfo('sexShow', false)
  },

  openDatePicker() {
    this.setData({
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
    this._changeUserInfo('birthday', timestampToTime(e.detail))
    this.setData({
      datePickerShow: false
    })
  },

  _changeUserInfo(field, changedField) {
    let userInfo = this.data.userInfo
    userInfo[field] = changedField
    this.setData({
      userInfo
    })
  }
})