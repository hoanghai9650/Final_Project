export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNUP_USER_SUCCESS ='SIGNIN_USER';
export const GET_ALL_CATEGORY='GET_ALL_CATEGORY';
export const GET_ALL_PRODUCTS= 'GET_ALL_PRODUCTS';
export const GET_ALL_PRODUCT_BY_CATEGORY = 'GET_ALL_PRODUCT_BY_CATEGORY'
export const GET_PROFILE='GET_PROFILE';
export const LIKE_ITEM= 'LIKE_ITEM';
export const UNLIKE_ITEM='UNLIKE_ITEM';
export const GET_LIKED_ITEM='GET_LIKED_ITEM';
export const GET_PRODUCT_BY_ID_SUCCESS= 'GET_PRODUCT_BY_ID_SUCCESS';
export const GET_FAVORITE_PRODUCT = 'GET_FAVORITE_PRODUCT';
export const ADD_CART_ORDER = 'ADD_CART_ORDER'
export const DELETE_CART_ORDER = 'DELETE_CART_ORDER';
export const INCREASE_CART_ORDER = 'INCREASE_CART_ORDER';
export const DECREASE_CART_ORDER = 'DECREASE_CART_ORDER';
export const GET_CART_ORDER ='GET_CART_ORDER';
export const GET_CART_COUNT = 'GET_CART_COUNT';
export const GET_CART_TOTAL= 'GET_CART_TOTAL';

export const signInRequestSuccess= (token) =>({
    type: SIGNIN_USER_SUCCESS, 
    payload : token})

export const getAllCategory = (listCategory) => ({
    type: GET_ALL_CATEGORY,
    payload : listCategory
})
export const getAllProduct= (value) => ({
    type: GET_ALL_PRODUCTS,
    payload : value
})
export const getAllProductByCategory= (value) => ({
    type: GET_ALL_PRODUCTS,
    payload : value
})
export const getProfileUser = (value)=>({
    type: GET_PROFILE,
    payload : value,
})
export const getLikedItem= (value) => ({
    type: GET_LIKED_ITEM,
    payload: value,

})
export const getProductByIdSuccess= (value) =>({
    type: GET_PRODUCT_BY_ID_SUCCESS,
    payload: value,
})
export const getFavoriteProduct= (value)=>({
    type: GET_FAVORITE_PRODUCT,
    payload: value,
})
export const addCartOrderSuccess = (value)=>({
    type: ADD_CART_ORDER,
    payload: value,
})
export const deleteCartOrderSuccess= (value) =>({
    type:DELETE_CART_ORDER,
    payload: value,
})
export const incrementCartOrderSuccess = (value)=>({
    type: INCREASE_CART_ORDER,
    payload: value,
})
export const decrementCartOrderSuccess = (value)=>({
    type: DECREASE_CART_ORDER,
    payload: value,
})
export const getCartCountSuccess = ()=>({
    type: GET_CART_COUNT,
})
