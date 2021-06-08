import {
	classifyList,
	rainbowList,
	outfitList,
} from '../../utils/common-json/home'

import { HomeModel } from '../../api/models/home'
const Home = new HomeModel()

const updateManager = wx.getUpdateManager()
Page({
	data: {
		classifyList,
		rainbowList,
		outfitList,

		//pic(9个)
		brandStoryDisplayPic: '', // 品牌故事
		carouselPics: [], // 轮播
		carouselPics2: [], // 轮播2
		couponDisplayPic: '', // 优惠券
		hotProductsDisplayPic: '', // 热销
		indexProducts: [], // 首页商品
		newProductsDisplayPic: '', // 新品
		saleDisplayPic: '', // 晒图有礼
		typePics: [], // 分类图
		videoUrl: '', // 视频
	},

	onShow: function () {
		updateManager.onCheckForUpdate(function (res) {
			// 请求完新版本信息的回调
			console.log(res.hasUpdate)
		})

		updateManager.onUpdateReady(function () {
			wx.showModal({
				title: '更新提示',
				content: '新版本已经准备好，是否重启应用？',
				success: function (res) {
					if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
						updateManager.applyUpdate()
						// try {
						//   wx.clearStorageSync()
						// } catch(e) {
						//   // Do something when catch error
						// }
					}
				},
			})
		})

		updateManager.onUpdateFailed(function () {
			// 新版本下载失败
		})
	},

	onLoad: function () {
		Home.getImgs().then(res => {
			this.setData({
				brandStoryDisplayPic: res.brandStoryDisplayPic,
				carouselPics: res.carouselPics,
				carouselPics2: res.carouselPics2,
				couponDisplayPic: res.couponDisplayPic,
				hotProductsDisplayPic: res.hotProductsDisplayPic,
				indexProducts: res.indexProducts,
				newProductsDisplayPic: res.newProductsDisplayPic,
				saleDisplayPic: res.saleDisplayPic,
				typePics: res.typePics,
				videoUrl: res.videoUrl,
			})

			this._getTrueUrl()
		})
	},

	goSearch() {
		wx.navigateTo({
			url: '/pages/search/index',
		})
	},

	toShopCar() {
		wx.switchTab({
			url: '/pages/shopping-car/index',
		})
	},

	openMenu() {
		wx.switchTab({
			url: '/pages/classify/index',
		})
	},

	goShop() {
		wx.setStorageSync('classify', '全部商品')
		wx.navigateTo({
			url: '/pages/shop/index',
		})
	},

	toShop(e) {
		const { typeids, keyword, type, classify } = e.currentTarget.dataset
		console.log(e)

		classify && wx.setStorageSync('classify', classify)

		wx.navigateTo({
			url: `/pages/shop/index?pid=${typeids}&key=${keyword}&type=${type}`,
		})
	},

	toGoods(e) {
		const { id } = e.currentTarget.dataset
		console.log(e)

		wx.navigateTo({
			url: `/pages/goods-detail/index?gid=${id}`,
		})
	},

	toCard() {
		wx.navigateTo({
			url: `/pages/card/index`,
		})
	},
	toGift() {
		wx.navigateTo({
			url: `/pages/gift/index`,
		})
	},

	toStory() {
		wx.navigateTo({
			url: `/pages/story/index`,
		})
	},

	toStoryLine() {
		wx.navigateTo({
			url: `/pages/story-line/index`,
		})
	},

	_getTrueUrl() {
		// 单个图
		let sixList = [
			{
				name: 'brandStoryDisplayPic',
				url: this.data.brandStoryDisplayPic,
			},
			{
				name: 'couponDisplayPic',
				url: this.data.couponDisplayPic,
			},
			{
				name: 'hotProductsDisplayPic',
				url: this.data.hotProductsDisplayPic,
			},
			{
				name: 'newProductsDisplayPic',
				url: this.data.newProductsDisplayPic,
			},
			{
				name: 'saleDisplayPic',
				url: this.data.saleDisplayPic,
			},
			{
				name: 'videoUrl',
				url: this.data.videoUrl,
			},
		]

		Home.getUrl(sixList).then(res => {
			res.map(item => {
				if (item.name === 'brandStoryDisplayPic') {
					this.setData({
						brandStoryDisplayPic: item.url,
					})
				}
				if (item.name === 'couponDisplayPic') {
					this.setData({
						couponDisplayPic: item.url,
					})
				}
				if (item.name === 'hotProductsDisplayPic') {
					this.setData({
						hotProductsDisplayPic: item.url,
					})
				}
				if (item.name === 'newProductsDisplayPic') {
					this.setData({
						newProductsDisplayPic: item.url,
					})
				}
				if (item.name === 'saleDisplayPic') {
					this.setData({
						saleDisplayPic: item.url,
					})
				}
				if (item.name === 'videoUrl') {
					this.setData({
						videoUrl: item.url,
					})
				}
			})
		})

		// 轮播
		let currentCarouselList = []
		this.data.carouselPics.map((item, index) => {
			currentCarouselList.push({
				name: `currentCarouselList@${index}`,
				url: item.pic.url,
			})
		})

		let currentCarouselList2 = []
		this.data.carouselPics2.map((item, index) => {
			currentCarouselList2.push({
				name: `currentCarouselList2@${index}`,
				url: item.pic.url,
			})
		})
		

		// 分类
		let currentTypePics = []
		this.data.typePics.map((item, index) => {
			currentTypePics.push({
				name: `currentTypePics@${index}`,
				url: item.pic.url,
			})
		})
		// Home.getUrl(currentTypePics).then(res => {
		// 	let typePics = this.data.typePics
		// 	res.map(item => {
		// 		typePics[Number(item.name)].pic.url = item.url
		// 	})
		// 	this.setData({
		// 		typePics,
		// 	})
		// })

    

		// 首页商品
		let currentIndexProducts = []
		this.data.indexProducts.map((item, index) => {
			currentIndexProducts.push({
				name: `currentIndexProducts@${index}`,
				url: item.mainPicUrl,
			})
		})
		// Home.getUrl(currentIndexProducts).then(res => {
		// 	let indexProducts = this.data.indexProducts
		// 	res.map(item => {
		// 		indexProducts[Number(item.name)].mainPicUrl = item.url
		// 	})
		// 	this.setData({
		// 		indexProducts,
		// 	})
		// })

    Home.getUrl([...currentCarouselList, ...currentCarouselList2, ...currentTypePics, ...currentIndexProducts]).then(res => {
			let carouselPics = this.data.carouselPics
			let carouselPics2 = this.data.carouselPics2
      let typePics = this.data.typePics
			let indexProducts = this.data.indexProducts
			res.map(item => {
				const type = item.name.split('@')[0]
				const index = item.name.split('@')[1]
				if (type === 'currentCarouselList') {
					carouselPics[index].pic.url = item.url
				} else if(type === 'currentCarouselList2'){
					carouselPics2[index].pic.url = item.url
				} else if(type === 'currentTypePics'){
					typePics[index].pic.url = item.url
				} else if(type === 'currentIndexProducts'){
					indexProducts[index].mainPicUrl = item.url
				}
			})
			this.setData({
				carouselPics,
				carouselPics2,
        typePics,
        indexProducts
			})
		})
	},
})
