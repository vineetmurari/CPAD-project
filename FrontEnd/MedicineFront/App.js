import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

export default function App() {
  const [name, setName]= useState('initialState')
  const [password, setPassword]= useState('initialState')
  const [token, setToken] = useState('');
  const [user, setUser]= useState({})

  const Singup = async () => {
    try {
     const response = await fetch('http://localhost:8000/api/signin');
     const json = await response.json();
     setToken(json.token);
     setUser(json.user)
   } catch (error) {
     console.error(error);
   } 
 }
  
  return (
    <View style={styles.container}>
      <Text>Enter Email:</Text>

      <TextInput 
      style={styles.input}
      placeholder='e.g. someone@something.com '
      onChange={(val)=>setName(val)}/>
      <StatusBar style="auto" />

      <Text>Enter Password:</Text>

      <TextInput 
        style={styles.input}
        placeholder='password'
        secureTextEntry={true}
        onChange={(val)=>setPassword(val)}/>
       

       <View style={styles.separator} />

       <Button
       title="Submit"
       onPress={() => Singup()}
       />


    </View>
  );
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
