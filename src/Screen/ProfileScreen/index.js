import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import userPicture from '../../utils/user.png'
import { useSelector, useDispatch } from 'react-redux';
import { getTokenSelector, getUserProfile } from '../../redux/selector/userSelector';
import { getRequestProfileUser } from '../../redux/thunk/appThunk';

export default function ProfileScreen() {
    const token = useSelector(getTokenSelector)
    const getProfile = useSelector(getUserProfile)
    const dispatch = useDispatch();
    useEffect(()=>{

        dispatch(getRequestProfileUser(token))

    },[])

    return (
    <View style={styles.container}>
        <View style={styles.header1}>
        </View>
        
        
        
        <Image source={{uri: getProfile.avatar}} style={styles.img} />
        <View style={styles.footer}>
        <View style={styles.inline}>
            <Text style={styles.textTitle}>Name:</Text>
            <Text style={styles.textInfo}>{getProfile.name}</Text>
        </View>
        <View style={styles.inline}>
            <Text style={styles.textTitle}>Email:</Text>
            <Text style={styles.textInfo}>{getProfile.email}</Text>
        </View>
        <View style={styles.inline}>
            <Text style={styles.textTitle}>Gender:</Text>
            <Text style={styles.textInfo}>{getProfile.gender?'Male': 'Female'}</Text>
        </View>
        <View style={styles.inline}>
            <Text style={styles.textTitle}>Phone:</Text>
            <Text style={styles.textInfo}>{getProfile.phone}</Text>
        </View>
        </View>
    
    </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor:'#fafafa',
        
    },

    img:{
        width:100,
        height: 100,
        borderRadius: 100,
        position:'absolute',
        top: 100,
        alignSelf: 'center'

    },
    header1:{
        flex:2,
        backgroundColor:'#ffb2dd',
        borderBottomRightRadius: 80,
        borderBottomLeftRadius: -80,
        
    },
    footer:{
        flex:8,
        paddingHorizontal:20,
        marginTop: 60
        
    },
    inline:{
        flexDirection:'row',
        marginBottom: 30,
    },
    textInfo:{
        marginLeft: 20,
        fontSize: 20,
        
    },
    textTitle:{
        fontSize: 20,
        fontWeight:'bold',
        fontFamily: 'AbrilFatface-Regular',
    },
})
