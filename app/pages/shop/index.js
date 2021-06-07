import { ShopModel } from '../../api/models/shop'

const Shop = new ShopModel()

import { CollectionModel } from '../../api/models/collection'
const Collection = new CollectionModel()

import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		classify: '',
		list: [],
		likeList: [],
		likedIdList: [],
		like: '/imgs/v2/like.png',
		unLike: '/imgs/v2/unLike.png',

		pid: null,
		key: '',
		type: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let { pid, key, type } = options

		this.setData({
			type,
		})

		if (pid && pid !== 'undefined' && !Array.isArray(pid)) {
			pid = pid.split(',')
		} else {
			pid = []
		}

		this.setData({
			pid,
		})

		if (key && key !== 'undefined') {
			this.setData({
				key,
			})
		}

		if (type === 'new') {
			this.setData({
				classify: '新品上新',
			})
		} else if (type === 'hot') {
			this.setData({
				classify: '热销榜单',
			})
		} else if (type === 'line' || type === 'carousel') {
			this.setData({
				classify: '',
			})
		} else {
			this.setData({
				classify: wx.getStorageSync('classify'),
			})
		}

		// 新品||热销
		let descs = []
		let tempPid = ''
		if (type === 'new') {
			descs.push('on_sale_time')
			tempPid = ['35']
		}
		if (type === 'hot') {
			descs.push('sales_volume')
			tempPid = ['34']
		}
		Shop.getShop({
			productType: type === 'new' || type === 'hot' ? tempPid : this.data.pid,
			keyword: this.data.key,
			descs,
		}).then(res => {
			console.log(989, res.data)
			const temp = []

			res.data.map((item, index) => {
				temp.push({
					name: index,
					url: item.mainPicUrl,
				})
				// Home.getUrl([
				// 	{
				// 		name: index,
				// 		url: item.mainPicUrl,
				// 	},
				// ]).then(oo => {
				// 	item.mainPicUrl = oo[0].url
				// 	console.log(66, res)
				// 	this.setData({
				// 		list: res,
				// 	})
				// })
			})

			Home.getUrl(temp).then(res1 => {
				res1.map(item => {
					res.data[item.name].mainPicUrl = item.url
				})
				this.setData({
					list: res,
				})
			})
		})

		this._getCollection()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		if (this.data.list.current >= this.data.list.pages) {
			wx.showToast({
				title: '没有更多啦~',
				icon: 'none',
				duration: 2000,
			})
			return
		}

		let descs = []
		let tempPid = ''
		if (this.data.type === 'new') {
			descs.push('on_sale_time')
			tempPid = ['35']
		}
		if (this.data.type === 'hot') {
			descs.push('sales_volume')
			tempPid = ['34']
		}
		Shop.getShop({
			productType:
				this.data.type === 'new' || this.data.type === 'hot'
					? tempPid
					: this.data.pid,
			keyword: this.data.key,
			current: this.data.list.current + 1,
			descs,
		}).then(res => {

			const temp = []

			res.data.map((item, index) => {
				temp.push({
					name: index,
					url: item.mainPicUrl,
				})
				// Home.getUrl([
				// 	{
				// 		name: index,
				// 		url: item.mainPicUrl,
				// 	},
				// ]).then(oo => {
				// 	item.mainPicUrl = oo[0].url
				// 	console.log(66, res)
				// 	this.setData({
				// 		list: res,
				// 	})
				// })
			})

			Home.getUrl(temp).then(res1 => {
				res1.map(item => {
					res.data[item.name].mainPicUrl = item.url
				})
				res.data = [...this.data.list.data, ...res.data]
				this.setData({
					list: res,
				})
			})

			// res.data.map((item, index) => {
			// 	Home.getUrl([
			// 		{
			// 			name: index,
			// 			url: item.mainPicUrl,
			// 		},
			// 	]).then(oo => {
			// 		item.mainPicUrl = oo[0].url
			// 		if (index === res.data.length - 1) {
			// 			res.data = [...this.data.list.data, ...res.data]
			// 			this.setData({
			// 				list: res,
			// 			})

			// 			this._getCollection()
			// 		}
			// 	})
			// })


		})
	},

	toSearch() {
		wx.navigateTo({
			url: '/pages/search/index',
		})
	},

	switchCollect(e) {
		const { cid, is } = e.currentTarget.dataset

		console.log(is)

		is ||
			Collection.addCollection(cid).then(res => {
				this._getCollection()
			})

		if (is) {
			const delIds = []
			this.data.likeList.map(item => {
				if (item.productId === cid) {
					delIds.push(item.id)
				}
			})
			Collection.delCollection(delIds).then(res => {
				this._getCollection()
			})
		}
	},

	toShopDetail(e) {
		wx.navigateTo({
			url: '/pages/goods-detail/index?gid=' + e.currentTarget.dataset.gid,
		})
	},

	_getCollection() {
		// 获取收藏 // 没有登陆/认证就不去拿
		wx.getStorageSync('token') &&
			Collection.getCollection().then(res => {
				let likedIdList = []
				res &&
					res.all &&
					res.all.map(item => {
						likedIdList.push(item.productId)
					})

				res &&
					res.all &&
					this.setData({
						likeList: res.all,
					})

				this.setData({
					likedIdList,
				})
			})
	},
})
