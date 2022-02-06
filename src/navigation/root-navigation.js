import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ScreenName} from '../utils/constant'
import { LoginScreen, SignUpScreen, HomeScreen, LikeScreen, CartScreen, ProfileScreen, DetailScreen } from "../Screen";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import React, {useEffect, useRef} from 'react';
import {createNavigationContainerRef} from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import {Dimensions, TouchableHighlight, View, Animated} from'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useSelector, useDispatch } from "react-redux";
import { getCartItem, getCountItem } from "../redux/selector/userSelector";
import { requestGetCartCount } from "../redux/thunk/appThunk";


const {width} = Dimensions.get('screen');

export const ITEM_WIDTH = width ;
export const ITEM_HEIGHT = ITEM_WIDTH *0.8;

const Tab = createBottomTabNavigator();
const StackElement = createSharedElementStackNavigator();
const StackElement2 = createSharedElementStackNavigator();

export const navigationRef = createNavigationContainerRef();
export const navigate = (name, params) => {
    if(navigationRef.isReady()){
        navigationRef.navigate(name, params);
    }
}
export const goBack = () => {
    if(navigationRef.isReady()){
        navigationRef.goBack();
    }
}
export const replace = (name) => {
    if(navigationRef.isReady()){
        navigationRef.current.dispatch(StackActions.replace(name));
    }
}
const options = {
    headerBackTitleVisible: false,
    cardStyleInterpolator: ({ current: { progress } }) => {
      return {
        cardStyle: {
          opacity: progress
        }
      };
    }
  };
const tabOptions= ({route})=>{
    
    
    return {
        headerShown: false,
        tabBarShowLabel: false,
        
        tabBarStyle: {
            position :'absolute',
            bottom: 25,
            right:20,
            left: 20,
            backgroundColor: '#000',
            borderRadius: 15,
            height: 70,
            textAlignVertical: 'center',
            paddingHorizontal: 20,
            shadowOffset: {
                width: 4,
                height: 4,
              },
              shadowOpacity: 0.3,
             
        },
        // 
    }

}
const RootStack = () =>{
    return (
        <StackElement.Navigator screenOptions={{headerShown: false}}>
            <StackElement.Screen name={ScreenName.Root}  component={RootTab} />
            <StackElement.Screen name={ScreenName.Login} component={LoginScreen}/>
            <StackElement.Screen name={ScreenName.SignUp} component={SignUpScreen}/>
            
            <StackElement.Screen name={ScreenName.Detail} component={DetailScreen} 
        options={()=> options}

        />
        </StackElement.Navigator>
    )
}
const HomeScreen1 =()=>(
    <StackElement2.Navigator screenOptions={{headerShown: false}}>
        <StackElement2.Screen name="HomeScreen" component={HomeScreen}/>
    </StackElement2.Navigator>
)

const RootTab = ()=>{
    const tabOffsetValue = useRef(new Animated.Value(0)).current;
    const dispatch = useDispatch()
    const data = useSelector(getCartItem)
    const count = useSelector(getCountItem)

    useEffect(()=>{
        dispatch(requestGetCartCount())
    },[dispatch])

    let quantity = 0;
    data.map(item=> {
        quantity += item.quantity;
        
    })
 
    return (
       
        <>
        <Tab.Navigator screenOptions={tabOptions}>
            <Tab.Screen name={ScreenName.Home} component={HomeScreen1} 
            options={{
                tabBarIcon:({focused})=>(
                    <View  
                style={[{
                position: 'absolute',
                width:'50%', 
                height:'80%', 
                alignItems: 'center', 
                 top: 18},
                  ]}
                  >
                      {focused? <Ionicons name='home' size={25} style={{color: '#ffb2dd'}} />
                    :  <Ionicons name='home-outline' size={25} style={{color:  '#ffb2dd'}} />
                    }
                      
                  </View>
                )
            }} 
            listeners={({ navigation, route }) => ({
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            })} />
            <Tab.Screen name={ScreenName.Like} component={LikeScreen} options={{
                tabBarIcon:({focused})=>(
                    <View  
                style={[{
                position: 'absolute',
                width:'50%', 
                height:'80%', 
                alignItems: 'center', 
                 top: 18},
                  ]}
                  >
                      {focused? <FontAwesome name='heart' size={25} style={{color: '#ffb2dd'}} />
                    :  <FontAwesome name='heart-o' size={25} style={{color:  '#ffb2dd'}} />
                    }
                      
                  </View>
                )
            }} listeners={({ navigation, route }) => ({
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth(),
                        useNativeDriver: true,
                    }).start();
                }
            })}/>
            <Tab.Screen name={ScreenName.Cart} component={CartScreen} options={{
                tabBarIcon:({focused})=>(
                    <View  
                style={[{
                position: 'absolute',
                width:'50%', 
                height:'80%', 
                alignItems: 'center', 
                 top: 18},
                  ]}
                  >
                      {focused? <Ionicons name='cart' size={25} style={{color: '#ffb2dd'}} />
                    :  <Ionicons name='cart-outline' size={25} style={{color:  '#ffb2dd'}} />
                    }
                      
                  </View>
                ),
                tabBarBadge: quantity,
                tabBarBadgeStyle :{
                    backgroundColor: 'pink',
                }
                
            }} listeners={({ navigation, route }) => ({
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 2,
                        useNativeDriver: true,
                    }).start();
                }
            })}/>
            <Tab.Screen name={ScreenName.Profile} component={ProfileScreen} options={{
                tabBarIcon:({focused})=>(
                    <View  
                style={[{
                position: 'absolute',
                width:'50%', 
                height:'80%', 
                alignItems: 'center', 
                 top: 18},
                  ]}
                  >
                      {focused? <FontAwesome name='user' size={25} style={{color: '#ffb2dd'}} />
                    :  <FontAwesome name='user-o' size={25} style={{color:  '#ffb2dd'}} />
                    }
                      
                  </View>
                )
            }} listeners={({ navigation, route }) => ({
                tabPress: e => {
                    Animated.spring(tabOffsetValue, {
                        toValue: getWidth() * 3,
                        useNativeDriver: true,
                    }).start();
                }
            })}/>
        </Tab.Navigator>
        <Animated.View style={{
            width: getWidth() - 35 ,
            height: 5,
            backgroundColor: 'pink',
            position: 'absolute',
            bottom: 26,
            left: 58,
            borderRadius: 15,
            transform: [
              { translateX: tabOffsetValue }
            ]
          }}>
              </Animated.View>
            </>
        
    )
    
}


// const HomeToDetail = () =>{
//     return(
//     <StackElement.Navigator screenOptions={{headerShown: false}} mode="modal" >
//         <StackElement.Screen name={ScreenName.Root}  component={RootTab}/>
//         <StackElement.Screen name={ScreenName.Detail} component={DetailScreen} 
//         options={()=> options}
//         />
//     </StackElement.Navigator>
//     )
// }

const RootNavigation = () =>{
    return <RootStack/>
}
function getWidth() {
    let width = Dimensions.get("screen").width
  
    
    width = width - 80
  
    
    return width / 4
  }
export default RootStack;

