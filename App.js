// munmyeong1028@gmail.com
import React, {useState} from 'react';
import { Button, LogBox, Alert, Image, View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';

import Mypage from './src/screens/MypageScreen';
// import Login from './src/screens/LoginScreen';
import LoginAction from './src/actions/LoginAction';
// import Register from './src/screens/RegisterScreen';
import RegisterAction from './src/actions/RegisterAction';
// import FindPw from './src/screens/FindPassword';
import FindPwAction from './src/actions/FindPwAction';

import SettingsAction from './src/actions/SettingsAction'
import ReNameAction from './src/actions/ReNameAction'
// import UploadImageAction from './src/actions/UploadImageAction'


import logo from './src/images/logo_2.png';

// Ignore log notification by message
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerRight: () => (
            <Button title="MyPage" onPress={() => navigation.navigate('Settings')} />
          )
      })}>
        <Stack.Screen name="Login" component={LoginAction} />
        <Stack.Screen name="Settings" component={SettingsAction} 
          options={ ({navigation})  => ({
            headerRight: () => (
              <Button title="Home" onPress={() => navigation.navigate('Home')}/>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
                <Image source={logo} style={styles.logo}/>
              </TouchableOpacity>
            ),
            headerTitle: () => (<Text></Text>)
            ,
            // headerStyle: {
            //   backgroundColor: '#53B77C'
            // },
            // headerTintColor: '#53B77C'
            })}
          />
        <Stack.Screen name="Register" component={RegisterAction} />
        <Stack.Screen name="ReName" component={ReNameAction} />
        <Stack.Screen name="Home" component={Mypage} options={{headerShown: false}} />
        <Stack.Screen name="FindPw" component={FindPwAction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
  }
})