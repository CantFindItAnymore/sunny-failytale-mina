import { list, my } from '../../utils/common-json/my'
import { MyModel } from '../../api/models/my'

const My = new MyModel()

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		list,
		my,
		defaultHead: '/imgs/default_head.png',
		authorized: false,
		userInfo: null,
		jsCode: '',
	},

	onShow: function () {
		// 尝试主动获取用户信息
		this._userAuthorized()
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	// 点击微信登录登录按钮
	handleGetUserInfo(e) {
		const _this = this
		wx.getUserProfile({
			desc: '用于获取微信昵称&头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			success: res => {
				this.setData({
					userInfo: res.userInfo,
					authorized: true,
				})

				_this._getUserInfo({ detail:{
					userInfo: res.userInfo
				} })
			},
		})
	},

	// （微信登录老用户） 直接拿用户信息
	_userAuthorized() {
		if (wx.getStorageSync('token')) {
			const _this = this
			wx.showLoading()
			My.getUserInfo().then(res => {
				console.log(6, res)
				const temp = res.nickName.split('safuiertfdk@@dsli')
				this.setData({
					userInfo: {
						avatarUrl: temp[1],
						nickName: temp[0],
					},
				})
			})
		} else {
			this.setData({
				userInfo: null
			})
		}
	},

	// （微信登录新用户） 微信授权个人信息
	_getUserInfo(e) {
		console.log(1, e)
		this._wx_login(() => {
			const userInfo = e.detail.userInfo
			console.log(userInfo)
			if (userInfo) {
				this.setData({
					userInfo,
					authorized: true,
				})
				wx.setStorageSync('nickName', userInfo.nickName)
				My.login({
					jsCode: this.data.jsCode,
					nickName: `${userInfo.nickName}safuiertfdk@@dsli${userInfo.avatarUrl}`,
				})
					.then(res => {
						console.log(res)
						wx.setStorageSync('token', res.token)
						return My.isAuthed()
					})
					.then(res => {
						res ||
							wx.showModal({
								title: '提示',
								content: '为了更好的用户体验，请先进行认证操作',
								success(res) {
									if (res.confirm) {
										wx.navigateTo({
											url: '/pages/person/index',
										})
									} else if (res.cancel) {
									}
								},
							})
					})

				wx.hideLoading()
			} else {
				wx.hideLoading()
				wx.showToast({
					title: '请授权登录',
					icon: 'none',
					duration: 2000,
				})
			}
		})
	},

	toSomewhere(e) {
		const goal = e.currentTarget.dataset.goal
		wx.navigateTo({
			url: `/pages/${goal}/index`,
		})
	},

	// 微信登陆
	_wx_login(callBack) {
		const _this = this
		wx.login({
			success(res) {
				if (res.code) {
					_this.setData({
						jsCode: res.code,
					})
					callBack()
				}
			},
		})
	},
})
