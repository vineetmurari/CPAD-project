import * as React from 'react';
import { Button, View , StyleSheet, Text, SafeAreaView, ScrollView, StatusBar,TextInput} from 'react-native';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import { Storage } from 'expo-storage'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';



export default class  OrderMedicine extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
          data : null,
          searchtext: '',
          orders : null,
          status : "no"
        };

        this.searchHandle = this.searchHandle.bind(this);
        this.search = this.search.bind(this);
        this.getorders = this.getorders.bind(this)
        this.renderMyData = this.renderMyData.bind(this)
      }
      
      componentDidMount() {
        Promise.all([
            this.renderMyData(),
            this.getorders(),
          ]).then(([res1, res2]) => {
            this.setState({status: "fetched"})
            console.log(this.state.status)
          })
        
        
    }

    searchHandle(val){
       this.setState({searchtext: val})
    }

    refilHandler(){

    }
    
    search(){
       let dataarr= this.state.data.filter((value)=>{
            let arr = new Array()
            if(value.medicine===this.state.searchtext){
                console.log("MATCH..............")
                return arr.push(value)
            }
        })
        this.setState({data: dataarr})
    }


    getorders(){
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
              this.setState({ orders :data })
              console.log("This.............."+this.state.orders)         
             }).catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
              }); 
    }

    renderMyData(){
        console.log("RENDER- Medicines")
        console.log(this.props.data)
        
        const params = {
                     method: 'GET',
                     headers: {'Content-Type': 'application/json',
                    'Authorization': 'Basic '+this.props.data.token,
                    'Cache-Control': 'no-cache'
                     },
                  };


                fetch('http://192.168.1.8:8000/api/getmedicines', params)
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
            return (<Text>Loading...</Text>)
        }

        if(this.state.data.length===0){
        return(<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>No Medicines found! Serach again</Text></View>)
        }

        if(this.state.data.length!=0 && this.state.status === 'fetched'){
            return(
                <React.Fragment>

            <TextInput 
                    style={styles.input}
                    placeholder='Search Medicine name'
                    onChangeText ={(val)=>{this.searchHandle(val)}}/>

                    <Button
                        title="Submit"
                        onPress={()=> {this.search()} }
                         />   
             
             <Text style={{padding:10}}> Transactions :</Text>

                <View>

                    {
                        this.state.orders != null? (
                            <View>

        {this.state.orders.map(({__v, _id, email, items, orderid, payment}) => {

              return (

                <React.Fragment key={_id}>

                <Text style={{padding: 10}} key={_id}>

                    Transaction : {orderid} {"\n"}
                     payment : {payment? "Done": "pending"}    
                        {"\n"}
                    </Text>

                    <Button
                        title="Refil"
                        onPress={()=> {this.refilHandler()} }
                         />  

                    </React.Fragment>

              ) 


        })}
                        </View>
                        ) : <Text style={{padding:10}}> No Transactions are found!</Text>
                    }

                </View>

                <SafeAreaView style={styles.container}>
                 <ScrollView style={styles.scrollView}>


                {
                    this.state.data.map(
                        
                        (
                            {_id, medicine, mid, prescription, price}
                        ) => {

                      return(      
                        <Card key={_id}>
                        
                        <CardTitle
                         title={medicine}
                        />
                         <CardContent text={ 'Doctor Prescription Needed : '+(prescription?"Yes":"No")} />
                         <CardContent text={'$'+price} />
                         <CardAction 
                         separator={true} 
                         inColumn={false}>
                        <CardButton
                         onPress={() => {}}
                          title="Add to Cart"
                         color="#FEB557"
                            />
                        <CardButton
                         onPress={() => {}}
                        title="+"
                         color="#FEB557"
                         />
                         <CardButton
                         onPress={() => {}}
                        title="-"
                         color="#FEB557"
                         />
                    </CardAction>
                    </Card>         
                );
                
            }  ) } 
                    
                    
             </ScrollView>   
                </SafeAreaView> 
            </React.Fragment> );    
            
        }
    
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    input:{
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 20,
        width: 200
      },
    scrollView: {
      backgroundColor: 'pink',
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
  });