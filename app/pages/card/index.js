import { CardModel } from '../../api/models/card'
const Card = new CardModel()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		selected: '/imgs/selected.png',
		unSelected: '/imgs/unSelected.png',
		lose: '/imgs/lose.png',
		used: '/imgs/used.png',
		rabish: '/imgs/rabish.png',
		current: 1,
		cardList: [],
		okList: [],
		usedList: [],
		losedList: [],
		rabishList: [],
		active: '',

		// buyPage来的
		from: null,
		selectedCard: null,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		const { from } = options
		from &&
			this.setData({
				from,
			})
	},

	onShow: function () {
		this._getCard()
	},

	onClickTab(e) {
		this.setData({
			active: e.detail,
		})
	},

	handleSelectCard(e) {
		console.log(11, e.currentTarget.dataset.index)
		console.log(
			12,
			this.data.from,
			this.data.okList[e.currentTarget.dataset.index].flag
		)
		if (
			this.data.from === 'buyPage'
			// && this.data.okList[e.currentTarget.dataset.index].flag
		) {
			this.setData({
				selectedCard: e.currentTarget.dataset.index,
			})
			wx.setStorageSync(
				'selectedCard',
				this.data.okList[e.currentTarget.dataset.index]
			)
			setTimeout(() => {
				wx.navigateBack({
					delta: 1,
				})
			}, 500)
		}
	},

	_getCard() {
		Card.getCard({
			current: this.data.current,
			status: this.data.from === 'buy' ? 1: null
		}).then(res => {
			if (this.data.from === 'buyPage') {
				// 检查可用性
				let skuList = []
				let originSkuList = wx.getStorageSync('buyList')
				originSkuList.map(item => {
					skuList.push({
						amount: item.nowCount,
						price: item.addPrice,
						productId: item.productId,
						productMainPicUrl: item.productSkuVo.mainPicUrl,
						productName: item.productSkuVo.name,
						productType: item.productSkuVo.productType,
						skuId: item.productSkuVo.skuId,
						skuName: item.productSkuVo.skuName,
						skuPicUrl: item.productSkuVo.picUrl,
					})
				})

				res.data.map((item, index) => {
					Card.checkCard({
						invalidTime: item.invalidTime,
						productTypes: item.productTypeVos,
						skuList,
						validPrice: item.validPrice,
						validTime: item.validTime,
					}).then(end => {
						item.flag = end.flag
						if (index === res.data.length - 1) {
							this.setData({
								cardList: res,
							})

							let okList = this.data.okList
							let usedList = this.data.usedList
							let losedList = this.data.losedList
							let rabishList = this.data.rabishList
							res.data.map(item => {
								if (item.status === 0) {
									okList.push(item)
								} else if (item.status === 1) {
									usedList.push(item)
								} else if (item.status === 2) {
									losedList.push(item)
								} else if (item.status === 3) {
									rabishList.push(item)
								}
							})

							this.setData({
								okList,
								usedList,
								losedList,
								rabishList,
								current: this.data.current + 1,
							})

							if (this.data.cardList.next) {
								this._getCard()
							}
						}
					})
				})
			} else {
				// 正常进入
				console.log('888', res)
				this.setData({
					cardList: res,
				})

				let okList = this.data.okList
				let usedList = this.data.usedList
				let losedList = this.data.losedList
				let rabishList = this.data.rabishList
				res.data.map((item, index) => {
					if (item.status === 0) {
						okList.push(item)
					} else if (item.status === 1) {
						usedList.push(item)
					} else if (item.status === 2) {
						losedList.push(item)
					} else if (item.status === 3) {
						rabishList.push(item)
					}
				})

				this.setData({
					okList,
					usedList,
					losedList,
					rabishList,
					current: this.data.current + 1,
				})

				if (this.data.cardList.next) {
					this._getCard()
				}
			}
		})
	},
})
