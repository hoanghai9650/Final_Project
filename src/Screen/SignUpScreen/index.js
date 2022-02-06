import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import {ScreenName} from '../../utils/constant'
import {navigate} from '../../navigation/root-navigation'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from '../../components';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios, { Axios } from 'axios';
import DropDown from '../../components/DropDown';
import { connect, useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../redux/thunk/appThunk';

const SignUp = () => {
    
    const navigation = useNavigation();
    const [data, setData] = useState({
        
        secureTextEntry: true,
        isFontAwesome: true,
        
    })
    const [open, setOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);
    const [gendersList, setGendersList] = useState([
        {label: 'Male', value: true},
        {label: 'Female', value: false}
    ])
    const dispatch = useDispatch();
    

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
    const onSubmit = async (values) => {
        // await axios ({
        //     method: 'POST',
        //     url:'http://svcy3.myclass.vn/api/Users/signup',
        //     data: values,
        // }).then((response) => {
        //     if(response.data.statusCode === 201){
        //        Alert.alert(
        //         "Success",
        //         "Successfully Sign Up",
                
        //       );
        //     navigation.goBack();
        //        }
            
        // })
        // .catch((error) => {
        //     Alert.alert("Fail", "Tài Khoản Đã Được Tạo");
        // })
        dispatch(signUpUser(values))
    }
    
    const formik = useFormik({
        initialValues: {
          email: '',
          password:'',
          confirm:'',
          name: '',
          phone: '',
          gender: '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Email is Required'),
            password: Yup.string()
              .min(6, 'Password Too Short!')
              .required('Password is Required'),
            confirm: Yup.string()
            .min(6, 'Password Too Short!')
            .required('Password is Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            name: Yup.string().required('Name is Required'),
            phone: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required('Phone must be number'),
            gender: Yup.boolean().required('Gender is Required'),
          }),
        onSubmit: onSubmit
      });

    return (
        
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.welcome}>Sign Up</Text>
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
                        <Text style = {styles.password}> Confirm Password</Text>
                    
                    <TextInput 
                    passwordInput={true}
                    placeholder={'Confirm Password'} 
                    secureTextEntry={data.secureTextEntry}
                    autoCapitalize='none'
                    onChangeText={formik.handleChange('confirm')}         
                    errorText={formik.errors.confirm}
                    onBlur={formik.handleBlur('confirm')}
                    touched={formik.touched.password}
                    feather="lock"
                    feather2="eye-off"
                    updateSecureEntry={updateSecureEntry}
                    
                    />
                    <Text style = {styles.password}> Name</Text>
                    
                    <TextInput 
                    
                    placeholder={'Name'} 
                    autoCapitalize='none'
                    feather="user"
                    isFeather={true}
                    onBlur={formik.handleBlur('name')}
                    touched={formik.touched.name}
                    errorText={formik.errors.name}
                    onChangeText={formik.handleChange('name')}  
                    />
                    <Text style = {styles.password}>Gender</Text>

                    <DropDown
                    placeholder="Select gender"
                    open={open}
                    value={selectedGender}
                    items={gendersList}
                    setOpen={setOpen}
                    setValue={setSelectedGender}
                    setItems={setGendersList}
                    onChangeValue={(value) => {
                         formik.setFieldValue('gender', value)
                        // console.log(value);
                      }}
                    errorText={formik.errors.gender}
    />          

                   <Text style = {styles.password}> Phone</Text>
                    
                    <TextInput 
                    onBlur={formik.handleBlur('phone')}
                    touched={formik.touched.phone}
                    errorText={formik.errors.phone}
                    onChangeText={formik.handleChange('phone')} 
                    placeholder={'Your phone number'} 
                    feather="phone"
                    
                    />

                        <View style={styles.button}>
                        
                        <TouchableOpacity 
                        onPress={formik.handleSubmit}
                        style={[styles.signIn,{
                            backgroundColor:'#e7b9ff',
                            
                        }]}
                        
                        >
                            <Text>Join</Text>
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
    },
    selection:{
        marginTop:20
    },
    dropdown: {
        flex: 1,
    top: 32,
    left: 8,
    width: '100%',
    }
})

export default SignUp;