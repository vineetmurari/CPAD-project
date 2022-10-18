import * as React from 'react';
import { Button, View , Text} from 'react-native';


export default class Cart extends React.Component{
    constructor(props) {
        super(props);
  
        this.state = {
         data : [],
         status: "no",
         status1: "no"
        };

       this.getcartitems = this.getcartitems.bind(this) 
       this.updateOrdered = this.updateOrdered.bind(this)
       this.orderHandle = this.orderHandle.bind(this)
       this.placeOrder = this.placeOrder.bind(this)
      }



      componentDidMount() {
        Promise.all([
            this.getcartitems(),
          ]).then(([res1]) => {
            this.setState({status: "fetched"})
            console.log(this.state.status)
          })
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

      getcartitems(){
        const params = {
            method: 'GET',
            headers: {'Content-Type': 'application/json',
           'Authorization': 'Basic '+this.props.route.params.token,
           'Cache-Control': 'no-cache'
            },
         };

         fetch('http://192.168.1.8:8000/api/cartitems/'+this.props.route.params.email, params)
         .then(response => response.json())
          .then(data => { 
                let arr =[]
              for(let i =0; i<data.length; i++ ){
                if(!data[i].orderd){
                  arr.push(data[i])
                }
              }
              this.setState({data: arr})
              console.log("HRE>>>>> "+this.state.data)         
             }).catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
              }); 
    }

    orderHandle(orderid, email, items, _id){
        Promise.all([
            this.placeOrder(orderid, email, items),
            this.updateOrdered(_id),
            this.getcartitems(),
          ]).then(([res1, res2, res3]) => {
            this.setState({status1: "fetched"})
            console.log(this.state.status1)
          })
    }

    updateOrdered(_id){
        const params = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
           'Authorization': 'Basic '+this.props.route.params.token,
           'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
               'orderd': true
            })
         };

         fetch('http://192.168.1.8:8000/api/cart/'+_id, params)
         .then(response => response.json())
          .then(data => { 
                    console.log("UPDATE "+data)    
             }).catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
              }); 

    }

    placeOrder(orderid, email, items){
        const params = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
           'Authorization': 'Basic '+this.props.route.params.token,
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
                   console.log("place ORDER "+data)     
             }).catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
              }); 

    }



      render(){
        if(this.state.data.length===0){
            return(<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Your Cart is empty</Text>
            </View>)
        }

        if(this.state.data.length!==0){
       return (

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Your Cart times:</Text>

            {
                this.state.data.map(({_id, email, item_name, qty, price, orderd, __v})=>{

            return(
                    <View key={_id}>

                    <Text key={email}>

                      Item : {item_name} {"\n"}
                      qty : {qty} {"\n"}
                      price: {price} {"\n"}
                    </Text>

                    <Button key={_id+email}
                        title="Order"
                        onPress={()=> {this.orderHandle(this.makeid(10),this.props.route.params.email, [{"item_id": item_name, "qty": qty, "price": price}], _id)}}
                         />

                  </View>

            );


                }
           )




            }

        </View>
       )
    }

        }
}