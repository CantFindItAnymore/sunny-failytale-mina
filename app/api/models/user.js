import { HTTP } from '../http.js'

class UserModel extends HTTP {
	getUserInfo() {
		return this.request({
			url: 'user/details',
		})
	}

	auth({
		height,
		shoesSize,
		weight,
		underwearSize,
		birthday,
		favoriteActivity,
		favoriteService,
		favoriteShopping,
		favoriteShoppingWay,
		job,
		name,
		phoneNumber,
		sex,
		channel,
		pet,
	}) {
		return this.request({
			url: 'user/details/save/certification',
			method: 'POST',
			data: {
				height,
				shoesSize,
				weight,
				underwearSize,
				birthday,
				favoriteActivity,
				favoriteService,
				favoriteShopping,
				favoriteShoppingWay,
				job,
				name,
				phoneNumber,
				sex,
				channel,
				pet,
			},
		})
	}
}

export { UserModel }
