import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import {ScreenName} from '../../utils/constant'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../../components';
import { useFormik ,Formik } from 'formik';
import * as Yup from 'yup';
import { connect, useDispatch, useSelector } from 'react-redux';
import { signInFacebook, signInUser } from '../../redux/thunk/appThunk';
import { getTokenSelector } from '../../redux/selector/userSelector';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk-next';


const LoginScreen = () => {
    const navigation = useNavigation();
    const [data, setData] = useState({
        
        secureTextEntry: true,
        isFontAwesome: true,
        
    })
 
    const dispatch = useDispatch();
    const accessToken = useSelector(getTokenSelector)

      const updateSecureEntry = () => {
        if(data.secureTextEntry){
          setData({
              ...data,
              secureTextEntry: false});
        } else {
          setData({
              ...data,
              secureTextEntry: true});
        }
    }
    
    const onSubmit = (values) => {

        dispatch(signInUser(values));
        
    }
     const handleFacebookLogin = ()=> {
        LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
          function (result) {
            if (result.isCancelled) {
              console.log('Login cancelled')
            } else {
                AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      
                      dispatch(signInFacebook(data.accessToken))
                    }
                  )
            }
          },
          function (error) {
            console.log('Login fail with error: ' + error)
          }
        )
      }
    
    
      const formik = useFormik({
        initialValues: {
          email: '',
          password:'',
          
        },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Email is Required'),
            password: Yup.string()
              .min(6, 'Password Too Short!')
              .required('Password is Required'),
          }),
        onSubmit: onSubmit
      });
      
    return (
       
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcome}>Welcome!</Text>
                </View>

                <View style={styles.footer}>
                    <Text style = {styles.email}>Email</Text>
                    
                    <TextInput 
                        placeholder={'Email'} 
                        autoCapitalize='none'
                        onChangeText={formik.handleChange('email')}  
                        onBlur={formik.handleBlur('email')}
                        touched={formik.touched.email}
                        feather="mail"
                        errorText={formik.errors.email}
                        isFontAwesome={false}
                        
                        />

                    <Text style = {styles.password}>Password</Text>
                    
                        <TextInput 
                        passwordInput={true}
                        placeholder={'Password'} 
                        secureTextEntry={data.secureTextEntry}
                        autoCapitalize='none'
                        onChangeText={formik.handleChange('password')}         
                        errorText={formik.errors.password}
                        onBlur={formik.handleBlur('password')}
                        touched={formik.touched.password}
                        feather="lock"
                        feather2="eye-off"
                        updateSecureEntry={updateSecureEntry}
                        
                        />

                        <View style={styles.button}>

                        <TouchableOpacity 
                        onPress={formik.handleSubmit}
                        style={[styles.signIn, {
                            backgroundColor:'#ffb2dd'
                        }]}
                        >
                            <Text>Sign In</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.signIn,{
                            backgroundColor:'#e7b9ff',
                            marginTop: 10,
                        }]}
                        onPress={()=> {navigation.navigate(ScreenName.SignUp)}}
                        >
                            <Text>Sign Up</Text>
                        </TouchableOpacity>

                        <Text style={{marginTop: 10}}>Or</Text>

                        {/* <LoginButton
                        // style={{}}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                    dispatch(signInFacebook(data.accessToken))
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
          <TouchableOpacity style={[styles.signIn,{
                            backgroundColor:'#a255ff',
                            marginTop: 10,
                        }]}
                        onPress={()=> {handleFacebookLogin()}}
                        >
                            <Text>Sign In With Facebook</Text>
                        </TouchableOpacity>
                            
                        </View>

                </View>

            </View>
         
    )
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ffb2dd'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal:20,
    },
    footer: {
        flex: 3,
        backgroundColor:'#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        paddingHorizontal:20,
        paddingVertical: 50


    },
    welcome: {
        color:'#fff',
        fontSize: 30,
        fontWeight:'bold',
        fontFamily: 'AbrilFatface-Regular',
    },
    email:{


    },
    emailInput:{
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    
    password: {
        marginTop: 30
    },
    button: {
        marginTop:50,
        alignItems: 'center'
    },
    signIn:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})

export default LoginScreen;