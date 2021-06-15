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
		gid: '',
		detail: {},
		sku: {},
		comments: [],
		likeList: [],
		likedIdList: [],
		like: '/imgs/v2/like.png',
		unLike: '/imgs/v2/unLike.png',
		skuShow: false,
		skuInfo: {
			url: '',
			price: null,
			selectedSkuName: '',
			smartSelectedSkuInfo: '',
			// 库存
			remainStoreNum: 0,
			count: 1,
			skuId: null,
			props: {
				propId: '',
			},
		},
		// 分享
		showShare: false,
		shareResultShow: false,
		painting: {},
		shareImage: '',
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		wx.showShareMenu({
			withShareTicket: true,
			menus: ['shareAppMessage', 'shareTimeline'],
		})
		// options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    const scene = decodeURIComponent(options.scene)
		const gid = options.gid || scene
		console.log(gid)
		this.setData({
			gid,
		})
		Shop.getDetail(gid).then(res => {
			console.log('getDetail', res)

			const temp = [
				{
					name: 'mainPicUrl',
					url: res.mainPicUrl,
				},
			]

			res.carouselPics.map(item => {
				temp.push({
					name: 'carouselPics',
					url: item.url,
				})
			})

			res.detailPics.map(item => {
				temp.push({
					name: 'detailPics',
					url: item.url,
				})
			})

			const a = []
			const b = []

			Home.getUrl(temp).then(res1 => {
				res1.map(item => {
					if (item.name === 'mainPicUrl') {
						res.linMainPicUrl = item
					} else if (item.name === 'carouselPics') {
						a.push(item)
					} else if (item.name === 'detailPics') {
						b.push(item)
					}
				})
				res.carouselPics = a
				res.detailPics = b
				this.setData({
					detail: res,
				})
			})
		})

		// 收藏
		this._getCollection()
		// sku
		Shop.gwtShopSKU(gid).then(res => {
			console.log(1, res)

			res.skuProps.map(item => {
				item.smartName = item.name.replace(/[\d\.]+$/, '')
			})

			console.log(2, res)

			this.setData({
				sku: res,
			})

			// 给skuInfo添加相关属性
			let skuInfo = this.data.skuInfo

			res.skuProps.map(item => {
				skuInfo.props[item.name] = {
					skuName: '',
					skuId: null,
				}
			})

			this.setData({
				skuInfo,
			})
		})
		//评论
		Shop.getComment(gid).then(res => {
			console.log(res)
			this.setData({
				comments: res,
			})
		})
	},

	handleShare() {
		this.setData({
			showShare: true,
		})
	},

	handleCreateBill() {
		const _this = this
		const url = this.data.detail.carouselPics[1].url.replace('http:', 'https:')

		wx.request({
			url: 'https://sunnyfairytale.com/v1/mall/wechat/share/getPic',
			method: 'POST',
			data: {
				auto_color: true,
				is_hyaline: true,
				page: 'pages/goods-detail/index',
				scene: _this.data.gid,
				width: '40',
			},
			success: res => {
				const codeUrl = res.data.replace('http:', 'https:')
				_this.setData({
					painting: {
						width: 300,
						height: 500,
						clear: true,
						backGroundColor: '#fff',
						views: [
							{
								type: 'rect',
								top: 0,
								left: 0,
								width: 300,
								height: 500,
								background: '#fff',
							},
							{
								type: 'image',
								url: url,
								top: 0,
								left: 0,
								width: 305,
								height: 400,
							},
							{
								type: 'text',
								content: `￥ ${_this.data.detail.minPrice}`,
								fontSize: 18,
								bolder: true,
								color: '#414141',
								textAlign: 'left',
								lineHeight: 20,
								top: 410,
								left: 20,
								MaxLineNumber: 1,
								width: 160,
							},
							{
								type: 'text',
								content: _this.data.detail.name,
								fontSize: 12,
								color: '#000',
								textAlign: 'left',
								lineHeight: 25,
								top: 440,
								left: 20,
								MaxLineNumber: 2,
								breakWord: true,
								width: 160,
							},
							{
								type: 'image',
								url: codeUrl,
								top: 425,
								left: 220,
								width: 60,
								height: 60,
							},
						],
					},
					showShare: false,
					shareResultShow: true,
				})
			},
		})

		// Shop.getShareQrCode(this.data.gid).then(res => {
		// 	console.log(res)
		// })

		wx.showLoading({
			title: '生成海报中',
			mask: true,
		})
	},

	onRSClose() {
		this.setData({
			shareResultShow: false,
			painting: {},
		})
	},

	eventSave() {
		wx.saveImageToPhotosAlbum({
			filePath: this.data.shareImage,
			success(res) {
				wx.showToast({
					title: '保存图片成功',
					icon: 'success',
					duration: 2000,
				})
			},
		})
	},
	eventGetImage(event) {
		console.log(event)
		wx.hideLoading()
		const { tempFilePath, errMsg } = event.detail
		if (errMsg === 'canvasdrawer:ok') {
			this.setData({
				shareImage: tempFilePath,
			})
		} else {
			console.log(55555)
		}
	},

	saveBill() {
		wx.saveImageToPhotosAlbum({
			filePath: this.data.shareImage,
			success(res) {
				wx.showToast({
					title: '保存图片成功',
					icon: 'success',
					duration: 2000,
				})
			},
			fail() {
				wx.showToast({
					title: '保存图片失败',
					icon: 'error',
					duration: 2000,
				})
			},
		})
	},

	onClose() {
		this.setData({
			showShare: false,
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

	toShopCar() {
		wx.switchTab({
			url: '/pages/shopping-car/index',
		})
	},

	openSku(e) {
		this.setData({
			activeBuyType: e.currentTarget.dataset.type,
			skuShow: true,
		})
	},

	closeSku() {
		this.setData({
			skuShow: false,
		})
	},

	handleSelectSku(e) {
		const { skuprop, skuname, skuid } = e.currentTarget.dataset
		console.log(skuprop, skuname, skuid)

		// 选中
		let skuInfo = this.data.skuInfo
		skuInfo.props[skuprop]['skuName'] = skuname
		skuInfo.props[skuprop]['skuId'] = skuid
		this.setData({
			skuInfo,
		})

		console.log(9, skuInfo)

		// 全部选中后匹配sku
		let selectedSkuIds = []
		let selectedSkuName = []
		console.log(10, this.data.skuInfo.props)
		for (const key in this.data.skuInfo.props) {
			console.log(10.5, this.data.skuInfo.props[key])
			if (this.data.skuInfo.props[key].skuId) {
				selectedSkuIds.push(`${this.data.skuInfo.props[key].skuId}`)
			}
			if (this.data.skuInfo.props[key].skuName) {
				selectedSkuName.push(`${key}:${this.data.skuInfo.props[key].skuName}`)
			}
		}

		let smartSelectedSkuInfo = []
		let skuName = JSON.parse(JSON.stringify(selectedSkuName))
		skuName.map(item => {
			smartSelectedSkuInfo.push(
				item.split(':')[0].replace(/[\d\.]+$/, '') + ':' + item.split(':')[1]
			)
		})
		smartSelectedSkuInfo = smartSelectedSkuInfo.join(' ')
		selectedSkuName = selectedSkuName.join(' ')

		// selectedSkuIds = selectedSkuIds.sort().join(',')

		console.log(11, selectedSkuIds, this.data.sku.skuOptGroup)

		this.data.sku.skuOptGroup.map(item => {
			console.log(-1, item.skuPropOpts.split(','))
			if (this._isSameArr(item.skuPropOpts.split(','), selectedSkuIds)) {
				console.log('匹配到sku了', item.skuPropOpts.split(','), selectedSkuIds)
				let skuInfo = this.data.skuInfo
				// 限制最大购买量
				skuInfo.remainStoreNum = item.remainStoreNum
				skuInfo.price = item.price
				skuInfo.skuId = item.id
				// skuInfo.selectedSkuIds = selectedSkuIds
				skuInfo.selectedSkuName = selectedSkuName
				skuInfo.smartSelectedSkuInfo = smartSelectedSkuInfo
				Home.getUrl([
					{
						name: 'x',
						url: item.picUrl,
					},
				]).then(res => {
					skuInfo.url = res[0].url
					this.setData({
						skuInfo,
					})
				})
			}
		})
	},

	_isSameArr(arr1, arr2) {
		let isSame = true
		if (arr1.length !== arr2.length) {
			isSame = false
		}
		isSame &&
			arr1.map(item1 => {
				if (!arr2.includes(item1)) {
					isSame = false
				}
			})

		return isSame
	},

	onCountChange(e) {
		let skuInfo = this.data.skuInfo
		skuInfo.count = e.detail
		this.setData({
			skuInfo,
		})
	},

	addOrBuy() {
		if (!this.data.skuInfo.skuId) {
			wx.showToast({
				title: '请选择规格',
				icon: 'none',
				duration: 2000,
			})
			return
		}

		if (!this.data.skuInfo.remainStoreNum) {
			wx.showToast({
				title: '库存已不足',
				icon: 'none',
				duration: 2000,
			})
			return
		}

		let productType = []
		this.data.detail.productType.map(item => {
			productType.push(item.id)
		})
		if (this.data.activeBuyType === 'add') {
			Shop.addShopCar({
				addPrice: this.data.skuInfo.price,
				count: this.data.skuInfo.count,
				productId: this.data.gid,
				skuId: this.data.skuInfo.skuId,
				productType,
			}).then(() => {
				wx.showToast({
					title: '添加成功',
					icon: 'none',
					duration: 2000,
				})
				this.setData({
					skuShow: false,
				})
			})
		}

		if (this.data.activeBuyType === 'buy') {
			console.log(7, this.data.skuInfo)

			let buyList = []
			let productType = ''
			this.data.detail.productType.map(item => {
				productType += `${item.id},`
			})
			productType = productType.substring(0, productType.length - 1)

			buyList.push({
				id: this.data.detail.id,
				productId: this.data.gid,
				skuId: this.data.skuInfo.skuId,
				nowCount: this.data.skuInfo.count,
				addPrice: this.data.skuInfo.price,
				productSkuVo: {
					productId: this.data.gid,
					code: this.data.detail.code,
					name: this.data.detail.name,
					productType,
					mainPicUrl: this.data.detail.mainPicUrl,
					// onsale: this.data.gid,
					skuId: this.data.skuInfo.skuId,
					skuName: this.data.skuInfo.smartSelectedSkuInfo,
					remainStoreNum: this.data.skuInfo.remainStoreNum,
					price: this.data.skuInfo.price,
					picUrl: this.data.skuInfo.url,
				},
			})

			wx.setStorageSync('buyList', buyList)

			wx.navigateTo({
				url: '/pages/buy/index',
			})
		}
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
