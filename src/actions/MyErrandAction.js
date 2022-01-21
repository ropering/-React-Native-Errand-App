import React, { Component, useState, useEffect, useCallback } from 'react'
import { SafeAreaView, ScrollView, Switch, StyleSheet, Text, View, LogBox, RefreshControl, TouchableOpacity } from 'react-native'

import firestore from '@react-native-firebase/firestore';

import MyErrandScreen from '../screens/MyErrandScreen'


export default MyErrandAction = (props) => {
    var query = firestore().collection('Board').where('writer', '==', 'jk');
    
    const [registeredPosts, setRegisteredPosts] = useState([])
    const [completedPosts, setCompletedPosts] = useState([])
    const [inProcessingPosts, setInProcessingPosts] = useState([])
    
    const RegisteredErrand = () => {
        let data = query.where('process', '==', 'regist')
        // query = query.where('process', '==', 'regist');
        
        data
        .limit(7)
        .get()
        .then(querySnapshot => {
            let documentData = [];
    
            querySnapshot.forEach(documentSnapshot => {
                documentData.push({
                    ...documentSnapshot.data(),
                });
            })
            setRegisteredPosts(documentData);
        })
    }
    
    const CompletedErrand = () => {
        let data = query.where('process', '==', 'completed')
        // query = query.where('process', '==', 'regist');
        
        data
        .limit(7)
        .get()
        .then(querySnapshot => {
            let documentData = [];
    
            querySnapshot.forEach(documentSnapshot => {
                documentData.push({
                    ...documentSnapshot.data(),
                });
            })
            setCompletedPosts(documentData);
        })
    }
    
    const InProcessingErrand = () => {
        let data = query.where('process', '==', 'in processing')
        // query = query.where('process', '==', 'regist');
        
        data
        .limit(7)
        .get()
        .then(querySnapshot => {
            let documentData = [];
    
            querySnapshot.forEach(documentSnapshot => {
                documentData.push({
                    ...documentSnapshot.data(),
                });
            })
            setInProcessingPosts(documentData);
        })
    }

    return <MyErrandScreen
                registeredPosts={registeredPosts}
                completedPosts={completedPosts}
                inProcessingPosts={inProcessingPosts}

                RegisteredErrand={RegisteredErrand}
                CompletedErrand={CompletedErrand}
                InProcessingErrand={InProcessingErrand}
            />
}