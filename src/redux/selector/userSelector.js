export const getTokenSelector = state => state.userReducer.accessToken;
export const getAllCategory = state => state.productReducer.allCategory;
export const getAllProduct = state => state.productReducer.allProducts;
export const getUserProfile = state => state.userReducer.profile;
export const getLikedProduct = state => state.userReducer.likedItem;
export const getProductById = state=> state.productReducer.productById;
export const getFavoriteProduct = state => state.productReducer.favoriteProduct;
export const getCartItem = state => state.productReducer.cart;
export const getCountItem= state => state.productReducer.count;