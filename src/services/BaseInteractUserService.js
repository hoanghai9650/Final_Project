import InteractUserService from "./InteracUserService";

const PREFIX = "Users"
export class BaseInteractUserService extends InteractUserService{
    async getProductLiked(token){
        return await this.get(`/${PREFIX}/getproductfavorite`, token);
    }
    async setLikeProduct(id, token){
        return await this.get(`/${PREFIX}/like?productId=${id}`, token);
    }
    async setUnlikeProduct(id, token){
        return await this.get(`/${PREFIX}/unlike?productId=${id}`, token);
    }
}
export const baseInteractUserService = new BaseInteractUserService();