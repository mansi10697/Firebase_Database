import React, { Component } from 'react';
import MainScreen from '../Screens/MainScreen';
import GetData from '../Screens/GetData';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

class Navigations extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="Main" component={MainScreen} />
                    <Stack.Screen name="Second" component={GetData} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default Navigations;