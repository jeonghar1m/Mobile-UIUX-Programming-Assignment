import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Button, Modal, Portal } from 'react-native-paper';
import { movieApiBaseUrl, movieImageBaseUrl, api_key, movieLang, countriesLang } from '../../Config';
import { WebView } from "react-native-webview";
import MovieInfo from './Sections/MovieInfo';
import CreditsInfo from './Sections/CreditsInfo';
import SimilarInfo from './Sections/SimilarInfo';

function MovieDetailPage({navigation, route}) {
  const [movieItems, setMovieItems] = useState([]);
  const [creditsItems, setCreditsItems] = useState([]);
  const [directorsItems, setDirectorsItems] = useState([]);
  const [similarItems, setSimilarItems] = useState([]);
  const [TrailerItem, setTrailerItem] = useState("");
  const [creditsToggle, setCreditsToggle] = useState(false);
  const [mode, setMode] = useState("Loading");
  const [isLoadingMovie, setIsLoadingMovie] = useState(true);
  const [isLoadingCredits, setIsLoadingCredits] = useState(true);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(true);
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTrailerExist, setIsTrailerExist] = useState(true);

  const movieId = route.params.movieId;

  const movieInfo = `${movieApiBaseUrl}${movieId}?api_key=${api_key}&language=ko-KR`;
  const creditsInfo = `${movieApiBaseUrl}${movieId}/credits?api_key=${api_key}`;
  const trailerInfo = `${movieApiBaseUrl}${movieId}/videos?api_key=${api_key}&language=ko-KR`;
  const similarInfo = `${movieApiBaseUrl}${movieId}/similar?api_key=${api_key}&language=ko-KR`;

  let release_date = 0;

  useEffect(() => {
      fetchItems();
  })

  const fetchItems = () => {
    if(isLoadingMovie) {
        fetch(movieInfo)
            .then(res => res.json())
            .then(data => {
                data.poster_path = `${movieImageBaseUrl}original${data.poster_path}`;
        
                // 언어 data값 문자열 한국어로 번역
                for(let index = 0; index < data.spoken_languages.length; index++)
                    data.spoken_languages[index].name = movieLang[data.spoken_languages[index].english_name];
                
                for(let index = 0; index < data.production_countries.length; index++)
                    data.production_countries[index].name = countriesLang[data.production_countries[index].iso_3166_1];

                release_date = new Date(data.release_date);
                
                setMovieItems(data);
                setMode("Normal");
                setIsLoadingMovie(false);
            })
            .catch(err => {
                setMode("404");
            });
    }
    if(isLoadingCredits) {
      fetch(creditsInfo)
        .then(res => res.json())
        .then(data => {
          for(let index = 0; index < data.cast.length; index++)
            if(data.cast[index].profile_path !== null)
              data.cast[index].profile_path = `${movieImageBaseUrl}original${data.cast[index].profile_path}`;
            else
              data.cast[index].profile_path = '../../../assets/profile_image_unknown.jpg';
            
            const director = data.crew.filter(crew => (crew.job === "Director"));

            for(let index = 0; index < director.length; index++)
              if(director[index].profile_path !== null)
                director[index].profile_path = `${movieImageBaseUrl}original${director[index].profile_path}`;
              else
                director[index].profile_path = '../../../assets/profile_image_unknown.jpg';

            setCreditsItems(data);
            setDirectorsItems(director);
            setCreditsToggle(true);
            setIsLoadingCredits(false);
        })
        .catch(err => setMode("404"));
    }
    if(isLoadingTrailer) {
      fetch(trailerInfo)
        .then(res => res.json())
        .then(data => setTrailerItem(`https://www.youtube.com/embed/${data.results[0].key}`))
        .catch(err => setIsTrailerExist(false))
    }
  }
  if(isLoadingSimilar) {
    fetch(similarInfo)
      .then(res => res.json())
      .then(data => {
        setSimilarItems(data.results);
        setIsLoadingSimilar(false);
      })
      .catch(err => setMode("404"))
  }

  if(mode === "Loading") {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    )
  }
  else if(mode === "404") {
    return (
      <View style={styles.container}>
        <Text>404 Not Found</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Portal>
          <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} contentContainerStyle={{flex: 1, backgroundColor: '#fff', padding: 10, margin: '5%', width: '90%', height: '10%'}}>
            <WebView style={{ margin: '5%', padding: 10 }} mixedContentMode='always' source={{ uri: TrailerItem }} useWebKit={true} scrollEnabled={false} domStorageEnabled={true} javaScriptEnabled={true} />
          </Modal>
        </Portal>
        <Button icon="arrow-left" mode="contained" style={{width: 100}} onPress={() => navigation.goBack(null)}>뒤로</Button>
        <View style={{flexDirection: 'row'}}>
          <Image style={styles.movieImage} source={{uri: movieItems.poster_path}} />
          <Text style={styles.movieTitle}>{movieItems.title}</Text>
        </View>
        {isTrailerExist &&
          <View style={{marginTop: '3%'}}>
            <Button mode="contained" onPress={() => setIsModalVisible(true)}>트레일러</Button>
          </View>
        }
        <MovieInfo movie={movieItems} />
        {creditsToggle &&
          <CreditsInfo credits={creditsItems} director={directorsItems} />
        }
        <SimilarInfo items={similarItems} />
      </ScrollView>
    </SafeAreaView>
  );
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
});

export default MovieDetailPage;