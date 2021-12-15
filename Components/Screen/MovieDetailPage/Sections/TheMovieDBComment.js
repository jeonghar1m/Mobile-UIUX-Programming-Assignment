import React, { useState } from 'react';
import { Text, View, Image, SafeAreaView } from 'react-native';

function TheMovieDBComment(props) {
    const { review } = props;

    const [isSeeMoreButtonActivate, setIsSeeMoreButtonActivate] = useState(true);

    return (
        <SafeAreaView style={{flexDirection: 'row', marginBottom: '3%', backgroundColor: 'gray'}}>
            {/* 코멘트 작성자 프로필 사진 */}
            <Image style={{width: 26, height: 26, marginRight: '1%'}} source={{uri: `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`}} />
            <View style={{flexDirection: 'column'}}>
                {/* 코멘트 작성자 닉네임 */}
                <Text style={{fontWeight: 'bold', marginBottom: '1%'}}>{review.author}</Text>
                {/* 코멘트 내용 */}
                <Text style={{marginBottom: '1%'}}>{isSeeMoreButtonActivate ? review.content.slice(0, 100) : review.content}</Text>
                <Text onPress={() => setIsSeeMoreButtonActivate(!isSeeMoreButtonActivate)}>{isSeeMoreButtonActivate ? '[더보기]' : '[접기]'}</Text>
            </View>
        </SafeAreaView>
    )
}

export default TheMovieDBComment
