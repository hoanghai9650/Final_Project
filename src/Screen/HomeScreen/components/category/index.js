import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default function CategoryTitle({onPress, title, bgColor, style, color, disable}) {
    return (
        <View >
            <TouchableOpacity disabled={disable} onPress={onPress} style={styles.categoryButton}>
            <View style={[styles.title, {backgroundColor:bgColor}]}>
                     <Text style={[styles.categoryTitle, {color:color}]}>{title}</Text>
                     </View>       
                     </TouchableOpacity>
                     
                     </View>
                    
    )
}
const styles = StyleSheet.create({
    categoryButton: {
        paddingVertical: 10,
        marginRight: 15,
        
          },
    categoryTitle: {
        fontSize: 20,
        textTransform: 'capitalize',
        
          },
    title:{
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        
          },
    
})
