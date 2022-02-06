import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import RootNavigation, {navigationRef} from './src/navigation/root-navigation'
import { Provider } from 'react-redux';
import {store} from './src/redux/root-store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
         <RootNavigation/>
      </NavigationContainer>
      </Provider>
    )
  }
}
