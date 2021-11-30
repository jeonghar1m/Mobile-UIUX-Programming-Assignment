import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';

function MovieInfo(props) {
    const { movie } = props;
    const [IsSeeMore, setIsSeeMore] = useState(false);
    const release_date = new Date(movie.release_date);

    const seeMore = () => {
        setIsSeeMore(true);
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <Image style={styles.movieImage} source={{uri: movie.poster_path}} />
                <Text style={styles.movieTitle}>{movie.title}</Text>
            </View>
            {(movie.overview !== "") &&
                <View style={styles.infoArea}>
                    <Text style={{fontWeight: 'bold'}}>줄거리</Text>
                    <Text style={{marginTop: '3%'}}>{IsSeeMore ? `${movie.overview}` : `${movie.overview.slice(0, 100)}`}
                        {(!IsSeeMore && movie.overview.length > 100) &&
                            <Text onPress={seeMore}>...[더보기]</Text>
                        }
                    </Text>
                </View>
            }
            <View style={styles.infoArea}>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>원제</Text>
                    <Text style={{marginLeft: '5%'}}>{` ${movie.original_title}`}</Text>
                </Text>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>개봉년도</Text>
                    <Text style={{marginLeft: '5%'}}>{` ${release_date.getFullYear()}년`}</Text>
                </Text>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>국가</Text>
                    {movie.production_countries.map((countries, index) => (
                        <Text style={{marginLeft: '5%'}} key={countries.name}>{`${countries.name}${(index < movie.production_countries.length - 1) ? ',': ''}`}</Text>
                    ))}
                </Text>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>장르</Text>
                    {movie.genres.map((genres, index) => (
                        <Text style={{marginLeft: '5%'}} key={genres.name}>{`${genres.name}${(index < movie.genres.length - 1) ? ',': ''}`}</Text>
                    ))}
                </Text>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>상영시간</Text>
                    <Text style={{marginLeft: '5%'}}>{` ${movie.runtime}분`}</Text>
                </Text>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>상영언어</Text>
                    {movie.spoken_languages.map((lang, index) => (
                        <Text style={{marginLeft: '5%'}} key={lang.name}>{`${lang.name}${(index < movie.spoken_languages.length - 1) ? ',': ''}`}</Text>
                    ))}
                </Text>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>TheMovieDB 평점</Text>
                    <Text style={{marginLeft: '5%'}}>{`${movie.vote_average}`}</Text>
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    movieImage: {
      resizeMode: 'contain',
      width: 100,
      height: 100,
      marginTop: 24,
    },
    movieTitle: {
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: 20,
      marginTop: '25%'
    },
    infoArea: {
        backgroundColor: 'white', 
        marginTop: '3%'
    }
});

export default MovieInfo
