import * as React from 'react';
import { Button, View , Text} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import { Storage } from 'expo-storage'

export default class  DashboardView extends React.Component{
  
    constructor(props) {
        super(props);
  
        this.state = {
          data : null
        };
      }

      UNSAFE_componentWillMount() {
        this.renderMyData();
    }
            
      renderMyData= async()=>{
        console.log("RENDER")
        const data = JSON.parse(await Storage.getItem({ key: 'user' }))
        const token = await Storage.getItem({ key: 'token' })
        console.log("data "+data)
        console.log("token "+token)
              

        const params = {
                     method: 'GET',
                     headers: {'Content-Type': 'application/json',
                    'Authorization': 'Basic '+token,
                    'Cache-Control': 'no-cache'
                     },
                  };


                fetch('http://192.168.1.8:8000/api/getorder/'+data.email, params)
                        .then(response => response.json())
                         .then(data => {
                            console.log(data)
                            if(data.length!==0)
                             this.setState({ data : data })           
                            }).catch(function(error) {
                             console.log('There has been a problem with your fetch operation: ' + error.message);
                             });   
            
             
    }
        
    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {this.state.data? <Text>{this.state.data.length}</Text> : <Text> No Transactions to show</Text>}
          </View>
         
        );
    }
  }