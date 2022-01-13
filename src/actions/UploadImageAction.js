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


export function UploadImageAction(props)  {
  // console.log(1)
  // let test = ''
  // storage()
  //   .ref('Users/' + 'rn_image_picker_lib_temp_52039d19-15da-45e0-be94-f3d98b5922f0.jpg') //name in storage in firebase console
  //   .getDownloadURL()
  //   .then((url) => {
  //     console.log(url)
  //   })
  //   .catch((e) => console.log('Errors while downloading => ', e));
  
  const options = {
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
    },
  };

  
  launchImageLibrary(options, (response) => {
    if (response["didCancel"] !== true) { // 뒤로가기 시 에러 처리
        console.log(1111)
        const source = response['assets'][0]['uri']; // 취소 시 여기서 여기서 에러 발생 (값이 제대로 저장되지 않아서)
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
  })
  // // useState로 값이 저장되기도 전에 다음 명령을 수행해서 값이 제대로 출력되지 않는 문제
  // 2022-01-12 10:09:27 사진 라이브러리에서 빠져나오면 에러 발생 문제
  
  return 
}
  // const filename = uri.substring(uri.lastIndexOf('/') + 1);
  // console.log(filename)
  // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  // setUploading(true);
  // setTransferred(0);
  // const task = storage()
  //   .ref(filename)
  //   .putFile(uploadUri);
  // // set progress state
  // task.on('state_changed', snapshot => {
  //   setTransferred(
  //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
  //   );
  // });
  // try {
  //   task;
  // } catch (e) {
  //   console.error(e);
  // }
  // setUploading(false);
  // Alert.alert(
  //   'Photo uploaded!',
  //   'Your photo has been uploaded to Firebase Cloud Storage!'
  // );
  // setImage(null);


  // const { uri } = image;
  // const filename = uri.substring(uri.lastIndexOf('/') + 1);
  // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  // console.log(filename)


  // const filename = uri.substring(uri.lastIndexOf('/') + 1);
  // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  // setUploading(true);
  // setTransferred(0);
  // const task = storage()
  //   .ref(filename)
  //   .putFile(uploadUri);
  // // set progress state
  // task.on('state_changed', snapshot => {
    //   setTransferred(
      //     Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      //   );
      // });
      // try {
        //   await task;
        // } catch (e) {
          //   console.error(e);
          // }
          // Alert.alert(
            //   'Photo uploaded!',
            //   'Your photo has been uploaded to Firebase Cloud Storage!'
            // );
            
            
            // console.log(2)
  // const openPicker =()=>{
  //   let imageName = 'IMG_20220105_190840.jpg'
  //   let path = ''

  //   let reference = storage().ref(imageName);         // 2
  //   let task = reference.putFile(path);               // 3

  //   task.then(() => {                                 // 4
  //       console.log('Image uploaded to the bucket!');
  //   }).catch((e) => console.log('uploading image error => ', e));

    
    // const {imageName} = 'camper.jpg';
    // let imageRef = storage().ref('/' + imageName);
    // imageRef
    //   .getDownloadURL()
    //   .then((url) => {
    //     //from url you can fetched the uploaded image easily
    //     this.setState({profileImageUrl: url});
    //   })
    //   .catch((e) => console.log('getting downloadURL of image error => ', e));
    
    


    // launchCamera(options, (response) => { // Use launchImageLibrary to open image gallery
    //   console.log('Response = ', response);
    
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const source = { uri: response.uri };
    
    //     // You can also display the image using data:
    //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
    //     console.log(source)
    //   }
    // });
  // return openPicker()
// }

// import * as ImagePicker from 'react-native-image-picker';

// export default UploadImageAction = () => {
  // console.log(1)
  // const options = {
  //   title: 'Select Avatar',
  //   storageOptions: {
  //     skipBackup: true,
  //     path: 'images',
  //   },
  // };
  
  // ImagePicker.showImagePicker(options, (response) => {
  //   console.log('Response = ', response);
  
  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.error) {
  //     console.log('ImagePicker Error: ', response.error);
  //   } else {
  //     const uri = response.uri;
  //     this.setState({
  //       selectedPictureUri: uri,
  //     });
  //   }
  // });

// }
