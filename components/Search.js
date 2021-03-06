import React from 'react'
import { StyleSheet,View, TextInput, Button, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';

class Search extends React.Component {

    constructor(props){
        super(props)
        this.searchedText = ""
        this.state = { 
            films: [],
            isLoading : false
        }
        this.page = 0
        this.totalPages = 0
    }




    _displayDetailForFilm = (idFilm) => {

        console.log("Display film with id " + idFilm)
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })

    }


    _displayLoading(){
        if (this.state.isLoading){
            return (
                <View style = {styles.loading_container}>
                    <ActivityIndicator size = 'large'/>
                </View>
            )
        }
    }

    _searchTextInputChanged(text){
        this.searchedText = text
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
          this.setState({ isLoading: true })
          getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
              this.page = data.page
              this.totalPages = data.total_pages
              this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false
              })
          })
        }
    }

    _searchFilms(){

        this.page = 0
        this.totalPages = 0
        this.setState({
            films : [],
        }, () => {
            console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)

            this._loadFilms()
        })

        
    }

    render() {
        console.log(this.props)
        return (
          <View style={styles.main_container}>
            <TextInput style={styles.textinput} placeholder='Titre du film' onChangeText={(text)=> this._searchTextInputChanged(text)} onSubmitEditing = {()=> this._searchFilms()} />
            <Button title='Rechercher' onPress={() => this._searchFilms()}/>
            {/* Ici j'ai simplement repris l'exemple sur la documentation de la FlatList */}
            <FlatList
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <FilmItem key = {this.state.films.idFilm} film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                onEndReachedThreshold= {0.5}
                onEndReached = {() => {
                    if ( this.page < this.totalPages){
                        this._loadFilms()
                    }
                }}
            />
            {this._displayLoading()}
          </View>
        )
    }


}

const styles = StyleSheet.create ({

    main_container: {
        flex: 1,
        marginTop: 20
    },

    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },

    loading_container: {
        position : 'absolute',
        left: 0,
        right : 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search