// components/classify-children/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toShop (e) {
      const id = e.currentTarget.dataset.id
      const classify = e.currentTarget.dataset.classify

      wx.setStorageSync('classify', classify)
      this.triggerEvent('toShop', {
        id
      }, {})
    }
  }
})
