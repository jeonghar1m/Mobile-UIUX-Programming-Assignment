import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { movieImageBaseUrl } from '../../../Config';

function SimilarInfo(props) {
    const { items } = props;
    const { navigation } = props;
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [OutputSimilarMovie, setOutputSimilarMovie] = useState(0);

    useEffect(() => {
        !isSeeMore ? setOutputSimilarMovie(4) : setOutputSimilarMovie(items.length);
    }, [isSeeMore])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontWeight: 'bold', marginBottom: '2%'}}>비슷한 영화</Text>
            {items && items.map((item, index) => (
                <TouchableOpacity onPress={() => navigation.replace("MovieDetailPage", {movieId: item.id})} style={{flexDirection: 'row'}} key={item.title}>
                    {index < OutputSimilarMovie &&
                        <>
                            <Image style={{width: 70, height: 70, marginBottom: '4%'}} source={{uri: `${movieImageBaseUrl}original${item.poster_path}`}} />
                            <View style={{flexDirection: 'column', marginTop: '5%', marginLeft: '2%'}}>
                                <Text>{item.title}</Text>
                            </View>
                        </>
                    }
                </TouchableOpacity>
            ))}
            <Button style={{backgroundColor: 'gray'}} onPress={() => setIsSeeMore(!isSeeMore)}>{!isSeeMore ? "더 보기" : "접기" }</Button>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '5%',
        backgroundColor: '#fff'
    },
    wrapper: {
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
});

export default SimilarInfo
