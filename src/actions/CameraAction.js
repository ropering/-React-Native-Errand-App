import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import storage from '@react-native-firebase/storage';
import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';
import SettingsScreen from '../screens/SettingsScreen';
import TestScreen from './TestScreen'
import auth from '@react-native-firebase/auth';


export function CameraAction(props)  {
    const options = {
        title: 'Select Avatar',
        storageOptions: {
          skipBackup: true,
        },
      };

    launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = response['assets'][0]['uri'];
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        // console.log(source)
        const filename = source.substring(source.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? source.replace('file://', '') : source;
    
        const task = storage()
          .ref('Users/'+ auth().currentUser.email) // storage에 저장될 경로
          .putFile(uploadUri); // 보낼 이미지의 경로
        // set progress state
        task.on('state_changed', taskSnapshot => {
          console.log(taskSnapshot.state);
        });
        task.then(() => {
          console.log('Task complete');
        })
        .catch((error) => {
          console.error(error.message);
        });
        
      }
    });
    return 
    
}
