import React, { useState, createRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import * as Update from "expo-updates";

function LoginPage({navigation}) {
    const dispatch = useDispatch();

    const [UserId, setUserId] = useState("");
    const [UserPassword, setUserPassword] = useState("");

    const idInputRef = createRef();
    const passwordInputRef = createRef();

    const onSubmitHandler = () => {
        if(!UserId) {
            alert('ID를 입력해주세요.');
            return;
        }
        if(!UserPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        let body = {
            id: UserId,
            password: UserPassword,
        }

        dispatch(loginUser(body))
        .then(res => {
            if(res.payload.loginSuccess) {
                alert('로그인 완료');
                Update.reloadAsync();
            }
            else alert('ID 혹은 비밀번호가 맞지 않습니다.');
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.pageTitle}>로그인</Text>
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
            <View style={{flexDirection: 'row'}}>
                <Button icon="account-key" mode="contained" style={{width: 100, marginRight: '3%'}} onPress={onSubmitHandler}>로그인</Button>
                <Button icon="account-plus" mode="contained" style={{width: 100}} onPress={() => navigation.navigate('RegisterPage')}>회원가입</Button>
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
        borderWidth: 1,
        width: '70%',
        marginBottom: '3%'
    },
    pageTitle: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 20,
        marginBottom: '5%',
    },
  });

export default LoginPage
