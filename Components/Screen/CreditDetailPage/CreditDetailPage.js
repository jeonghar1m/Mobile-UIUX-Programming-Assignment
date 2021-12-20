import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { movieImageBaseUrl, api_key, jobLang } from '../../Config';

function CreditDetailPage({navigation, route}) {
    const [CreditItems, setCreditItems] = useState([]);
    const [MovieItems, setMovieItems] = useState([]);
    const [Mode, setMode] = useState("Loading");
    const [isLoadingCreditInfo, setIsLoadingCreditInfo] = useState(true);
    const [isLoadingCreditMovieInfo, setIsLoadingCreditMovieInfo] = useState(true);

    const creditId = route.params.creditId;
    const creditInfo = `https://api.themoviedb.org/3/person?${creditId}?api_key=${api_key}&language=ko-KR`;
    const creditMovieInfo = `https://api.themoviedb.org/3/person?${creditId}/movie_credits?api_key=${api_key}&language=ko-KR`;

    let release_date = 0;

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = () => {
        if(isLoadingCreditInfo) {
            fetch(creditInfo)
                .then(res => res.json())
                .then(data => {
                    data.profile_path = `${movieImageBaseUrl}original${data.profile_path}`;
                    data.known_for_department = jobLang[data.known_for_department];
                    setCreditItems(data);
                    setIsLoadingCreditInfo(false);
                })
                .catch(() => setMode("404"))
        }
        if(isLoadingCreditMovieInfo) {
            fetch(creditMovieInfo)
                .then(res => res.json())
                .then(data => {
                    setMovieItems(data);
                    setIsLoadingCreditMovieInfo(false);
                    setMode("Normal");
                })
        }
    }

    if(Mode === "Loading") {
        return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
        )
    }
    else if(Mode === "404") {
        return (
        <View style={styles.container}>
            <Text>404 Not Found</Text>
        </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Button icon="arrow-left" mode="contained" style={{width: 100}} onPress={() => navigation.goBack(null)}>뒤로</Button>
                <View style={{flexDirection: 'row'}}>
                    <Image style={styles.creditImage} source={{uri: CreditItems.profile_path}} />
                    <Text style={styles.creditName}>{CreditItems.name}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    creditImage: {
        resizeMode: 'contain',
        width: 100,
        height: 100,
        marginTop: 24,
    },
    creditName: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 20,
        marginTop: '25%'
    },
});

export default CreditDetailPage;