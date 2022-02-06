import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert,Animated, Dimensions } from 'react-native'
import { back } from 'react-native/Libraries/Animated/Easing';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo'
import { useDispatch, useSelector } from 'react-redux';
import { getRequestAddCart, getRequestProductById } from '../../redux/thunk/appThunk';
import { getCartItem, getProductById } from '../../redux/selector/userSelector';
import { SharedElement } from 'react-navigation-shared-element';
import { ITEM_WIDTH, ITEM_HEIGHT } from '../../navigation/root-navigation'
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSafeAreaInsets} from "react-native-safe-area-context";

  function DetailScreen({navigation,route}) {
    const {width, height} = Dimensions.get('screen');
    const bottom = -(height * 0.50);
    const toBottom = (height* 0.05 );
    const {id, item, image, title, price} =route.params;
    
    const dispatch = useDispatch()
    const itemDetail = useSelector(getProductById)
    const footerOffSet = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const safeArea = useSafeAreaInsets()
    const getCart = useSelector(getCartItem)
    
    
    const [quantity, setQuantity] = useState(0)
    
 

    useEffect(()=>{
        setQuantity(quantity)
    },[quantity])

    useEffect(()=>{
        Animated.parallel([
            Animated.timing(opacity,{
                toValue: 1,
                duration: 1000,
                useNativeDriver: false,
            }),
            
            Animated.spring(footerOffSet,{
                toValue: 1,
                useNativeDriver: false,
            })
            
        
        ]).start()
        
    }, [footerOffSet])

    const translateTop = footerOffSet.interpolate({
        inputRange:[0,1],
        outputRange:[bottom,toBottom],
    })
    

    const onSubmit=()=>{
        
        if(quantity>0){
        // dispatch(getRequestAddCart(orderDetail))  
        dispatch(getRequestAddCart({id, quantity, image,title, price })) 
        console.log(getCart) 
    }
    else{
        Alert.alert('Loi', 'khong co sp de add cart')
    }
    }

    const increaseQuantity =()=>{
        setQuantity((prev)=> prev +1 )       
    }
    const decreaseQuantity =()=>{
        if(quantity >0 ){
            setQuantity( (prev)=> prev -1 )
        }
        
    }
    
    
    return (
        
        
            <View style={{ 
                
                paddingTop: safeArea.top, 
                flex:1,
                paddingHorizontal: 20,
                width:'100%',
                }}>
                <View style={styles.container}>
                <LinearGradient colors={['#fff','#fafafa', '#ffc7f2']} style={styles.containImg}>
               
                <SharedElement id={`item.${item.id}.image`}>
                <Image source={{uri: item.image}} style={styles.img}/>
                </SharedElement>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={styles.backBtn}>
                    <Entypo
                    name='chevron-small-left'
                    size={40}                   
                    />  
                </TouchableOpacity>
                </LinearGradient>
                
                <Animated.View 
                
                style={{
                    position: 'absolute',
                    backgroundColor:'#fff',
                    borderRadius:30,
                    bottom: translateTop,
                    shadowOffset: {
                        width: 2,
                        height: 2,
                      },
                      shadowOpacity: 0.1,
                      width:'100%' ,
                    height:'45%',
                    paddingHorizontal: 20,
                    opacity: opacity,
                }}
                >
                    <View style={styles.title}>
                    
                        <Text style={styles.titleText} >{item.name}</Text>
                        
                        <Text style={styles.titlePrice}>${item.price}</Text>
                       
                    </View>
                    <View style={styles.description}>
                    <Text>{item.description}</Text>
                </View>
                <View style={{flex: 3}}>
                    <View style={styles.quantityContainer}>
                        <Text style={styles.quantityText}>Quantity</Text>
                        <View style={styles.quantity}>
                        <View style={styles.btn}>
                            <TouchableOpacity>
                        <Entypo name="minus" size={15} onPress={()=>decreaseQuantity()}/>
                        </TouchableOpacity>
                        </View>
                        <Text style={styles.textQuantity}>{quantity}</Text>
                        <View style={styles.btn}>
                        <TouchableOpacity> 
                        <Entypo name="plus" size={15} onPress={()=>increaseQuantity()} />
                        </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btnAdd} onPress={()=>onSubmit()}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>Add To Cart</Text>
                    </TouchableOpacity>
                </View>
                </Animated.View>
                </View>
                </View>

            
        
    )
    
}
DetailScreen.sharedElements = (route) =>{
    const {item} = route.params;
    
    return [
        {
          id: `item.${item.id}.image`,
          animation: 'move',
          resize: 'contain'
        },
      ];
}
export default  DetailScreen;

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        
    },
    
    img:{
        
        marginTop:'20%',
        width: '110%' ,
        height: 300,
        right: 15,
        
    },
    containImg:{
        width:'100%',
        paddingHorizontal: 20,
        height: '45%',
        marginBottom: 30, 
        borderRadius: 30,
        
        
    },
    
    title:{
        flexDirection:'row',
        justifyContent: 'space-between',
        flex:2,
        alignItems:'center',
        top: 20,

    },
    titleText:{
        fontWeight: 'bold',
        fontSize: 22,
        width:'80%',
        
        
        
    },
    titlePrice:{
        fontWeight: 'bold',
        fontSize: 18,
        
    },
    description:{
        marginTop:40,
        flex:3,
        
    },
    quantity:{
        flexDirection:'row',
        alignItems:'center',
        
        
    },
    quantityContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    textQuantity:{
        marginHorizontal: 15,
    },
    btn:{
        borderRadius:5,
        padding:2,
        backgroundColor:'pink',
        shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.1,
    },
    quantityText:{
        fontSize:20,
    },
    btnAdd:{
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black',
        padding:20,
        borderRadius:15,
        shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.1,

    },
    backBtn:{
        top: 20,
        position: 'absolute',
        left: 20,
        borderRadius:30,
        backgroundColor:'#fff',
        shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.1,
    }
})

