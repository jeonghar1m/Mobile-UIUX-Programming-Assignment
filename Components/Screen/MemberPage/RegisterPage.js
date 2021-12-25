import React, { useState, createRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage({navigation}) {
    const dispatch = useDispatch();

    const [UserId, setUserId] = useState("");
    const [UserPassword, setUserPassword] = useState("");
    const [UserConfirmPassword, setUserComfirmPassword] = useState("");
    const [UserEmail, setUserEmail] = useState("");
    const [UserNickname, setUserNickname] = useState("");
    const [UserName, setUserName] = useState("");

    const idInputRef = createRef();
    const passwordInputRef = createRef();
    const confirmPasswordInputRef = createRef();
    const emailInputRef = createRef();
    const nicknameInputRef = createRef();
    const nameInputRef = createRef();

    const onSubmitHandler = () => {
        if(!UserId) {
            alert('ID를 입력해주세요.');
            return;
        }
        if(!UserPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if(!UserConfirmPassword) {
            alert('비밀번호 확인을 입력해주세요.');
            return;
        }
        if(!UserEmail) {
            alert('이메일을 입력해주세요.');
            return;
        }
        if(!UserNickname) {
            alert('닉네임을 입력해주세요.');
            return;
        }
        if(!UserName) {
            alert('이름을 입력해주세요.');
            return;
        }

        if(UserPassword !== UserConfirmPassword) {
            alert('비밀번호가 같지 않습니다.');
            return;
        }

        let body = {
            id: UserId,
            password: UserPassword,
            nickname: UserNickname,
            name: UserName,
            email: UserEmail
        }

        dispatch(registerUser(body))
            .then(res => {
                if(res.payload.success) navigation.navigate('LoginPage');
                else alert('회원가입에 실패했습니다.');
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>회원가입</Text>
            <TextInput
                style={styles.textFormTop}
                placeholder={'ID'}
                onChangeText={(userId) => setUserId(userId)}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                    idInputRef.current && idInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
            />
            <TextInput
                style={styles.textFormTop}
                placeholder={'닉네임'}
                onChangeText={(userNickname) => setUserNickname(userNickname)}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                    nicknameInputRef.current && nicknameInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
            />
            <TextInput
                style={styles.textFormTop}
                placeholder={'이메일'}
                onChangeText={(userEmail) => setUserEmail(userEmail)}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                    emailInputRef.current && emailInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
            />
            <TextInput
                style={styles.textFormTop}
                placeholder={'이름'}
                onChangeText={(userName) => setUserName(userName)}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                    nameInputRef.current && nameInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
            />
            <TextInput
                style={styles.textFormTop}
                placeholder={'비밀번호'}
                onChangeText={(userPw) => setUserPassword(userPw)}
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
            />
            <TextInput
                style={styles.textFormTop}
                placeholder={'비밀번호 확인'}
                onChangeText={(userConfirmPw) => setUserComfirmPassword(userConfirmPw)}
                secureTextEntry={true}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() =>
                    confirmPasswordInputRef.current && confirmPasswordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
            />
            <View style={{flexDirection: 'row'}}>
                <Button icon="account-key" mode="contained" style={{width: 100, marginRight: '3%'}} onPress={() => navigation.navigate('LoginPage')}>로그인</Button>
                <Button icon="account-plus" mode="contained" style={{width: 100}} onPress={onSubmitHandler}>회원가입</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textFormTop: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 2,
        width: '70%',
        height: 30,
        marginBottom: '3%',
        borderRadius: 10
    },
    pageTitle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 20,
        marginBottom: '5%',
    },
  });

export default RegisterPage
