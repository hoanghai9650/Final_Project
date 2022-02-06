
import { GET_PROFILE, SIGNIN_USER_SUCCESS, GET_LIKED_ITEM, LIKE_ITEM, UNLIKE_ITEM } from "../actions/appActions";

const initialState = {
    accessToken:'',
    profile:[],
    likedItem:[],
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGNIN_USER_SUCCESS:  {  
           state.accessToken = payload;
           return {...state};
        }
        case GET_PROFILE:{
            state.profile = payload;
            return {...state};
        }     
        case GET_LIKED_ITEM:{
            payload = payload.map((item)=>item.id);
            state.likedItem = payload;
            return {...state};
        } 
        
        

    default:
        return {...state}
    }
}
export default userReducer;