import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native'
import Setting from '../screens/SettingsScreen'

import contactData from '../mocks/contact.json'

import { Nav } from '../../components'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.

// firebase에 이미지를 올리기도 전에 firebase에서 이미지를 다운로드 받아버리는 문제. promise를 써야할 것으로 예상
export default SetingsActions = (props) => {
    console.log('설정 액션 화면입니다')
    // let email = auth().currentUser.email
    // let nickname = auth().currentUser.displayName
    const [email, setEmail] = useState(auth().currentUser.email)
    const [nickname, setNickname] = useState(auth().currentUser.displayName)
    const [url, setUrl] = useState(null)
    const [updateImg, setUpdateImg] = useState(null)

    const options = {
        title: 'Select Avatar',
        storageOptions: {
        skipBackup: true,
        },
    };
    
    
    

    console.log("url is : ", url)

    const importFromCamera = () => {
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
              console.log(uploadUri)
          
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

            storage()
                    .ref('Users/' + email) //name in storage in firebase console
                    .getDownloadURL()
                    .then((url) => {
                        console.log('이미지를 다운로드 하였습니다')
                        setUrl(url)
                    })
                    .catch((e) => console.log('Errors while downloading => ', e));
        });
        
    }

    const importFromAlbum = () => {
    
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

            storage()
                .ref('Users/' + email) //name in storage in firebase console
                .getDownloadURL()
                .then((url) => {
                    console.log('이미지를 다운로드 하였습니다')
                    setUrl(url)
                })
                .catch((e) => console.log('Errors while downloading => ', e));

        })
    //   useEffect(() => {
        // 두번 실행됨
        // }, [])
    
  }
    

    return <Setting 
                email={email} 
                nickname={nickname} 
                navi={props.navigation}
                url = {url}
                importFromAlbum = {importFromAlbum}
                importFromCamera = {importFromCamera}

    /> //{...contactData} {...props} 
}
/*
(값을 받아) 처리하는 기능
- 카메라 앨범
- 사진 촬영
- 프로필 이미지 띄우기
*/ 