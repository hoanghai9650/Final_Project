import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const TabIcon = ({ color, tab, onPress, icon }) => {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      {icon && <AntDesign name={icon} size={25} color={color} />}
      <Text style={{ color }}>{tab.name}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width:'50%', 
    height:'80%', 
    alignItems: 'center', 
    top: 18
  },
});

export default TabIcon;