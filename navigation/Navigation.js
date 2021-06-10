import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
 
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../components/Search';
import FilmItem from '../components/FilmItem';
import FilmDetail from '../components/filmDetail';

const Stack = createStackNavigator()
class Navigation extends React.Component{

    
    render() {
        
        return(
            
            <NavigationContainer>
 
                <Stack.Navigator>
 
                    <Stack.Screen name="Rechercher" component={Search} />
                    <Stack.Screen name="FilmDetail" component= {FilmDetail} />
 
                </Stack.Navigator>
 
            </NavigationContainer>
        )
    }
}

export default Navigation