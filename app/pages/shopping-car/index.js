import { MyModel } from '../../api/models/my'
const My = new MyModel()

import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		selected: '/imgs/v2/selected.png',
		unSelected: '/imgs/v2/unSelected.png',
		selectedAll: {
			all: 0,
			depreciates: 0,
			failures: 0,
		},
		activeTab: 'all',
		catList: {},
		buyList: [],
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onShow: function (options) {
		My.getMyCar().then(res => {
			;['all', 'depreciates', 'failures'].map(item => {
				res &&
					res[item] &&
					res[item].map((pro, index) => {
						// 无值
						if (!Object.keys(this.data.catList).length) {
							pro.nowCount = pro.count
							pro.nowIsSelect = false
							console.log('没有 count')
						} else {
							// 有值
							if (index > this.data.catList[item].length - 1) {
								// （防止count被覆盖）
								pro.nowCount = pro.count
								pro.nowIsSelect = false
								console.log('xinzhi', index)
							} else {
								pro.nowCount = this.data.catList[item][index].nowCount
								// pro.nowIsSelect = this.data.catList[item][index].nowIsSelect
								pro.nowIsSelect = false
							}
							console.log('有 count')
						}
					})
				res ||
					this.setData({
						selectedAll: {
							all: 0,
							depreciates: 0,
							failures: 0,
						},
						catList: {},
						buyList: [],
					})
			})

			// if (res && !res.nowAllPrice) {
			res &&
				(res.nowAllPrice = {
					all: 0,
					depreciates: 0,
					failures: 0,
				})
			// }

			this.setData({
				selectedAll: {
					all: 0,
					depreciates: 0,
					failures: 0,
				},
			})

			if (res) {
				const temp123 = []
				const tempRes = JSON.parse(JSON.stringify(res))

				tempRes.all &&
					tempRes.all.map((item, index) => {
						let smartName = []
						let temp = JSON.parse(
							JSON.stringify(item.productSkuVo.skuName)
						).split(' ')
						temp.map(child => {
							smartName.push(
								child.split(':')[0].replace(/[\d\.]+$/, '') +
									':' +
									child.split(':')[1]
							)
						})
						console.log(1, smartName)
						smartName = smartName.join(' ')
						item.productSkuVo.smartName = smartName

						temp123.push({
							name: `all@${index}`,
							url: item.productSkuVo.picUrl,
						})

						// Home.getUrl([
						// 	{
						// 		name: index,
						// 		url: item.productSkuVo.picUrl,
						// 	},
						// ]).then(oo => {
						// 	item.productSkuVo.picUrl = oo[0].url
						// 	this.setData({
						// 		catList: res,
						// 	})
						// })
					})

				tempRes.depreciates &&
					tempRes.depreciates.map((item, index) => {
						let smartName = []
						let temp = JSON.parse(
							JSON.stringify(item.productSkuVo.skuName)
						).split(' ')
						temp.map(child => {
							smartName.push(
								child.split(':')[0].replace(/[\d\.]+$/, '') +
									':' +
									child.split(':')[1]
							)
						})
						console.log(1, smartName)
						smartName = smartName.join(' ')
						item.productSkuVo.smartName = smartName
						temp123.push({
							name: `depreciates@${index}`,
							url: item.productSkuVo.picUrl,
						})

						// Home.getUrl([
						// 	{
						// 		name: index,
						// 		url: item.productSkuVo.picUrl,
						// 	},
						// ]).then(oo => {
						// 	item.productSkuVo.picUrl = oo[0].url
						// 	this.setData({
						// 		catList: res,
						// 	})
						// })
					})

				tempRes.failures &&
					tempRes.failures.map((item, index) => {
						let smartName = []
						let temp = JSON.parse(
							JSON.stringify(item.productSkuVo.skuName)
						).split(' ')
						temp.map(child => {
							smartName.push(
								child.split(':')[0].replace(/[\d\.]+$/, '') +
									':' +
									child.split(':')[1]
							)
						})
						console.log(1, smartName)
						smartName = smartName.join(' ')
						item.productSkuVo.smartName = smartName
						temp123.push({
							name: `failures@${index}`,
							url: item.productSkuVo.picUrl,
						})

						// Home.getUrl([
						// 	{
						// 		name: index,
						// 		url: item.productSkuVo.picUrl,
						// 	},
						// ]).then(oo => {
						// 	item.productSkuVo.picUrl = oo[0].url
						// 	this.setData({
						// 		catList: res,
						// 	})
						// })
					})

				console.log(55, tempRes)

				Home.getUrl(temp123).then(oo => {
					oo.map(item=>{
						const type = item.name.split('@')[0]
						const index = item.name.split('@')[1]
						tempRes[type][index].productSkuVo.picUrl = item.url
					})
					this.setData({
						catList: tempRes,
					})
				})
			}
		})
	},

	onTabChange(e) {
		this.setData({
			activeTab: e.detail.name,
		})
	},

	onCountChange(e) {
		let catList = this.data.catList
		catList[this.data.activeTab][e.currentTarget.dataset.index].nowCount =
			e.detail

		this.setData({
			catList,
		})
		this._computeAllPrice()
	},

	switchSelected(e) {
		let catList = this.data.catList
		catList[this.data.activeTab][e.currentTarget.dataset.index].nowIsSelect =
			!catList[this.data.activeTab][e.currentTarget.dataset.index].nowIsSelect

		this.setData({
			catList,
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
				break
			case 1:
				selectedAll[activeTab] = 2
				this._allSelected()
				break
			case 2:
				selectedAll[activeTab] = 0
				this._allUnSelected()
				break
			default:
				break
		}

		this._computeAllPrice()
		this.setData({
			selectedAll,
		})
	},

	handleDelShop(e) {
		My.delCarShop([e.currentTarget.dataset.id]).then(() => {
			this.onShow()
		})
	},

	onBuy() {
		if (!this.data.selectedAll[this.data.activeTab]) {
			wx.showToast({
				title: '未选择商品',
				icon: 'none',
				duration: 2000,
			})
			return
		}

		if (this.data.activeTab === 'failures') {
			wx.showToast({
				title: '商品已失效',
				icon: 'none',
				duration: 2000,
			})
			return
		}

		let buyList = []
		this.data.catList.all &&
			this.data.catList.all.map(item => {
				if (item.nowIsSelect) {
					buyList.push(item)
				}
			})
		this.data.catList.depreciates &&
			this.data.catList.depreciates.map(item => {
				if (item.nowIsSelect) {
					buyList.push(item)
				}
			})

		buyList.map(item => {
			item.productSkuVo.skuName = item.productSkuVo.smartName
		})



		wx.setStorageSync('buyList', buyList)

		wx.navigateTo({
			url: '/pages/buy/index',
		})
	},

	_allSelected() {
		let catList = this.data.catList
		catList[this.data.activeTab] &&
			catList[this.data.activeTab].map(item => {
				item.nowIsSelect = true
			})

		this.setData({
			catList,
		})
	},
	_allUnSelected() {
		let catList = this.data.catList
		catList[this.data.activeTab] &&
			catList[this.data.activeTab].map(item => {
				item.nowIsSelect = false
			})

		this.setData({
			catList,
		})
	},
	_checckAllSelected() {
		let catList = this.data.catList
		let selectedAll = this.data.selectedAll
		let activeTab = this.data.activeTab
		let selected = 0
		let unSelected = 0
		catList[activeTab] &&
			catList[activeTab].map(item => {
				item.nowIsSelect && selected++
				item.nowIsSelect || unSelected++
			})

		if (selected === 0) {
			selectedAll[activeTab] = 0
		} else if (unSelected === 0) {
			selectedAll[activeTab] = 2
		} else {
			selectedAll[activeTab] = 1
		}

		this.setData({
			selectedAll,
		})
	},
	_computeAllPrice() {
		let catList = this.data.catList
		let activeTab = this.data.activeTab
		catList.nowAllPrice[activeTab] = 0
		catList[activeTab] &&
			catList[activeTab].map(item => {
				item.nowIsSelect &&
					(catList.nowAllPrice[activeTab] +=
						(item.productSkuVo.price * 100 * item.nowCount) / 100)
			})

		this.setData({
			catList,
		})
	},
})
