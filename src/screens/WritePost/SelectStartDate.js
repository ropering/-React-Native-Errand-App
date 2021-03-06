import {LocaleConfig, Calendar} from 'react-native-calendars';

import firestore from '@react-native-firebase/firestore';

import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import Container from '../../components/Container';

import { Platform, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default SelectStartDate = (props) => {
  
  var now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()+1 > 9 ? now.getMonth() +1 : "0" + (now.getMonth() +1)
  const day = now.getDate() > 9 ? now.getDate() : "0" + (now.getDate())
  const current = year + "-" + month + "-" + day

  var [startDate, setStartDate] = useState();

  var [endDate, setEndDate] = useState();

  const post = firestore().collection('Board')
  
  const [markedDates, setMarkedDates] = React.useState(null);

  const { category, price, title, content} = props.route.params;

  const [user, setUser] = useState();

  const [userGrade, setUserGrade] = useState();

  const users = firestore().collection('Users')

    useEffect(() => {
        auth().onAuthStateChanged(user => {
            if (user) {
                setUser(user);
                users
                .where('nickname', '==', user["displayName"])
                .get()
                .then(querySnapshot => {
                    console.log('닉네임 검색 완료')
                    querySnapshot.forEach(function(doc) {
                        setUserGrade(doc.data()["grade"])
                        console.log(userGrade)
                    })
                })
                .catch((err) => {console.log('err', err)})
            }
            else {
                setUser(null)
            }
        })
    }, []);
        
      
    
    LocaleConfig.locales['fr'] = {
        monthNames: [
          'jan',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre'
        ],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
      };
      LocaleConfig.defaultLocale = 'fr';
      
      function addDates(date) {
        let obj = date.reduce(
          (c, v) =>
            Object.assign(c, {
            [v]: { selected: true },
            }),
          {},
        );
        console.log(obj);
        setMarkedDates(obj);
      }
        
        
        
  return (
      
    <Container>
      <View style={styles.titleMargin}>
        <View style={styles.titleWrapper}>
            <Text style={styles.title}>종료 날짜</Text>

            <Text style={styles.subTitle}>종료되는 날짜를 정해주세요.</Text>
            {/* <Text style={styles.subTitle}>{current}</Text> */}
        </View>

        <View style={styles.inputWrapper}>
            
        
        <Calendar
            minDate={current}
            onDayPress={day => {
                setStartDate(Date.parse(new Date()))
                setEndDate(Date.parse(new Date([day["dateString"]])))
                addDates([day["dateString"]]);
            }}
            markedDates={markedDates}
        />

            <TouchableOpacity 
                style={[{marginTop: 30, marginBottom: 100, alignItems: 'center', justifyContent: 'center'}]} 
                onPress={() => { 
                    if(startDate){
                        post
                        .add({
                        category: category,
                        content: content,
                        date: firestore.FieldValue.serverTimestamp(), // firestore 서버 시간
                        price: price,
                        process: "regist", // regist, matching, finished
                        title: firestore.FieldValue.arrayUnion(title, 'xcxc'), //title,
                        writer : user["displayName"], 
                        writergrade: userGrade,    // user grade
                        endDate: new Date(endDate),
                        })
                        .then(() => {
                            props.navigation.navigate("Tab")
                            console.log('post added!');
                        })
                        .catch(error => {console.error(error);})
                    //props.navigation.navigate('SelectStartTime', {category: category, price: price, title: title, content: content, startDate: startDate,  })
                    }
                    else {
                        alert("선택해 주세요.")
                    }
                }}>
                {/* <Text>게시글 올리기</Text> */}
                <Image
                    style = {styles.item}
                    source={require('../../assets/img/Ok.png')}
                />
            </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};



const styles = StyleSheet.create({
    titleMargin: {
        marginTop: "5%"
      },
      titleWrapper: {
        marginTop: Platform.OS === "ios" ? "10%" : "5%",
        marginBottom: 30,
        alignItems: "center",
        justifyContent: "center",
      },
      title: {
        fontFamily: 'Roboto-Bold',
        color: 'black',
        fontSize: 24,
        padding: 10,
      },
      subTitle: {
        marginBottom: 0,
        fontFamily: 'Roboto',
        color: 'black',
        fontSize: 18,
        padding: 10,
      },
    inputWrapper: {
      paddingHorizontal: 30,
      marginBottom: 10,
    },
    input: {
      backgroundColor: '#fff',
      marginBottom: 12,
    },
    buttonWrapper: {
      paddingHorizontal: 35,
    },
    squareButton: {
      backgroundColor: '#53B77C',
      paddingVertical: 13,
      alignItems: 'center',
      borderRadius: 5,
    },
    squareButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    textButtonText: {
      color: "#53B77C",
      fontSize: 16,
      fontWeight: "600",
    },
    focusedInput: {
        backgroundColor: "#fff",
        marginBottom: 12,
        fontWeight: "600",
        borderRadius: 7,
        ...Platform.select({
          ios: {
            shadowOpacity: 0.3,
            shadowRadius: 5,
            shadowOffset: {width: 6, height: 3},
          },
          android: {
            elevation: 6,
          },
        })
      },
      item: {
        marginTop: "10%",
        alignItems: "center",
        justifyContent: "center",
        
        width: 50, 
        height: 50, 
      },
  });
  
  const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        height: 50, 
        width: 300, 
        color: '#000000',
        borderColor: '#000000', 
        
        borderRadius: 12,
        padding: 10
    },
    inputAndroid: {
        fontSize: 16,
        height: 50, 
        width: 300, 
        color: '#000000',
        borderColor: '#000000', 
        
        borderRadius: 12,
        padding: 10
    },

  });