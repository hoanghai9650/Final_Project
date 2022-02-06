import React,{useEffect} from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import { getCartItem, getCountItem } from '../../redux/selector/userSelector'
import CartItem from './components'
import { useDispatch, useSelector } from 'react-redux';
import { requestGetCartCount } from '../../redux/thunk/appThunk';


const CartScreen = () =>{
    const data = useSelector(getCartItem)
    const dispatch = useDispatch()
    let quantity = 0;
    let total = 0;
    const count = useSelector(getCountItem)

    useEffect(()=>{
        dispatch(requestGetCartCount())
    },[dispatch])

     data.map(item=> {
         quantity += item.quantity;
         total += item.price * item.quantity;
     })
    
    
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.textTitle}>Your Cart</Text>
            <TouchableOpacity style={styles.btn}>
                <View style={styles.btnView}>
                <Text style={[styles.textTitle]}>Check out</Text>
                </View>
            </TouchableOpacity>
            
            </View>
            <View style={styles.footer}>
                <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={item =>(
                    <CartItem
                    item={item}
                    />
                )}
                keyExtractor={(item) => item.id}
                />

            </View>
            <View style={styles.total}>
                <View style={styles.totalContainer}>
                   <Text style={styles.textTotal}>Total</Text>
                   <View style={{flexDirection:'row', alignItems: 'center'}}>
                    <Text>({quantity} items)</Text>
                   <Text style={styles.textTotal}>${total}</Text>
                   </View>
               </View>
               
               </View>
        </View>
        </SafeAreaView>
    )
       
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor:'#fafafa',
    },
    textTitle:{
        fontSize: 25,
        fontWeight:'bold',
        fontFamily: 'AbrilFatface-Regular',
         
    },
    header:{
        flex:1,
        justifyContent: 'space-between',
        alignItems: 'center',   
        flexDirection: 'row',
        
    },
    btn:{
       
        borderRadius: 10,
        backgroundColor: 'pink',
    },
    footer:{
        flex:6,
    },
    btnView:{
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    total:{
        flex:2,
        marginTop:30,
        
        
    },
    textTotal:{
        fontSize:20,
        fontWeight:'bold',
        marginLeft:10
    },
    totalContainer:{
        
        width:'100%',
        height:'40%',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

export default CartScreen;