import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

import { useSelector, useDispatch } from 'react-redux';

import { getLikedProduct, getProductById, getTokenSelector, getFavoriteProduct } from '../../redux/selector/userSelector';
import { getRequestLikedProduct,getRequestFavorite } from '../../redux/thunk/appThunk';
import ListItem from './components/ListItem';
import { useIsFocused, useFocusEffect, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const  LikeScreen= () => {
    const token = useSelector(getTokenSelector);
    const dispatch = useDispatch();
    const likeProduct = useSelector(getFavoriteProduct);
    const accessToken = useSelector(getTokenSelector)
    const isFocused = useIsFocused();
    

    useEffect(()=>{
        
        dispatch(getRequestFavorite(token));
        
    },[dispatch])
   const  onRefresh =()=> {
       dispatch(getRequestFavorite(token))
    }
    
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            
                <View style={styles.header}>
            <Text style={styles.like}>Liked</Text>

            </View>
           <View style={styles.footer}>
               <FlatList
                  extraData={!isFocused}
                  data={likeProduct}
                  onRefresh={() => onRefresh()}
                  refreshing={!isFocused}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item})=>(
                      <ListItem
                         item={item}
                         accessToken={accessToken}
                      />
                  )}
               />
               
           </View>
               
            
        </SafeAreaView>  
    )
}
const styles = StyleSheet.create({
    container:{
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor:'#fafafa',
    },
    like:{
        fontSize: 25,
        fontWeight:'bold',
        fontFamily: 'AbrilFatface-Regular',
        marginBottom:20
    },
    header:{
        flex:1,
    },
    footer:{
        flex: 8,
        
    },
    
})

export default LikeScreen;