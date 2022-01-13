import React, {useState} from 'react';
import { Button, LogBox, Alert, Image, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
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

import WithdrawlAction from './src/actions/WithdrawlAction'

// Ignore log notification by message
LogBox.ignoreAllLogs();
// bonoboss1028@student.anu.ac.kr

const Stack = createStackNavigator();

// const CustomMenu = (props) => {
//   let _menu = null;
//   // console.log(1)
//   const [visible, setVisible] = useState(false);

//   const hideMenu = () => setVisible(false);

//   const showMenu = () => setVisible(true);
//   return (

//     <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
//       <Menu
//         visible={visible}
//         anchor={<Text onPress={showMenu}>Show menu</Text>}
//         onRequestClose={hideMenu}
//       >
//         <MenuItem onPress={hideMenu}>Menu item 1</MenuItem>
//         <MenuItem onPress={hideMenu}>Menu item 2</MenuItem>
//         <MenuItem disabled>Disabled item</MenuItem>
//         <MenuDivider />
//         <MenuItem onPress={hideMenu}>Menu item 4</MenuItem>
//       </Menu>
//     </View>
//   );
// };
 
// const HomeScreen = ({navigation, route}) => {
//   return (
//     <SafeAreaView style={{flex: 1}}>
 
//       <View style={{flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center'}}>
 
//           <Text style={{ fontSize: 24}}> Home Page </Text>
 
//       </View>
 
//     </SafeAreaView>
//   );
// };
// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="HomeScreen"
//         screenOptions={({route, navigation}) => ({
//           headerRight: () => (
//             // <Button title="MyPage" onPress={console.log(1)}/>
//             <CustomMenu
//               menutext="Menu"
//               menustyle={{marginRight: 14}}
//               textStyle={{color: 'white'}}
//               navigation={navigation}
//               route={route}
//               isIcon={true}
//             />
//           ),
//         })}>
//         <Stack.Screen
//           name="HomeScreen"
//           component={HomeScreen}
//           options={{
//             title: 'Home Page',
//             headerStyle: {
//               backgroundColor: '#00C853',
//             },
//             headerTintColor: '#fff',
//             headerTitleStyle: {
//               fontWeight: 'bold',
//             },
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
 
// export default App;


export default App = () => {
  return (
    <NavigationContainer> 
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerRight: () => (
            // <CustomMenu
            //   menutext="Menu"
            //   menustyle={{marginRight: 14}}
            //   textStyle={{color: 'white'}}
            //   navigation={navigation}
            //   route={route}
            //   isIcon={true}
            // />
            <Button title="MyPage" onPress={() => navigation.navigate('Settings')} />
          )
      })}>
        {/* <Stack.Screen name="Withdrawl" component={WithdrawlAction} /> */}
        <Stack.Screen name="Settings" component={SettingsAction} 
          screenOptions={ ()  => ({
            headerRight: () => (
              <Button>gd</Button>
              )
            })}
          />
        <Stack.Screen name="Login" component={LoginAction} />
        <Stack.Screen name="ReName" component={ReNameAction} />
        <Stack.Screen name="Home" component={Mypage} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={RegisterAction} />
        <Stack.Screen name="FindPw" component={FindPwAction} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}