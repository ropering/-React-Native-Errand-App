import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView } from 'react-native'
import Setting from '../screens/SettingsScreen'

import contactData from '../mocks/contact.json'

import { Nav } from '../../components'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';



export default SetingsActions = (props) => {
    console.log('설정 액션 화면입니다')
    let email = auth().currentUser.email
    let nickname = auth().currentUser.displayName
    // const [email, setEmail] = useState(null)
    // const [nickname, setNickname] = useState(null)

    // useEffect(() => {
    //     setNickname(auth().currentUser.displayName)
    //     setEmail(auth().currentUser.email)
    // }, [email])

    return <Setting email={email} nickname={nickname}/> //{...contactData} {...props} navi={props.navigation}
}

// storage()
//     .ref('Users/' + auth().currentUser.email) //name in storage in firebase console
//     .getDownloadURL()
//     .then((url) => {
//         console.log('then is : ', url)
//         setUrl(url)
//     })
//     .catch((e) => console.log('Errors while downloading => ', e));

    // export default SetingsActions = (props) => { 
    //     console.log('설정 액션 화면 입니다')
    //     let email = auth().currentUser.email
    //     let nickname = auth().currentUser.displayName
    //     let imageUrl = 'htt://firebasestorage.googleapis.com/v0/b/errand-1.appspot.com/o/Users%2Fmunmyeong1028%40gmail.com?alt=media&token=dbaa29d8-4add-4ecb-8c85-fce653dfaf1e'
    //     let a = 3
    //     // const [email, setEmail] = useState(null)
    //     // const [nickname, setNickname] = useState(null)
    //     // const [url, setUrl] = useState(null)
    
    //     useEffect(() => {
    //         // setEmail(auth().currentUser.email)
    //         // setNickname(auth().currentUser.displayName)
    //         // console.log(email)
    //         let imageRef = storage().ref('Users/' + email)
    
    //         imageRef
    //             .getDownloadURL()
    //             .then((url) => {
    //                 imageUrl = url
    //                 console.log('다운로드 실행')
    //                 // console.log(url)
    //                 // this.setUrl(url)
    //             })
    //             .catch((e) => console.log('Errors while downloading => ', e));
    //         }, [a])
    //     console.log('zzzzzzzzzz: ', imageUrl)
    //     return <Setting email={email} nickname={nickname} profile_img={imageUrl}/> //{...contactData} {...props} navi={props.navigation} 
    
    // }