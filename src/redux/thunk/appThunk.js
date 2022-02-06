import { Alert } from 'react-native';
import {userService} from '../../services/UserService'

import * as appActions from '../actions/appActions';
import { replace, goBack, navigate } from '../..//navigation/root-navigation';
import {ScreenName} from '../../utils/constant'
import { productServices } from '../../services/ProductService';
import { baseInteractUserService, BaseInteractUserService } from '../../services/BaseInteractUserService';


export const signInUser =  (value) =>{
    return (dispatch) =>{
         userService.userSignIn(value)
        .then((res)=>{
            if(res.data.statusCode === 200){
            dispatch(appActions.signInRequestSuccess(res.data.content.accessToken)); 
            replace(ScreenName.Root)
            }               
        })
        .catch((error) =>{
            Alert.alert("Fail", "Sai Thông Tin Đăng Nhập");
            
        });

    }

}
export const signUpUser = (value) =>{
    return () =>{
        userService.userSignUp(value)
        .then((res)=>{
            if(res.data.statusCode === 201){
                Alert.alert(
                 "Success",
                 "Tạo Tài Khoản Thành Công",    
               );
               goBack();  
            }  
              
        })
        .catch((error) =>{
            Alert.alert("Fail", "Tài Khoản Đã Được Tạo");
            
        });

    }
}
export const signInFacebook =  (value) =>{
    
    return (dispatch) =>{
         userService.userSignInFacebook({facebookToken: value})
        .then((res)=>{
            if(res.data.statusCode === 200){
                dispatch(appActions.signInRequestSuccess(res.data.content.accessToken)); 
                replace(ScreenName.Root)
                }   
                         
        })
        .catch((error) =>{
            Alert.alert("Fail", "Sai Thông Tin Đăng Nhập");
            
        });

    }

}
export const getAllCategoryList = () =>{
    return (dispatch) =>{
        productServices.getListCategory()
        .then(( res )=>{
            dispatch(appActions.getAllCategory(res.data.content))
              
        })
        .catch((error) =>{
            
            console.log(error);
        });

    }
}
export const getAllProductList = () =>{
    return (dispatch) =>{
        productServices.getAllProduct()
        .then(( res )=>{
            dispatch(appActions.getAllProduct(res.data.content))
              
        })
        .catch((error) =>{
            
            console.log(error);
        });

    }
}
export const getRequestListProductByCategory = (id) =>{
    return (dispatch) =>{
        productServices.getListProductByCategory(id)
        .then(( res )=>{
            dispatch(appActions.getAllProduct(res.data.content))
              
        })
        .catch((error) =>{
            
            console.log(error);
        });

    }
}
export const getRequestProfileUser = (value) =>{
    return (dispatch) =>{
        userService.userProfile(value)
        .then((res)=>{
            if(res.data.statusCode === 200){
               dispatch(appActions.getProfileUser(res.data.content))
            }  
              
        })
        .catch((error) =>{
        });

    }
}
export const getRequestLikedProduct = (token) =>{
    return (dispatch) =>{
         baseInteractUserService.getProductLiked(token)
        .then(( res)=>{
            dispatch(appActions.getLikedItem(res.data.content.productsFavorite))
            
        })
        .catch((error)=>{

        })
    }
}
export  const setRequestLikeProduct =  (id, token) =>{
    return  (dispatch)=>{
         baseInteractUserService.setLikeProduct(id, token)
        .then((res)=>{            
            dispatch(getRequestLikedProduct(token))
        })
        .catch((error)={

        });
    }

}
export const setRequestUnlikeProduct = (id, token) => {
    return  (dispatch) => {
         baseInteractUserService.setUnlikeProduct(id, token)
        .then((res)=>{           
            dispatch(getRequestLikedProduct(token))
        })
        .catch((error)={
            
        });
    }
    }
export const getRequestProductById = (id) =>{
        return (dispatch) =>{
            productServices.getListProductById(id)
            .then(( res )=>{
                dispatch(appActions.getProductByIdSuccess(res.data.content))
                  
            })
            .catch((error) =>{
                
                console.log(error);
            });
    
        }
    }
export const getRequestFavorite = (token) =>{
    return (dispatch) =>{
        baseInteractUserService.getProductLiked(token)
       .then((res)=>{
           dispatch(appActions.getFavoriteProduct(res.data.content.productsFavorite))
           
       })
       .catch((error)=>{
           console.log(error);
       })
   }
    }
    export const getRequestAddCart= (value) =>{
        return (dispatch) =>{
            
               dispatch(appActions.addCartOrderSuccess(value))
               Alert.alert('Success', `Đã thêm ${value['quantity']} sản phẩm`)
           
        }
    }
    export const requestDeleteCart= (value) =>{
        return(dispatch) =>{
            dispatch(appActions.deleteCartOrderSuccess(value))

        }
    }
    export const requestIncreaseCart=(value)=>{
        return(dispatch) =>{
            dispatch(appActions.incrementCartOrderSuccess(value))
            dispatch(requestGetCartCount())
            
        }
    }
    export const requestDecreaseCart=(value)=>{
        return(dispatch) =>{
            dispatch(appActions.decrementCartOrderSuccess(value))
            dispatch(requestGetCartCount())
            
            
        }
    }
    export const requestGetCartCount= () =>{
        return (dispatch)=>{
            dispatch(appActions.getCartCountSuccess())
        }
    }


    