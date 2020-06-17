import {
  HTTP
} from '../http.js'

class UserModel extends HTTP {

  getUserInfo() {
    return this.request({
      url: 'user/details'
    })
  }

  auth({
    babyBirthday,
    babyHeight,
    babyName,
    babySex,
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
    pet
  }) {
    return this.request({
      url: 'user/details/save/certification',
      method: 'POST',
      data: {
        babyBirthday,
        babyHeight,
        babyName,
        babySex,
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
        pet
      }
    })
  }

}

export {
  UserModel
}