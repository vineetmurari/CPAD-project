import * as React from 'react';
import { Button, View , Text} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Storage } from 'expo-storage'

export default class  OrderMedicine extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
          data : null,
        };
      }
      
      componentDidMount() {
        this.renderMyData();
    }

    renderMyData(){
    }

    render(){
    return(
        <View>
            <Text>
                Test order
            </Text>
        </View>
    )
    
    }

}