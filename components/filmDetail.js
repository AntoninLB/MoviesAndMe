import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import FilmItem from './FilmItem';

class FilmDetail extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            film : undefined,
            isLoading : true
        }
    }


    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style = {styles.loading_container}>
                    <ActivityIndicator size = 'large' />
                </View>
            )
        }
    }




    componentDidMount() {
        getFilmDetailFromApi(this.props.route.params.idFilm)
            .then(data => {
                this.setState({
                    film: data,
                    isLoading: false
                })
            })
    }

    _displayFilm(){
        if(this.state.film != undefined){
            return (
                <ScrollView style= {styles.scrollView_container}>
                    <Image
          style={styles.image}
          source={{uri: getImageFromApi(this.state.film.poster_path)}}
        />
                    <Text>{this.state.film.title}</Text>
                    <Text>{this.state.film.overview}</Text>
                    <Text>Sortit le {this.state.film.release_date}</Text>
                    <Text>Note : {this.state.film.vote_average}/10</Text>
                    <Text>Nombre de votes : {this.state.film.vote_count}</Text>
                    <Text>Budget : {this.state.film.budget}</Text>
                    <Text>Genre(s) : {this.state.film.genres}</Text>
                </ScrollView>
            )
        }
    }

    render() {
        console.log(this.props.navigation)
        return (
            <View style = {styles.main_container}>
               {this._displayLoading()}
               {this._displayFilm()}
            </View>
        )
    }


  

}

const styles = StyleSheet.create({
    main_container: {
        flex:1,
        flexDirection: 'row'
        
    },
    loading_container: {
        position : 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent:'center'
    },
    image: {
        
        width: '100%',
    height: 180,
    margin: 5,
    backgroundColor: 'gray',
    alignSelf: 'stretch'
    },
    scrollView_container:{
        
        
    }
})

export default FilmDetail 