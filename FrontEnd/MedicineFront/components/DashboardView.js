import * as React from 'react';
import { Button, View , Text} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Storage } from 'expo-storage'

export default class  DashboardView extends React.Component{
  
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
        console.log("RENDER - Dashboard")
        console.log(this.props.data)
        
        const params = {
                     method: 'GET',
                     headers: {'Content-Type': 'application/json',
                    'Authorization': 'Basic '+this.props.data.token,
                    'Cache-Control': 'no-cache'
                     },
                  };


                fetch('http://192.168.1.8:8000/api/getorder/'+this.props.data.email, params)
                        .then(response => response.json())
                         .then(data => {
                            console.log(data)
                             this.setState({ data :data })           
                            }).catch(function(error) {
                             console.log('There has been a problem with your fetch operation: ' + error.message);
                             }); 
             
    }
        
    render(){
      if (this.state.data===null) {
        return (<Text style={{fontSize: 50}}>Loading...</Text>)
    }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{fontWeight:"bold", fontSize: 20}}>Transactions: {"\n"} </Text>
            {this.state.data.length!=0? <View>{
              
              
              this.state.data.map(({__v, _id, email, items, orderid, payment}) => {

                return (

                  <View key={_id}>

                    <Text  style={{padding: 10, fontWeight:"bold", fontSize: 14}}key={_id}>

                      Transaction : {orderid} {"\n"} {"\n"}
                      Items       : {items[0].item_id} {"\n"} {"\n"}
                      payment : {payment? "Done": "pending"}  {"\n"} {"\n"}  
                      {"\n"}
                    </Text>

                  </View>
                
                  );



              })}</View> : <Text> No Transactions to show</Text>}
          </View>
         
        );
    }
  }