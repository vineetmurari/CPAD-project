import React, {useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Storage } from 'expo-storage'

export default function Login({navigation}) {
  const [name, setName]= useState('initialState')
  const [password, setPassword]= useState('initialState')
  const [token, setToken] = useState('');
  const [user, setUser]= useState({})
  const [authissue, setAuthissue] =useState(false)
  const [data, setData] = useState({})

  const Singup = async () => {
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'email': name,
        'password': password
    }),
    };
    fetch('http://192.168.1.8:8000/api/signin', params)
      .then(response => response.json())
      .then(data => {
         console.log(data)
         setData(data)
         if(data.token){
         setToken(data.token)
         setUser(data.user)
        //  storeToken(token).then(getkeys())
        //  storeData(user).then(getkeys())
         navigation.navigate('Dashboard', {
          token : data.token,
          email: data.user.email
        })
         }
         else{
          setAuthissue(true)
         }

      }).catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
        });
 }
  
  return (
   
   <View style={styles.container}>

      <Text style={{fontWeight: 'bold', fontSize: 20, padding: 20}}>Online Medicine APP</Text>

      <Text style={{fontWeight: 'bold', fontSize: 20, padding: 20}}>Login with Email and Password</Text>

      <Text style={{fontWeight: 'bold', fontSize: 20, padding: 20}}>Enter Email:</Text>

      <TextInput 
      style={styles.input}
      placeholder='e.g. someone@something.com '
      onChangeText ={(val)=>setName(val.trim())}/>
      <StatusBar style="auto" />

      <Text style={{fontWeight: 'bold', fontSize: 20}}>Enter Password:</Text>
      
      <TextInput 
        style={styles.input}
        placeholder='password'
        secureTextEntry={true}
        onChangeText ={(val)=>setPassword(val.trim())}/>
       

       <View style={styles.separator} />

        {
          authissue? <Text style={{fontWeight: 'bold', fontSize: 20, color: 'red', padding: 10}}>{data.error}</Text>: null
        }

       <Button
       title="Submit"
       onPress={ async () => { 
        await Singup()
        }}
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
