import React, { useState, createRef } from 'react';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native';
import axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("");

    const { movieId } = props;
    
    const timestamp = new Date().getTime();

    const commentInputRef = createRef();

    const onSubmit = () => {
        if(!commentValue) {
            alert('코멘트를 입력하세요.');
            return;
        }
        
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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontWeight: 'bold', marginBottom: '2%'}}>리뷰</Text>
            {/* Comment Lists */}
            {props.commentLists && props.commentLists.map(comment => (
                (!comment.responseTo &&
                    <>
                        <SingleComment refreshFunction={props.refreshFunction} fetchItems={props.fetchItems} comment={comment} movieId={movieId} />
                        <ReplyComment refreshFunction={props.refreshFunction} fetchItems={props.fetchItems} comment={comment} movieId={movieId} commentLists={props.commentLists} />
                        {/* Root Comment Form */}
                        <View style={{flexDirection: 'row'}}>
                            <TextInput
                                style={styles.textFormTop}
                                placeholder={'코멘트를 작성하세요.'}
                                onChangeText={(commentValue) => setcommentValue(commentValue)}
                                autoCapitalize="none"
                                returnKeyType="next"
                                onSubmitEditing={() => commentInputRef.current && commentInputRef.current.focus()}
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                            <Button icon="check-bold" mode="contained" style={{width: 100, marginRight: '3%'}} onPress={onSubmit}>확인</Button>
                        </View>
                    </>
                )
            ))}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '5%',
        backgroundColor: '#fff'
    },
    textFormTop: {
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        width: '70%',
        marginBottom: '3%'
    }
});

export default Comment
