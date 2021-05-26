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
			;['all', 'pay', 'delivery', 'receipt', 'finish', 'cancel'].map(type => {
				res &&
					res[type] &&
					res[type].map(item => {
						item.skuList.map((oo, num) => {

							let smartName = []
							let temp = JSON.parse(
								JSON.stringify(oo.skuName)
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
							oo.smartName = smartName

							// oo.currentPic = oo.productMainPicUrl

							Home.getUrl([
								{
									name: num,
									url: oo.productMainPicUrl,
								},
							]).then(rr => {
								oo.currentPic = rr[0].url

								this.setData({
									allList: res.all,
									payList: res.pay,
									deliveryList: res.delivery,
									receiptList: res.receipt,
									finishList: res.finish,
									cancelList: res.cancel,
								})
							})
						})
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

