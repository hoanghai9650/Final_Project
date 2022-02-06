import React, {useEffect, useMemo, useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ScreenName } from '../../../../utils/constant'
import { navigate} from '../../../../navigation/root-navigation'
import { useDispatch, useSelector } from 'react-redux';
import { getRequestLikedProduct, setRequestLikeProduct, setRequestUnlikeProduct } from '../../../../redux/thunk/appThunk'
import { getLikedProduct } from '../../../../redux/selector/userSelector'
import { SharedElement } from 'react-navigation-shared-element';
import { ITEM_WIDTH, ITEM_HEIGHT } from '../../../../navigation/root-navigation'


export default function ProductItem({price, title, img, item, id, accessToken, navigation}) {
    
    const [like, setLike]= useState(false);
    const [productId, setProductId] = useState();
    const dispatch = useDispatch();
    const likedList = useSelector(getLikedProduct)
    
    
    useEffect(()=>{

        dispatch(getRequestLikedProduct(accessToken))

    },[])
    
    const likeBtn =  (id, accessToken) => {

            if (likedList.includes(id)){  
                dispatch(setRequestUnlikeProduct(id, accessToken))
            }
            else {
                dispatch(setRequestLikeProduct(id, accessToken))      
            }

}
       
    return (
        
        <View >
            <TouchableOpacity onPress={()=>{
                navigation.navigate(ScreenName.Detail,{
                    item:item,
                    id:id,
                    image: img,
                    title: title,
                    price: price,
                })

            }}>
            <View style={[styles.container]}>
            <SharedElement id={`item.${item.id}.image`} >
                <Image source={{uri: item.image}} style={styles.img}/>
                </SharedElement>
                     <Text style={styles.text}>{title}</Text>
                     
                     <Text style={styles.price}>${price}</Text>
                     
                     </View>       
                     </TouchableOpacity>
            <TouchableOpacity style={styles.likeBtn} onPress={()=>likeBtn(id, accessToken)}>
                {!likedList.includes(id)? <FontAwesome 
            name="heart-o"
            size={20}
            color="#ffb2dd"
                /> : <FontAwesome 
                name="heart"
                size={20}
                color="#ffb2dd"/>}
                
            </TouchableOpacity>
                     </View>   
                           
    )
}

const styles = StyleSheet.create({
    container:{
     backgroundColor: '#fff',  
     justifyContent:'center',
     alignItems: 'center',
     borderRadius: 20,
     height:ITEM_WIDTH*0.57,
     width: ITEM_WIDTH*0.43,
     marginBottom:40,
     padding:10,
     shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      
      
    

    },
    // contain:{
    //     width:150,
    //     height:200,
    //     borderRadius: 20
    // },
    img:{
        // width:120,
        // height:120,
        
        width:'100%',
        alignItems:'center',
        aspectRatio: 2 / 2,
    },
    text:{
        fontWeight:'bold',
        marginBottom: 10,
        textAlign: 'center', 
        
    },
    likeBtn: {
        position: 'absolute',
        right: 20,
        top:10
    },
    title: {
        // position: 'absolute',
    },
    price:{
        
    }
    
})
