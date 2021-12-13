import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import axios from 'axios';

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.poster_path;
    const movieRuntime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRuntime: movieRuntime
    }

    useEffect(() => {
        axios.post('https://harim-graduation-project.herokuapp.com/api/favorite/favoriteNumber', variables)
            .then(res => {
                if(res.data.success)    setFavoriteNumber(res.data.favoriteNumber);
                else    alert('숫자 정보를 가져오는데 실패 했습니다.');
            })

        axios.post('https://harim-graduation-project.herokuapp.com/api/favorite/favorited', variables)
            .then(res => {
                if(res.data.success)    setFavorited(res.data.favorited);
                else    alert('정보를 가져오는데 실패 했습니다.');
            })
    }, [])

    const onClickFavorite = () => {
        if(Favorited) {
            axios.post('https://harim-graduation-project.herokuapp.com/api/favorite/removeFromFavorite', variables)
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1);
                        setFavorited(!Favorited);
                    }
                    else    alert('Favorite 리스트에서 지우는 것을 실패했습니다.');
                })
        } else {
            axios.post('https://harim-graduation-project.herokuapp.com/api/favorite/addToFavorite', variables)
                .then(res => {
                    if(res.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1);
                        setFavorited(!Favorited);
                    }
                    else    alert('Favorite 리스트에서 지우는 것을 실패했습니다.');
                })
        }
    }

    return (
        <>
            <Button icon="thumb-up" mode="contained" style={{color: Favorited ? 'white' : 'black', backgroundColor: Favorited ? 'green' : 'white', marginTop: '3%'}} onPress={onClickFavorite}>좋아요 {FavoriteNumber}</Button>
        </>
    )
}

export default Favorite
