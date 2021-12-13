import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function FavoriteListPage({ navigation }) {
    const [Favorites, setFavorites] = useState([]);
    const [UserId, setUserId] = useState("");

    useEffect(() => {
        AsyncStorage.getItem('userId')
            .then(userId => {
                setUserId(userId);
                
                axios.post('https://harim-graduation-project.herokuapp.com/api/favorite/getFavoritedMovie', { userFrom: userId })
                    .then(res => {
                        if(res.data.success)    setFavorites(res.data.favorites);
                        else    alert('영화 정보를 가져오는데 실패했습니다.');
                    })
            })
            
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Button icon="arrow-left" mode="contained" style={{width: 100}} onPress={() => navigation.goBack(null)}>뒤로</Button>
                <Text style={{fontWeight: 'bold', marginBottom: '2%', textAlign: 'center'}}>좋아하는 영화 목록</Text>
                {Favorites.map(favorite => (
                    <TouchableOpacity onPress={() => alert('Test')} style={{flexDirection: 'row'}} key={favorite.movieTitle}>
                        <Image style={{width: 70, height: 70, marginBottom: '4%'}} source={{uri: favorite.moviePost}} />
                            <View style={{flexDirection: 'column', marginTop: '5%', marginLeft: '2%'}}>
                            <Text>{favorite.movieTitle}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
});

export default FavoriteListPage