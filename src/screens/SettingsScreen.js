import React, { Component, useState, useEffect, useCallback } from 'react'
import { ScrollView, Switch, StyleSheet, Text, View, LogBox, RefreshControl } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import PropTypes from 'prop-types'

import BaseIcon from './Icon'
import Chevron from './Chevron'
import InfoText from './InfoText'
import WithdrawlAction from '../actions/WithdrawlAction'
import { TouchableOpacity } from 'react-native-gesture-handler'

// import {UploadImageAction} from '../actions/UploadImageAction'
// import {CameraAction} from '../actions/CameraAction'

import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { Button } from 'react-native-paper'

import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';


LogBox.ignoreLogs(['Warning: ...']);


const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
  },
  userRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6,
  },
  userImage: {
    marginRight: 12,
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: '#ECECEC',
  },
})
export default SettingsScreen = (props) => {
  console.log('설정 페이지 화면입니다')
  propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    emails: PropTypes.arrayOf(
      PropTypes.shape({
        email: PropTypes.string.isRequired,
      })
    ).isRequired,
  }

  state = {
    pushNotifications: true,
  }
  onChangePushNotifications = () => {
    setState(state => ({
      pushNotifications: !state.pushNotifications,
    }))
  }
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const { avatar, name, email, nickname} = props

  const [visible, setVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  
  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);


  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [])

  return (
    <ScrollView style={styles.scroll} 
      refreshControl = {
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      >
      <TouchableOpacity onPress= { () => {setVisible(true)}}>
        
        <View style={styles.userRow}>
          <View style={styles.userImage}>
            <TouchableOpacity onPress={ () => {setCameraVisible(true)} }>
              <Avatar
                rounded
                size="large"
                source={{uri: props.url}}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{nickname}</Text>
            <Text
              style={{
                color: 'gray',
                fontSize: 16,
              }}
            >
              {email}
            </Text>
          </View>
          <View style={{textAlign: 'right', padding: 40}}>
            <Chevron  />
          </View>
        </View>
        
        {visible && 
          <Menu
            visible={visible}
            anchor={<Text onPress={showMenu}></Text>}
            onRequestClose={hideMenu}
          >
            <MenuItem onPress={() => {props.importFromCamera()}}>사진 촬영</MenuItem>
            <MenuItem onPress={() => {props.importFromAlbum()}}>앨범에서 사진 선택</MenuItem>
            <MenuItem onPress={() => props.navi.navigate('ReName')}>이름 수정</MenuItem>
            {/* <MenuItem disabled>Disabled item</MenuItem> */}
            {/* <MenuDivider /> */}
          </Menu>}
      </TouchableOpacity>
  
      
      <InfoText text="Account" />
      <View>
        <ListItem
          hideChevron
          title="알림 설정"
          containerStyle={styles.listItemContainer}
          rightElement={
            <Switch
              onValueChange={onChangePushNotifications}
              value={state.pushNotifications}
            />
          }
          leftIcon={
            <BaseIcon
              containerStyle={{
                backgroundColor: '#FFADF2',
              }}
              icon={{
                type: 'material',
                name: 'notifications',
              }}
            />
          }
        />
        <ListItem
          title="비밀번호 수정"
          rightTitleStyle={{ fontSize: 15 }}
          onPress={() => props.navi.navigate('FindPw')}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <BaseIcon
              containerStyle={{ backgroundColor: '#FEA8A1' }}
              icon={{
                type: 'material',
                name: 'language',
              }}
            />
          }
          rightIcon={<Chevron />}
        />
        <ListItem
          title="회원 탈퇴"
          rightTitleStyle={{ fontSize: 15 }}
          onPress={() => WithdrawlAction()}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <BaseIcon
              containerStyle={{ backgroundColor: '#FEA8A1' }}
              icon={{
                type: 'material',
                name: 'language',
              }}
            />
          }
          rightIcon={<Chevron />}
        />
      </View>
      <InfoText text="More" />
      <View>
        <ListItem
          title="About US"
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <BaseIcon
              containerStyle={{ backgroundColor: '#A4C8F0' }}
              icon={{
                type: 'ionicon',
                name: 'md-information-circle',
              }}
            />
          }
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Share our App"
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <BaseIcon
              containerStyle={{
                backgroundColor: '#C47EFF',
              }}
              icon={{
                type: 'entypo',
                name: 'share',
              }}
            />
          }
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Rate Us"
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
          leftIcon={
            <BaseIcon
              containerStyle={{
                backgroundColor: '#FECE44',
              }}
              icon={{
                type: 'entypo',
                name: 'star',
              }}
            />
          }
          rightIcon={<Chevron />}
        />
        <ListItem
          title="Send FeedBack"
          onPress={() => onPressSetting()}
          containerStyle={styles.listItemContainer}
          badge={{
            value: 123,
            textStyle: { fontSize: 14, color: 'white' },
          }}
          leftIcon={
            <BaseIcon
              containerStyle={{
                backgroundColor: '#00C001',
              }}
              icon={{
                type: 'materialicon',
                name: 'feedback',
              }}
            />
          }
          rightIcon={<Chevron />}
        />
      </View>
    </ScrollView>
  )
}

