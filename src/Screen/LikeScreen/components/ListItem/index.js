import React, {useEffect} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux';
import { getRequestLikedProduct, setRequestLikeProduct, setRequestUnlikeProduct } from '../../../../redux/thunk/appThunk'
import { getLikedProduct } from '../../../../redux/selector/userSelector'
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
const ListItem = ({item, accessToken}) =>{
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
        <TouchableOpacity>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
            <Image source={{uri: item.image}} style={styles.image}/>
            </View>
            <View style={styles.textStyle}>
            <Text style={styles.text}>{item.name}</Text>
            </View>
            <View style={styles.icon}>
                <TouchableOpacity onPress={()=>likeBtn(item.id, accessToken)}>
            {!likedList.includes(item.id)? <FontAwesome 
            name="heart-o"
            size={20}
            color="#ffb2dd"
                /> : <FontAwesome 
                name="heart"
                size={20}
                color="#ffb2dd"/>}
                </TouchableOpacity>
                </View>
        </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        
        flexDirection:'row',
        alignItems: 'center',
        
        backgroundColor:'#fff',
        marginBottom: 30,
        paddingHorizontal: 15,
        borderRadius: 25,
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.05,
          
    },
    imageContainer:{
        
        
        width:120,
        
    },
    image:{
        height:100,
        width:100,
        marginRight: 30,
    },
    text:{
        fontSize:15,
        width:'70%',
        fontWeight:'700'
    },
    icon:{
        flexDirection:'row',
        justifyContent:'flex-end',
       
        
    },
    textStyle:{
        width:'50%',   
        alignItems:'center',
        justifyContent:'center',
        
    },
})

export default ListItem;