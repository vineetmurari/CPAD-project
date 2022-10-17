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
          status : "no",
          cart : 0
        };

        this.searchHandle = this.searchHandle.bind(this);
        this.search = this.search.bind(this);
        this.getorders = this.getorders.bind(this)
        this.renderMyData = this.renderMyData.bind(this)
        this.addtocart = this.addtocart.bind(this)
        this.getcartitems = this.getcartitems.bind(this)
      }
      
      componentDidMount() {
        Promise.all([
            this.renderMyData(),
            this.getorders(),
            this.getcartitems()
          ]).then(([res1, res2, res3]) => {
            this.setState({status: "fetched"})
            console.log(this.state.status)
          })
        
        
    }

    searchHandle(val){
       this.setState({searchtext: val})
    }

    refilHandler(){

    }
    
    addtocart=(email, item_name, qty, price, orderd)=>{
        const params = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Authorization': 'Basic '+this.props.data.token,
            'Cache-Control': 'no-cache'
             },
            body: JSON.stringify({
              'email': email,
              'item_name': item_name,
              'qty': qty,
              'price': price,
              'orderd': orderd
          }),
          };
          fetch('http://192.168.1.8:8000/api/addtocart', params)
            .then(response => response.json())
            .then(data => {
              this.setState({ cart: this.state.cart + 1 })
            }).catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
              });
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

    getcartitems(){
        const params = {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
           'Authorization': 'Basic '+this.props.data.token,
           'Cache-Control': 'no-cache'
            },
         };

         fetch('http://192.168.1.8:8000/api/cartitems/'+this.props.data.email, params)
         .then(response => response.json())
          .then(data => { 
              this.setState({ cart :data.length })
              console.log("HRE>>>>> "+this.state.cart)         
             }).catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
              }); 
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
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                 <Button style ={styles.cart}
                        title={"Cart  -  "+(this.state.cart)}
                        onPress={()=> {this.props.navigation.navigate('Cart') }}
                         /> 
                </View>
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
                         inColumn={true}>
                        <CardButton
                         onPress={() => { this.addtocart(this.props.data.email,medicine,"1", price, false )}}
                          title="Add to Cart"
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
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    text: {
      fontSize: 42,
    },
    cart:{
        height: 20
    }
  });