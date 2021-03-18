import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/pages/LoginPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={styles.defaultScreenOptions}>
        <Stack.Screen name="Login" component={LoginPage}
          options={{
            title: "Bem vindo!"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = {
  defaultScreenOptions: {
    title: 'Series',
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      fontSize: 30
    },
    headerStyle:
    {
      backgroundColor: '#6ca2f7',
      borderBottomWidth: 1,
      borderBottomColor: '#c5c5c5'
    }
  }
}