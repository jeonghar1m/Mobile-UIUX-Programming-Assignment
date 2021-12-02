import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

function CreditsInfo(props) {
    const { credits, director } = props;
    const [isSeeMore, setIsSeeMore] = useState(false);
    const [OutputCast, setOutputCast] = useState(0);

    useEffect(() => {
        !isSeeMore ? setOutputCast(2) : setOutputCast(credits.cast.length);
    }, [isSeeMore])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{fontWeight: 'bold', marginBottom: '2%'}}>감독</Text>
            {director && director.map(director => (
                <TouchableOpacity onPress={() => alert('Test')} style={{flexDirection: 'row'}} key={director.name}>
                    <Image style={{width: 70, height: 70, marginBottom: '4%'}} source={{uri: director.profile_path}} />
                    <View style={{flexDirection: 'column', marginTop: '7%', marginLeft: '2%'}}>
                        <Text>{director.name}</Text>
                    </View>
                </TouchableOpacity>
            ))}
            <Text style={{fontWeight: 'bold', marginBottom: '2%'}}>출연</Text>
            {credits && credits.cast.map((cast, index) => (
                <TouchableOpacity onPress={() => alert('Test')} style={{flexDirection: 'row'}}>
                    {index < OutputCast &&
                        <>
                            <Image style={{width: 70, height: 70, marginBottom: '4%'}} source={{uri: cast.profile_path}} />
                            <View style={{flexDirection: 'column', marginTop: '5%', marginLeft: '2%'}}>
                                <Text>{cast.name}</Text>
                                <Text>{cast.character} 역</Text>
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

export default CreditsInfo
