import md5 from 'js-md5'
// pages/log/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		steps: [],

		active: 0,
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const { expressCode } = options
		const _this = this
		wx.request({
			url: `http://www.kuaidi100.com/autonumber/auto?num=${expressCode}&key=TfsKmCDf5933`, //仅为示例，并非真实的接口地址

			header: {
				'content-type': 'application/x-www-form-urlencoded', // 默认值
			},
			success(res) {
				console.log('100', res.data[0].comCode)

				const param = {
					com: res.data[0].comCode,
					num: expressCode,
				}

				wx.request({
					url: 'https://poll.kuaidi100.com/poll/query.do', //仅为示例，并非真实的接口地址
					method: 'POST',
					data: {
						customer: '318C90C225CC5DEFD355621431DD7A04',
						sign: md5(
							`${JSON.stringify(
								param
							)}TfsKmCDf5933318C90C225CC5DEFD355621431DD7A04`
						).toUpperCase(),
						param: JSON.stringify(param),
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded', // 默认值
					},
					success(res1) {
						console.log('100', res1.data.data)
						const temp = res1.data.data
						temp.map(item => {
							item.text = item.time
							item.desc = item.context

							delete item.time
							delete item.ftime
							delete item.context
						})

						_this.setData({
							steps: temp,
						})
					},
				})
			},
		})
	},
})
