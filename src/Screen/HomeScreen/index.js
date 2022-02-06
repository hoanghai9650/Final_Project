import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import CategoryTitle from './components/category';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getAllProduct, getLikedProduct, getTokenSelector } from '../../redux/selector/userSelector';
import { getAllCategoryList, getAllProductList, getRequestLikedProduct, getRequestListProductByCategory } from '../../redux/thunk/appThunk';
import ProductItem from './components/ProductItem';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({navigation})=> {
    const DATA = ['hello','hello','hello'];
    const [isSelected, setSelected] = useState(null) 
    const [allCategoryItem, setAllCategoryItem] = useState([null])
    const dispatch = useDispatch();
    const listCategory = useSelector(getAllCategory)
    const listProduct = useSelector(getAllProduct)
    const accessToken = useSelector(getTokenSelector)

    
    useEffect(()=>{

        dispatch(getRequestLikedProduct())

    },[dispatch])

    useEffect(()=>{

        dispatch(getAllCategoryList())

    },[dispatch])

    useEffect(()=>{
        dispatch(getAllProductList())

    },[dispatch])



    return (
        
        <SafeAreaView style={styles.container} edges={['top']}>

                <View style={styles.cart}>
                <TouchableOpacity>
                   <Feather
                     name="shopping-bag"
                     color="black"
                     size={25}
            />
            </TouchableOpacity>   
            </View>
            <View style={styles.list}>
                <Text style={styles.title}>Choose Your Best Shoes</Text>
                <View>
                      
            <FlatList
                data={listCategory}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index})=>(
                    <CategoryTitle
                    title={item.category}
                    onPress={()=>{
                        setSelected(index)
                        dispatch(getRequestListProductByCategory(item.id))
                        
                    }}
                    bgColor = {index === isSelected ? 'black': '#fafafa'}
                    color = {index === isSelected ? '#fafafa': 'black'}
                    disable = {index === isSelected ? true : false }
                    /> 
                )}
                />
               </View>
               
               </View>
                
                <View style={styles.listItem}>
                <FlatList
                data={listProduct}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index})=>(
                    <ProductItem
                    title={item.name}
                    img={item.image}
                    price={item.price}
                    description={item.description}
                    item={item}
                    id={item.id}
                    accessToken={accessToken}
                    navigation={navigation}
                    
                    />
                    // <CategoryTitle
                    // title={item.name}/>
                )}

                />
                

                </View>
        </SafeAreaView>
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal: 20,
        backgroundColor:'#fafafa',
        
    },
    cart: {
        marginBottom: 20,
        justifyContent:'flex-end',
        flexDirection: 'row',
    },
    title: {  
        fontSize: 25,
        fontWeight:'bold',
        fontFamily: 'AbrilFatface-Regular',
        marginBottom:20
        
    },
    list: {
        flex: 2,
        marginBottom: 20,
        
    },
    listItem:{
        flex: 9,
        
    },
    focus:{
        backgroundColor:'red',
        width:'100%',
        height:'100%',
        position:'absolute',

    },
    
    

    


})

export default HomeScreen;
