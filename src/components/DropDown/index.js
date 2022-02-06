import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

export default class DropDown extends Component {
    render() {
        const {errorText} = this.props;
        return (
            <View>
               <DropDownPicker
              {...this.props}
        />
        {!!errorText && <Text style={styles.error}>{errorText}</Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    error:{
        paddingVertical: 5,
        color: 'red',
    },
})
