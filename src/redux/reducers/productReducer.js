
import { Alert } from "react-native";
import { StackRouter } from "react-navigation";
import { useDispatch } from "react-redux";
import { GET_FAVORITE_PRODUCT,GET_ALL_CATEGORY, GET_ALL_PRODUCTS, GET_ALL_PRODUCT_BY_CATEGORY, GET_LIKED_ITEM, GET_PRODUCT_BY_ID_SUCCESS, GET_PROFILE, ADD_CART_ORDER, DELETE_CART_ORDER, INCREASE_CART_ORDER, GET_CART_COUNT, GET_CART_ORDER, DECREASE_CART_ORDER} from "../actions/appActions";
import { requestDeleteCart } from "../thunk/appThunk";

const initialState = {
    allProducts:[],
    allCategory:[],
    profile:[],
    productById:{},
    favoriteProduct:[],
    cart:[],
    count:0,
}

const productReducer = (state = initialState, { type, payload }) => {
    
    switch (type) {
        case GET_ALL_CATEGORY:{  
            state.allCategory = payload;
            return {...state};
        } 
        case GET_ALL_PRODUCTS:{
            state.allProducts = payload;
            return {...state};
        } 
        case GET_ALL_PRODUCT_BY_CATEGORY:{
            state.allProducts = payload;
            return {...state};
        } 
        case GET_PRODUCT_BY_ID_SUCCESS:{
            state.productById = payload;
            return {...state};
        }
        case GET_FAVORITE_PRODUCT:{
            state.favoriteProduct = payload;
            return {...state};
        }
        case ADD_CART_ORDER:{
            
            if(state.cart.length == 0){
                state.cart = state.cart.concat(payload)
            }
            else {    
                let check = false;  
                state.cart.map((item, key)=>{
                    if(state.cart[key].id === payload['id']){
                        state.cart[key].quantity += payload['quantity']; 
                        
                        check = true; 
                    }
                })
                if(!check){
                    
                    state.cart = state.cart.concat(payload)        
                }       
            } 
             
            return {
                ...state,
            }
        }
        case DELETE_CART_ORDER:{
            state.cart = state.cart.filter(item=> item.id !== payload)
            return {...state}
        }
        case INCREASE_CART_ORDER:{
            state.cart.map((item, key)=> {
                if(state.cart[key].id === payload){
                    state.cart[key].quantity++;
                    state.count++;
                }
            })
              console.log(state.cart)
            return {...state}
        }
        case DECREASE_CART_ORDER:{          
            
            state.cart.map((item, key)=> {
                if(state.cart[key].quantity > 0){
                    if(state.cart[key].id === payload){
                        state.cart[key].quantity--;
                        state.count--;
                        
                    } 
                }
                      
            })
            return{...state}
        }
        case GET_CART_ORDER:{
            return {...state}
        }
        case GET_CART_COUNT:{
            let _count =0;
            state.cart.map((item, key)=> {
                _count += item.quantity
            })
            
            console.log(state.count);
            return {...state}
        }
        
    default:
        return {...state}
    }
}
export default productReducer;