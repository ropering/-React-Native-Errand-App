// munmyeong1028@gmail.com
import React, {useState} from 'react';
import { Button, LogBox, Alert, Image, View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Mypage from './src/screens/MypageScreen';
import LoginAction from './src/actions/LoginAction';
import RegisterAction from './src/actions/RegisterAction';
import FindPwAction from './src/actions/FindPwAction';
import SettingsAction from './src/actions/SettingsAction'
import ReNameAction from './src/actions/ReNameAction'
import FeedAction from './src/actions/FeedAction';
import WritePost from './src/actions/WritePostAction/WritePostAction';

import logo from './src/assets/img/logo_2.png';

import InputPrice from './src/screens/WritePost/InputPrice';
import SelectCategory from './src/screens/WritePost/SelectCategory';
import WriteTitle from './src/screens/WritePost/WriteTitle';
import WriteContent from './src/screens/WritePost/WriteContent';
import SelectStartDate from './src/screens/WritePost/SelectStartDate';
import SelectStartTime from './src/screens/WritePost/SelectStartTime';
import ShowDetailPost from './src/screens/ShowDetailPost';

// Ignore log notification by message
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={FeedAction} />
      <Tab.Screen name="Mypage" component={Mypage} />
    </Tab.Navigator>
  )
}



export default App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerRight: () => (
            <Button title="MyPage" onPress={() => navigation.navigate('Settings')} />
          )
        })}>
        <Stack.Screen name="Tab" component={TabNavigator} options={{headerShown: false}}/>
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
        <Stack.Screen name="Login" component={LoginAction} />
        <Stack.Screen name="Register" component={RegisterAction} />
        <Stack.Screen name="ReName" component={ReNameAction} />
        <Stack.Screen name="Home" component={Mypage} options={{headerShown: false}} />
        <Stack.Screen name="FindPw" component={FindPwAction} />

        <Stack.Screen name="WritePost" component={WritePost} />
        <Stack.Screen name="SelectCategory" component={SelectCategory} />
        <Stack.Screen name="InputPrice" component={InputPrice} />
        <Stack.Screen name="WriteTitle" component={WriteTitle} />
        <Stack.Screen name="WriteContent" component={WriteContent} />
        <Stack.Screen name="SelectStartDate" component={SelectStartDate} />
        <Stack.Screen name="SelectStartTime" component={SelectStartTime} />
        <Stack.Screen name="ShowDetailPost" component={ShowDetailPost} />
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