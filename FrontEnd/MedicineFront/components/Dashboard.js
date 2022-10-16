import * as React from 'react';
import { Button, View , Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardView from './DashboardView'
import Doctor  from './Doctor';
import Lab from './Lab';


const Drawer = createDrawerNavigator();

export default function Dashboard(){
    return(
        
        <Drawer.Navigator useLegacyImplementation initialRouteName="Dashboard View">
          <Drawer.Screen name="Dashboard View" component={DashboardView} />  
          <Drawer.Screen name="Book doctor appointment" component={Doctor} />
          <Drawer.Screen name="Book Lab appointment" component={Lab} />
          <Drawer.Screen name="Order Medicines" component={Lab} />
        </Drawer.Navigator>
      
    )
}