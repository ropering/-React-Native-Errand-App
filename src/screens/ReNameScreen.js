import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Fontisto';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Container from '../components/Container';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

export default ReNameScreen = (props) => {
    const [name, setName] = useState('');
    return (
        <Container>
            <View style={props.menustyle}>
                <Menu
                    ref={(ref) => (_menu = ref)}
                    button={
                    props.isIcon ? (
                        <TouchableOpacity onPress={() => _menu.show()}>
                        <Image
                            source={{
                            uri:
                                'https://reactnativecode.com/wp-content/uploads/2020/12/menu_icon.png',
                            }}
                            style={{width: 30, height: 30}}
                        />
                        </TouchableOpacity>
                    ) : (
                        <Text
                        onPress={() => _menu.show()}
                        >
                        aa
                        </Text>
                    )
                    }>
                    <MenuItem onPress={() => {Alert.alert('PopUp Menu Button Clicked...')}}>
                    Menu Item 1
                    </MenuItem>
            
                    <MenuItem disabled>Disabled Menu Item 2</MenuItem>
            
                    <MenuDivider />
            
                    <MenuItem onPress={() => {Alert.alert('PopUp Menu Button Clicked...')}}>
                    Menu Item 3
                    </MenuItem>
            
                </Menu>
            </View>
        </Container>
        // <Container>
        //     <View style={styles.titleWrapper}>
        //         <Text style={styles.title}>Change{"\n"}Name?</Text>
        //         <Text style={styles.textArea}>변경할 이름을 입력해주세요.{"\n"}</Text>
        //     </View>
        //     <View style={styles.inputWrapper}>
        //         <TextInput 
        //             style={styles.input}
        //             placeholder="Name"
        //             value={name}
        //             autoCapitalize='none'
        //             autoCorrect={false}
        //             onChangeText={text => {setName(text)}}
        //             blurOnSubmit={false}
        //             onSubmitEditing={() => {props.changeName(name)}}
        //             selectionColor="#292929"
        //             // react-native-paper
        //             activeUnderlineColor='#53B77C'
        //             left={<TextInput.Icon name={() => <Icon name="email" size={20} color="#53B77C" />} />}
        //         />
        //         <Text style={{
        //             fontSize: 14,
        //             // marginBottom: props.err ? 30 : 0, 
        //             // color: props.err.charAt(0) === "비" ? 'green' : 'red'
        //         }}>
        //         {props.err}
        //         </Text>
        //     </View>
        //     <View style={styles.buttonWrapper}>
        //         <TouchableOpacity style={styles.squareButton} onPress={() => {props.changeName(name)}}>
        //             <Text style={styles.squareButtonText}>{name && !props.err ? "전송" : "이름 변경하기"}</Text>
        //         </TouchableOpacity>
        //     </View>
        // </Container>
    )
}

const styles = StyleSheet.create({
    titleWrapper: {
        marginLeft: 30,
        marginTop: Platform.OS === "ios" ? "15%" : "10%",
        marginBottom: 40,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        color: 'black',
        fontSize: 32,
        lineHeight: 45,        
    },
    textArea: {
        fontFamily: 'Roboto-Light',
        color: 'black',
        fontSize: 16,
        marginTop: 25,
    },
    inputWrapper: {
        paddingHorizontal: 35,
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
})