// class SettingsScreen extends Component {
//   static propTypes = {
//     avatar: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     navigation: PropTypes.object.isRequired,
//     emails: PropTypes.arrayOf(
//       PropTypes.shape({
//         email: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   }

//   state = {
//     pushNotifications: true,
//   }
//   onChangePushNotifications = () => {
//     this.setState(state => ({
//       pushNotifications: !state.pushNotifications,
//     }))
//   }

//   onPressChangePassword = () => {
//     this.props.navigation.navigate('ChangePassword')
//   }

//   onPressChangeName = () => {
//     this.props.navigation.navigate('ChangeName')
//   }

//   onPressAboutUs = () => {
//     this.props.navigation.navigate('')
//   }

//   onPressShareOurApp = () => {
//     this.props.navigation.navigate('')
//   }

//   onPressRateUs = () => {
//     this.props.navigation.navigate('')
//   }

//   onPressSendFeedBack = () => {
//     this.props.navigation.navigate('')
//   }



//   render() {
//     const { avatar, name, emails: [firstEmail] } = this.props
//     return (
//       <ScrollView style={styles.scroll}>
//         <View style={styles.userRow}>
//           <View style={styles.userImage}>
//             <Avatar
//               rounded
//               size="large"
//               source={{uri: avatar}}
//             />
//           </View>
//           <View>
//             <Text style={{ fontSize: 16 }}>{name}</Text>
//             <Text
//               style={{
//                 color: 'gray',
//                 fontSize: 16,
//               }}
//             >
//               {firstEmail.email}
//             </Text>
//           </View>
//         </View>

        
//         <InfoText text="Account" />
//         <View>
//           <ListItem
//             hideChevron
//             title="알림 설정"
//             containerStyle={styles.listItemContainer}
//             rightElement={
//               <Switch
//                 onValueChange={this.onChangePushNotifications}
//                 value={this.state.pushNotifications}
//               />
//             }
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{
//                   backgroundColor: '#FFADF2',
//                 }}
//                 icon={{
//                   type: 'material',
//                   name: 'notifications',
//                 }}
//               />
//             }
//           />
      
//           <ListItem
//             title="비밀번호 수정"
//             rightTitleStyle={{ fontSize: 15 }}
//             onPress={() => this.onPressSetting()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{ backgroundColor: '#57DCE7' }}
//                 icon={{
//                   type: 'material',
//                   name: 'place',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="이름 수정"
//             rightTitleStyle={{ fontSize: 15 }}
//             onPress={() => this.props.navi.navigate('ReNameAction')}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{ backgroundColor: '#FEA8A1' }}
//                 icon={{
//                   type: 'material',
//                   name: 'language',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//         </View>
//         <InfoText text="More" />
//         <View>
//           <ListItem
//             title="About US"
//             onPress={() => this.onPressSetting()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{ backgroundColor: '#A4C8F0' }}
//                 icon={{
//                   type: 'ionicon',
//                   name: 'md-information-circle',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Share our App"
//             onPress={() => this.onPressSetting()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{
//                   backgroundColor: '#C47EFF',
//                 }}
//                 icon={{
//                   type: 'entypo',
//                   name: 'share',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Rate Us"
//             onPress={() => this.onPressSetting()}
//             containerStyle={styles.listItemContainer}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{
//                   backgroundColor: '#FECE44',
//                 }}
//                 icon={{
//                   type: 'entypo',
//                   name: 'star',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//           <ListItem
//             title="Send FeedBack"
//             onPress={() => this.onPressSetting()}
//             containerStyle={styles.listItemContainer}
//             badge={{
//               value: 123,
//               textStyle: { fontSize: 14, color: 'white' },
//             }}
//             leftIcon={
//               <BaseIcon
//                 containerStyle={{
//                   backgroundColor: '#00C001',
//                 }}
//                 icon={{
//                   type: 'materialicon',
//                   name: 'feedback',
//                 }}
//               />
//             }
//             rightIcon={<Chevron />}
//           />
//         </View>
//       </ScrollView>
//     )
//   }
// }

// export default SettingsScreen
