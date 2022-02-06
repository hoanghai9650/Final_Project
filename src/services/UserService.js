import BaseUserService from "./BaseUserService";

const PREFIX = "Users"
export class UserService extends BaseUserService {
    userSignIn(value) {
        return this.get(`/${PREFIX}/signin`,value)
    }
    userSignUp(value) {
        return this.get(`/${PREFIX}/signup`, value)
    }
    userFacebookSignIn(value) {
        return this.get(`/${PREFIX}/facebooklogin`, value)
    }
    userOrder() {
        return this.get(`/${PREFIX}/order`)
    }
    userDeleteOrder() {
        return this.get(`/${PREFIX}/deleteOrder`)
    }
    userProfile(token) {
        return this.get(`/${PREFIX}/getProfile`, null, token)
    }
    userUpdateProfile() {
        return this.get(`/${PREFIX}/updateProfile`)
    }
    getProductLiked(){
        return this.get(`/${PREFIX}/getproductfavorite`)
    }
    getCartItem(value){
        return this.get(`/${PREFIX}/order`, value);
      }
      userSignInFacebook(value) {
        return this.get(`/${PREFIX}/facebooklogin`,value)
    }

}
export const userService = new UserService();