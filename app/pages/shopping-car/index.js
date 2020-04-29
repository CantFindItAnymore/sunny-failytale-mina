import { MyModel } from '../../api/models/my'
const My = new MyModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: '/imgs/selected.png',
    unSelected: '/imgs/unSelected.png',
    selectedAll: {
      all: 0,
      depreciates: 0,
      failures: 0
    },
    activeTab: 'all',
    catList: {},
    buyList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    My.getMyCar()
      .then(res => {
        ['all', 'depreciates', 'failures'].map(item => {
          res[item] && res[item].map((pro, index) => {
            if (!Object.keys(this.data.catList).length) {
              pro.nowCount = 1
              pro.nowIsSelect = false
              console.log('没有 count')
            } else {
              pro.nowCount = this.data.catList[item][index].nowCount
              pro.nowIsSelect = this.data.catList[item][index].nowIsSelect
              console.log('有 count')
            }
          })
        })

        res.nowAllPrice || (res.nowAllPrice = {
          all: 0,
          depreciates: 0,
          failures: 0
        })

        this.setData({
          catList: res
        })
      })
  },

  onTabChange(e) {
    this.setData({
      activeTab: e.detail.name
    })
  },

  onCountChange(e) {
    let catList = this.data.catList
    catList[this.data.activeTab][e.currentTarget.dataset.index].nowCount = e.detail

    this.setData({
      catList
    })
    this._computeAllPrice()
  },

  switchSelected(e) {
    let catList = this.data.catList
    catList[this.data.activeTab][e.currentTarget.dataset.index].nowIsSelect = !catList[this.data.activeTab][e.currentTarget.dataset.index].nowIsSelect

    this.setData({
      catList
    })
    this._checckAllSelected()
    this._computeAllPrice()
  },

  switchSelectAll() {
    let selectedAll = this.data.selectedAll
    let activeTab = this.data.activeTab
    switch (selectedAll[activeTab]) {
      case 0:
        selectedAll[activeTab] = 2
        this._allSelected()
        break;
      case 1:
        selectedAll[activeTab] = 2
        this._allSelected()
        break;
      case 2:
        selectedAll[activeTab] = 0
        this._allUnSelected()
        break;
      default:
        break;
    }
    
    this._computeAllPrice()
    this.setData({
      selectedAll
    })
  },

  handleDelShop(e) {
    My.delCarShop([e.currentTarget.dataset.id])
      .then(() => {
        this.onShow()
      })
  },

  onBuy() {
    if (!this.data.selectedAll[this.data.activeTab]) {
      wx.showToast({
        title: '未选择商品',
        icon: 'none',
        duration: 2000
      })
      return
    }

    if (this.data.activeTab === 'failures') {
      wx.showToast({
        title: '商品已失效',
        icon: 'none',
        duration: 2000
      })
      return
    }

    wx.navigateTo({
      url: '/pages/buy/index'
    })
  },


  _allSelected() {
    let catList = this.data.catList
    catList[this.data.activeTab] && catList[this.data.activeTab].map(item => {
      item.nowIsSelect = true
    })

    this.setData({
      catList
    })
  },
  _allUnSelected() {
    let catList = this.data.catList
    catList[this.data.activeTab] && catList[this.data.activeTab].map(item => {
      item.nowIsSelect = false
    })

    this.setData({
      catList
    })
  },
  _checckAllSelected() {
    let catList = this.data.catList
    let selectedAll = this.data.selectedAll
    let activeTab = this.data.activeTab
    let selected = 0
    let unSelected = 0
    catList[activeTab] && catList[activeTab].map(item => {
      item.nowIsSelect && selected++
      item.nowIsSelect || unSelected++
    })

    if (selected === 0) {
      selectedAll[activeTab] = 0
    }
    else if(unSelected === 0) {
      selectedAll[activeTab] = 2
    }
    else {
      selectedAll[activeTab] = 1
    }

    this.setData({
      selectedAll
    })
  },
  _computeAllPrice() {
    let catList = this.data.catList
    let activeTab = this.data.activeTab
    catList.nowAllPrice[activeTab] = 0
    catList[activeTab] && catList[activeTab].map(item => {
      item.nowIsSelect && (catList.nowAllPrice[activeTab] += item.productSkuVo.price * item.nowCount)
    })

    this.setData({
      catList
    })
  }
})