import React, { Component } from 'react'
import { TextInput as RNTextInput, View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather';

export default class index extends Component {

    
    
      
    render() {
                        
        const { passwordInput ,style, errorText, placeholder, fontAwesome, feather, feather2, secureTextEntry,isFontAwesome} = this.props;
        
        
        
        return (
            <>
            <View style={styles.emailInput}>
                {isFontAwesome ? <FontAwesome
                        name={fontAwesome}
                        color="#05375a"
                        size={20} /> 
                        : <Feather
                        name={feather}
                        color="grey"
                        size={20}
                        /> 
                        }
            
            <RNTextInput
            
            
            {...this.props}
            style={[
                styles.TextInput,
                
            ]}
            />
            
            {!passwordInput ? <Feather
                        name={feather2}
                        color="red"
                        size={20}/> : 
                        <TouchableOpacity
                        onPress={()=>this.props.updateSecureEntry()}
                        >
                            {!passwordInput ? <Feather
                                    name={feather2}
                                    color="red"
                                    size={20} /> : 
                                    secureTextEntry ? <Feather
                                    name={feather2}
                                    color="red"
                                    size={20}
                                    /> : <Feather
                                    name='eye'
                                    color="red"
                                    size={20}/>}
                           
                           
                        </TouchableOpacity>  }
               
            </View>
            {!!errorText && <Text style={styles.error}>{errorText}</Text>}
            </>
        )
    }
}
const styles = StyleSheet.create({
    TextInput: {
      paddingLeft: 10,
      flex:1,
      
    },
    
    error:{
        paddingVertical: 5,
        color: 'red',
    },
    emailInput:{
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
  });

