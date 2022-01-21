// munmyeong1028@gmail.com
import React, {useState, useEffect} from 'react';
import { Button, LogBox, Alert, Image, View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MypageAction from './src/actions/MypageAction';
import LoginAction from './src/actions/LoginAction';
import RegisterAction from './src/actions/RegisterAction';
import FindPwAction from './src/actions/FindPwAction';
import ReNameAction from './src/actions/ReNameAction'
import FeedAction from './src/actions/FeedAction';
import WritePost from './src/actions/WritePostAction/WritePostAction';
import MyErrandAction from './src/actions/MyErrandAction'

import logo from './src/assets/img/logo_2.png';

import InputPrice from './src/screens/WritePost/InputPrice';
import SelectCategory from './src/screens/WritePost/SelectCategory';
import WriteTitle from './src/screens/WritePost/WriteTitle';
import WriteContent from './src/screens/WritePost/WriteContent';
import SelectStartDate from './src/screens/WritePost/SelectStartDate';
import SelectStartTime from './src/screens/WritePost/SelectStartTime';
import ShowDetailPost from './src/screens/ShowDetailPost';

import auth from '@react-native-firebase/auth';


// Ignore log notification by message
LogBox.ignoreAllLogs();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mypage" component={MypageAction} />
      <Tab.Screen name="Home" component={FeedAction} />
    </Tab.Navigator>
  )
}



export default App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    })
  })
  return (
    <NavigationContainer> 
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerRight: () => (
            <Button title="MyPage" onPress={() => navigation.navigate('Settings')} />
          )
        })}>
        {user ? 
        <>
            <Stack.Screen name="Tab" component={TabNavigator} options={{headerShown: false}} />
            <Stack.Screen name="SelectCategory" component={SelectCategory} />
            <Stack.Screen name="InputPrice" component={InputPrice} />
            <Stack.Screen name="WriteTitle" component={WriteTitle} />
            <Stack.Screen name="WriteContent" component={WriteContent} />
            <Stack.Screen name="SelectStartDate" component={SelectStartDate} />
            <Stack.Screen name="MyErrand" component={MyErrandAction} />
        </>
        : 
        <>
            <Stack.Screen name="Login" component={LoginAction} />
            <Stack.Screen name="Register" component={RegisterAction} />
            <Stack.Screen name="FindPw" component={FindPwAction} />
        </>
        }
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