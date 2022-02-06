import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRequestProductById, requestDecreaseCart, requestDeleteCart, requestGetCartCount, requestIncreaseCart } from '../../../redux/thunk/appThunk';
import {getCartItem, getCountItem, getProductById } from '../../../redux/selector/userSelector';
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient';
export default function CartItem({item}) {
    const dispatch = useDispatch();

    const onHandleIncrease =(id)=>{
        dispatch(requestIncreaseCart(id))
        
    }
    const onHandleDecrease =(id)=>{
        dispatch(requestDecreaseCart(id))
        if(item.item.quantity == 0){
            onHandleDelete(id)
        }
    }
    const onHandleDelete =(id)=>{
        Alert.alert('Delete',
        'Are you sure to delete this item?',
        [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text:'Ok',
                onPress:()=> dispatch(requestDeleteCart(id)),
            }
        ]
        )
        
    }
  return (
      <TouchableOpacity>
     <View style={styles.container}>   
             <View style={{flex: 3, 
                marginRight:10, 
                borderRadius: 20, 
                backgroundColor: '#ffebee',
                shadowOffset:{
                    width:2,
                    height:2,
                },
                shadowOpacity:0.05,
                marginLeft:5,
                }}>
    <Image source={{uri: item.item.image}} style={styles.image}/>
    </View>
    <View style={styles.header}>
    <View style={styles.textContainer}>
        <Text style={{
            fontWeight:'600',
            fontSize: 15,
        }}>{item.item.title}</Text>
    </View>
    <Text style={{
            fontWeight:'bold',
            fontSize: 15,
        }}>${item.item.price}</Text>
        </View>
        <View style={{flex: 2, justifyContent:'space-around', alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={()=>onHandleDelete(item.item.id)}>
            <Feather name='x' size={15}/>
            </TouchableOpacity>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
            }}>
                <View></View>
            <TouchableOpacity onPress={()=>onHandleDecrease(item.item.id)} style={{backgroundColor:'pink', marginRight:10, borderRadius:30, padding:3}}>
              <Entypo name='minus' size={20}/>
            </TouchableOpacity>
            <Text>{item.item.quantity}</Text>
            <TouchableOpacity onPress={()=>onHandleIncrease(item.item.id)} style={{backgroundColor:'pink', marginLeft:10, borderRadius:30, padding:3}}>
              <Entypo name='plus' size={20}/>
            </TouchableOpacity>
            </View>
        </View>
    </View> 
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        
        marginBottom:15,
        height:100,
        borderRadius: 25,
        shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.05,
          flexDirection:'row',
          
              
    },
    header:{
        flex:5,
        justifyContent:'space-around',
        paddingLeft:10,
        
    },
  image: {
      width:'100%',
      height:'100%',
      
  },
  textTitle:{
      fontSize:15,
        fontWeight:'700'
  },
  imageContainer:{
    width:120,
    
  },
  textContainer:{
      width:'90%',
      
      
  },
  price:{
    fontSize:20,
    fontWeight:'700',
    color:'pink'
  },
  footer:{
      marginBottom:0,
      paddingHorizontal: 20,
  }
});

