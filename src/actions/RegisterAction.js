// bonoboss1028@gmail.com
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import RegisterScreen from '../screens/RegisterScreen';

export default RegisterAction = (props) => {
    const [nameErr, setNameErr] = useState("")
    const [isDuplicatedName, setDuplicatedName] = useState(false)
    const [nameIsEdited, setNameEdited] = useState(false)

    const [emailErr, setEmailErr] = useState("")
    const [emailIsEdited, setEmailEdited] = useState(false)

    const [pwErr, setPwErr] = useState("")
    const [pwIsEdited, setPwEdited] = useState(false)

    const [rePwErr, setRePwErr] = useState("")
    const [rePwIsEdited, setRePwEdited] = useState(false)

    const users = firestore().collection('Users')
    // useEffect 시작
    // 각종 Err 변경을 실시간 감지
    useEffect(()=>{ 
        console.log("이름 에러 : " + nameErr);
        if (null == ""){
            console.log("hello")
        }
        console.log("----------------------------");
        }, [nameErr])

    useEffect(()=>{ 
        console.log("이메일 에러 : " + emailErr);
        console.log("----------------------------");
        }, [emailErr])


    useEffect(()=>{ 
        console.log("비번 에러 : " + pwErr);
        console.log("----------------------------");
        }, [pwErr])


    useEffect(()=>{ 
        console.log("재확인 비번 에러 : " + rePwErr);
        console.log("----------------------------");
        }, [rePwErr])  

    useEffect(()=>{ 
        if(isDuplicatedName) {
            setNameErr('이미 사용 중인 이름입니다.');
        }
        console.log("중복 에러 : " + isDuplicatedName);
        console.log("----------------------------");
        }, [isDuplicatedName])
        // useEffect 종료
    


    const validateName = (nickname) => {

        var nicknameReg  =  /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/
        setNameEdited(true)

        users
        .where('nickname', '==', nickname)
        .get()
        .then(querySnapshot => {
            if(querySnapshot.size >= 1) {
                setDuplicatedName(true);
            } else {
                setDuplicatedName(false);
                if(!nickname) {
                    setNameErr('이름을 입력해주세요.');
                }
                else if(!nicknameReg.test(nickname)){
                    setNameErr('글자 수 (2~20자 이내)');
                }else {
                    setNameErr(null);
                }
            }
        })
        
        
        
        console.log("이름 : " + nickname);
        console.log("----------------------------");
        
    };
    
    const validateEmail = (email) => {
        var emailReg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        setEmailEdited(true)

        if(!email) {
            setEmailErr('이메일를 입력해주세요.');
        } else if (!emailReg.test(email)) {
            setEmailErr('이메일 형식을 올바르게 입력해주세요.');
        } else {
            setEmailErr(null);
        }

        console.log("이메일 : " + email);
        
        console.log("----------------------------");
    }
    
    const validatePassword = (password) => {
        var pwReg = /^.*(?=^.{6,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

        setPwEdited(true)

        if(!password) {
            setPwErr('비밀번호를 입력해주세요.');
        } else if (!pwReg.test(password)) {
            setPwErr('영문, 숫자, 특수문자를 모두 포함 (6~16자 이내)');
        } else {
            setPwErr(null);
        }

        console.log("비번 : " + password);
        console.log("----------------------------");
    }

    const validateRePassword = (password, confirmPassword) => {
        setRePwEdited(true)

        if(!confirmPassword) {
            setRePwErr('비밀번호 재확인을 입력해주세요.');
        } else if(confirmPassword !== password) {
            setRePwErr('비밀번호가 일치하지 않습니다.');
        } else {
            setRePwErr(null);
        }

        console.log("재확인 비번 : " + confirmPassword);
        console.log("----------------------------");
    }

    const createUser = (nickname, email, password, confirmPassword) => {
        validateName(nickname);
        validateEmail(email);
        validatePassword(password);
        validateRePassword(password, confirmPassword);
        // console.log("email : "+ email + "password : "+ password);
        // console.log("nameErr : "+ nameErr + "emailErr : "+ emailErr);
        // console.log("pwErr : "+ pwErr + "rePwErr : "+ rePwErr);

        if(!nickname || !confirmPassword || !email || !password || nameErr || emailErr || pwErr || rePwErr) {
            console.log("내용을 입력해주세요")
            return false;
        } else {
            console.log('내용 입력완료')
            // auth로 이메일, 비밀번호 회원가입
            auth().createUserWithEmailAndPassword(email, password)
                .then(async (userCredential) => {
                    // firestore에 이메일, 닉네임, 등급 저장 (이부분 수정 필요)
                    await users
                    .doc(email)
                    .set({
                        email: email,
                        nickname: nickname,
                        grade: 1,
                    })
                    .then(() => {
                        console.log('firestore User added!');
                    })
                    .catch(error => {console.error(error);})

                    // auth에 nickname도 추가
                    auth()
                    .currentUser
                    .updateProfile({
                        displayName: nickname
                    })

                    // 인증 메일 전송
                    userCredential.user?.sendEmailVerification();
                    auth().signOut();
                    Alert.alert(
                        "이메일 인증",
                        "인증 메일을 전송하였습니다.\n전송된 이메일의 링크를 클릭하면 회원가입이 완료됩니다.",
                        [{
                            text: "확인",
                            onPress: () => props.navigation.navigate('Home'),
                            style: "cancel",
                        }],
                    );
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        setEmailErr('이미 사용 중인 이메일입니다.');
                    }
                    if (error.code === 'auth/invalid-email') {
                        setEmailErr('유효하지 않은 이메일 주소입니다.');
                    }
                    else {console.log(error)}
                })
        }
    }
    
    return <RegisterScreen 
            nameIsEdited={nameIsEdited}
            emailIsEdited={emailIsEdited}
            pwIsEdited={pwIsEdited}
            rePwIsEdited={rePwIsEdited}

            nameErr={nameErr} 
            emailErr={emailErr} 
            pwErr={pwErr} 
            rePwErr={rePwErr}

            validateName={validateName}
            validateEmail={validateEmail}
            validatePassword={validatePassword}
            validateRePassword={validateRePassword}

            createUser={createUser}

            navi={props.navigation} />
}
