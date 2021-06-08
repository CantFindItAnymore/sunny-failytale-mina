import { OrderModel } from '../../api/models/order'
const Order = new OrderModel()

import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		active: 'all',
		allList: [],
		payList: [],
		deliveryList: [],
		receiptList: [],
		finishList: [],
		cancelList: [],
	},

	onLoad(options) {
		options.type &&
			this.setData({
				active: options.type,
			})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onShow: function () {
		Order.getOrder().then(res => {
			const temp123 = []

			;['all', 'pay', 'delivery', 'receipt', 'finish', 'cancel', 'doApply'].map(type => {
				res &&
					res[type] &&
					res[type].map((item, index) => {
						item.skuList.map((oo, num) => {
							let smartName = []
							let temp = JSON.parse(JSON.stringify(oo.skuName)).split(' ')
							temp.map(child => {
								smartName.push(
									child.split(':')[0].replace(/[\d\.]+$/, '') +
										':' +
										child.split(':')[1]
								)
							})
							smartName = smartName.join(' ')
							oo.smartName = smartName

							// oo.currentPic = oo.productMainPicUrl

							temp123.push({
								url: oo.productMainPicUrl,
								name: `${type}@${index}`,
							})
						})
					})
			})

			console.log('temp', temp123)

			Home.getUrl(temp123).then(rr => {

				console.log('rr', rr)

				rr.map(item => {
					const type = item.name.split('@')[0]
					const index = item.name.split('@')[1]

					res[type][index].skuList[0].currentPic = item.url
				})
				this.setData({
					allList: res.all,
					payList: res.pay,
					deliveryList: res.delivery,
					receiptList: res.receipt,
					finishList: res.finish,
					cancelList: res.cancel,
					doApplyList: res.doApply
				})
			})
		})
	},

	onClickTab(e) {
		this.setData({
			active: e.detail.name,
		})
	},

	refresh() {
		this.onShow()
	},
})
