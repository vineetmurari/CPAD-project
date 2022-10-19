import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Cart from './components/Cart'
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import Prescription from './components/Prescription'


const Stack = createNativeStackNavigator();
export default function App() {

return(
  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ title: 'Welcome' }}
    />
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="Prescription" component={Prescription}/>
  </Stack.Navigator>
</NavigationContainer>
)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 20,
    width: 200
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
