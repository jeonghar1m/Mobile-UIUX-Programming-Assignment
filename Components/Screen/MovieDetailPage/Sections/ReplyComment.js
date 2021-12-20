import React, { useEffect, useState } from 'react';
import SingleComment from './SingleComment';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native';

function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map(comment => {
            if(comment.responseTo === props.parantCommentId)    commentNumber++;
        })
        setChildCommentNumber(commentNumber);
    }, [props.commentLists, props.parantCommentId])

    const renderReplyComment = (parantCommentId) => 
        props.commentLists.map((comment, index) => (
            <>
                {comment.responseTo === parantCommentId &&
                    <View style={{width: '80%', marginLeft: '40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} movieId={props.movieId} />
                        <ReplyComment refreshFunction={props.refreshFunction} commentLists={props.commentLists} movieId={props.movieId} parantCommentId={comment._id} />
                    </View>
                }
            </>
        ))

    return (
        <SafeAreaView style={{flexDirection: 'row', marginBottom: '3%', backgroundColor: 'gray'}}>
            {ChildCommentNumber > 0 &&
                <Text onPress={() => setOpenReplyComments(!OpenReplyComments)} style={{fontSize: '14px', margin: 0, color: 'gray'}}>{ChildCommentNumber}개의 댓글 더보기</Text>
            }
            {OpenReplyComments &&
                renderReplyComment(props.parantCommentId)
            }
        </SafeAreaView>
    )
}

export default ReplyComment
