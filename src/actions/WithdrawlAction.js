import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import WithdrawlScreen from '../screens/WithdrawlScreen'


export default WithdrawlAction = (props) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    deleteUser(user)
    .then(() => {
        console.log('탈퇴되었습니다');
    })
    .catch((err) => {
        console.log(err);
    })
    // firestore에 있는 내용도 제거 필요
}