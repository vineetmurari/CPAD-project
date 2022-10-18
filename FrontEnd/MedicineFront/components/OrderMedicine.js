import * as React from 'react';
import { Button, View , StyleSheet, Text, SafeAreaView, ScrollView, StatusBar,TextInput,TouchableOpacity, Alert} from 'react-native';
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
          cart : 0,
          cartData : null 
        };

        this.searchHandle = this.searchHandle.bind(this);
        this.search = this.search.bind(this);
        this.getorders = this.getorders.bind(this)
        this.renderMyData = this.renderMyData.bind(this)
        this.addtocart = this.addtocart.bind(this)
        this.getcartitems = this.getcartitems.bind(this)
        this.refilHandler =this.refilHandler.bind(this)
        this.placeOrder =this.placeOrder.bind(this)
        this.makeid = this.makeid.bind(this)
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


    placeOrder(orderid, email, items){
      const params = {
          method: 'POST',
          headers: {'Content-Type': 'application/json',
         'Authorization': 'Basic '+this.props.data.token,
         'Cache-Control': 'no-cache'
          },
          body: JSON.stringify({
              'orderid': orderid,
              'email': email,
              'items': items,
              'payment': true
          })
       };

       fetch('http://192.168.1.8:8000/api/createorder', params)
       .then(response => response.json())
        .then(data => { 
                 if(data.length!=0){
                  Alert.alert("Order refil sucess!")
                 }    
           }).catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            }); 

  }

  makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


    refilHandler(orderid, email, items){
          this.placeOrder(orderid, email, items)
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
                let arr =[]
              for(let i =0; i<data.length; i++ ){
                if(!data[i].orderd){
                  arr.push(data[i])
                }
              }
              this.setState({ cart :arr.length })
              this.setState({cartData: arr})
              console.log("HRE>>>>> "+this.state.cartData)         
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
                        onPress={()=> {this.props.navigation.navigate('Cart', {email: this.props.data.email, token: this.props.data.token}) }}
                         /> 
                </View>
                <View style= {styles.fixToText}>
                  <TextInput 
                    style={styles.input}
                    placeholder='Search Medicine name'
                    onChangeText ={(val)=>{this.searchHandle(val)}}/> 

                        <TouchableOpacity
                        style ={styles.refil}
                        onPress={()=> {this.search()} }
                         >
                         <Text>Submit</Text> 
                          </TouchableOpacity> 
             </View>
             <Text style={{padding:10}}> Transactions :</Text>

                <View>

                    {
                        this.state.orders != null? (
                            <View>

        {this.state.orders.map(({__v, _id, email, items, orderid, payment}) => {

              return (

                <View key={_id} style={styles.fixToText}>

                <Text  key={_id}>
                   {'    '} Transaction : {orderid} - {items[0].item_id}  {"\n"}
                   {'    '} payment : {payment? "Done": "pending"}    
                        {"\n"}
                    </Text>

                    <TouchableOpacity
                        style ={styles.refil}
                        onPress={()=> {this.refilHandler(this.makeid(10),email,items )} }
                         >
                         <Text>Refill</Text> 
                          </TouchableOpacity>  

                    </View>

              ) 


        })}
                        </View>
                        ) : <Text style={{padding:10}}> No Transactions are found!</Text>
                    }

                </View>

                <SafeAreaView style={styles.container}>
                 <ScrollView horizontal={true} style={styles.scrollView}>


                {
                    this.state.data.map(
                        
                        (
                            {_id, medicine, mid, prescription, price, stock}
                        ) => {

                      return(      
                        <Card key={_id} >
                        
                        <CardTitle
                         title={medicine}
                        />
                         <CardContent text={ 'Doctor Prescription Needed : '+(prescription?"Yes":"No")} />
                         <CardContent text={'$'+price} />
                         <CardContent text={'In stock '+(stock?"Yes":"No")} />
                         <CardAction 
                         separator={false} 
                         inColumn={false}>
                        {
                          stock?(
                            <CardButton
                         onPress={() => { this.addtocart(this.props.data.email,medicine,"1", price, false )}}
                          title="Add to Cart"
                         color="#FEB557"
                            />
                          ): (<TouchableOpacity style={styles.refil} disabled={true}>
                            <Text> 
                                  Add to Cart - No stock
                           </Text>
                        </TouchableOpacity>)
                        }  
                        
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
        padding: 4,
        width: 200,
        marginLeft: 10,
        marginBottom:5
      },
    scrollView: {
      backgroundColor: '#DDDDDD',
      marginHorizontal: 20
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    text: {
      fontSize: 42,
    },
    cart:{
        height: 1
    },
    refil:{
      margin:10,
      padding: 10,
      backgroundColor:  '#DDDDDD'
    }
  });