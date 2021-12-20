import React, { createRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { Gravatar } from 'react-native-gravatar';
import { Button } from 'react-native-paper';

function SingleComment(props) {
    const user = useSelector(state => state.user);

    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const commentInputRef = createRef();

    const { movieId } = props;
    const timestamp = new Date().getTime();

    const onClickReplyOpen = () => setOpenReply(!OpenReply);
    
    const onSubmit = () => {
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            movieId: movieId,
            commentId: `${movieId}+${timestamp}`
        }

        axios.post('https://back.gp.jeongharim.com/api/comment/saveComment', variables)
            .then(res => {
                if(res.data.success) {
                    setcommentValue("");
                    props.refreshFunction(res.data.result);
                } else {
                    alert('코멘츠를 저장하지 못했습니다.');
                }
            })
    }

    const onClickRemoveComment = () => {
        const variables = {
            commendId: props.comment.commentId
        }

        Alert.alert(
            "알림",
            "코멘트를 삭제할까요?",
            [
                {
                    text: "아니요",
                    style: "cancel"
                },
                {
                    text: "네",
                    onPress: () => {
                        axios.post('https://back.gp.jeongharim.com/api/comment/removeComment', variables)
                            .then(res => {
                                if(res.data.success) {
                                    alert("코멘트를 삭제했습니다.");
                                    props.fetchItems();
                                } else {
                                    alert("코멘트를 삭제하지 못했습니다.");
                                }
                            })
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <SafeAreaView style={{flexDirection: 'row', marginBottom: '3%', backgroundColor: 'gray'}}>
            {/* 코멘트 작성자 프로필 사진 */}
            <Gravatar options={{
                email: props.comment.writer.email,
                parameters: {"size": "100"},
                secure: true
            }}
            style={styles.roundedProfileImage}
            />
            <View style={{flexDirection: 'column'}}>
                {/* 코멘트 작성자 닉네임 */}
                <Text style={{fontWeight: 'bold', marginBottom: '1%'}}>{props.comment.writer.nickname}</Text>
                {/* 코멘트 내용 */}
                <Text style={{marginBottom: '1%'}}>{props.comment.content}</Text>
            </View>
            {OpenReply &&
                <View style={{flexDirection: 'row'}}>
                    <TextInput 
                        style={styles.textFormTop}
                        placeholder={'코멘트를 작성하세요.'}
                        onChangeText={(commentValue) => setCommentValue(commentValue)}
                        autoCapitalize="none"
                        returnKeyType="next"
                        onSubmitEditing={() => commentInputRef.current && commentInputRef.current.focus()}
                        underlineColorAndroid="#f000"
                        blurOnSubmit={false}
                    />
                    <Button icon="check-bold" mode="contained" style={{width: 100, marginRight: '3%'}} onPress={onSubmit}>확인</Button>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    roundedProfileImage: {
        width: 26, height: 26,
        borderColor: 'white', borderRadius:50
    },
    textFormTop: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        width: '70%',
        marginBottom: '3%'
    }
});

export default SingleComment
