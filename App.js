import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import InboxScreen from './InboxScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import FindRideScreen from './FindRideScreen';
import CompleteProfileScreen from './CompleteProfileScreen';
import DriverDetailsScreen from './DriverDetailsScreen';
import MapScreen from './MapScreen';
import RideOverview from './RideOverview';
import PhoneVerification from './PhoneVerification';
import ProfileScreen from './ProfileScreen';
import EmergencyContactsScreen from './EmergencyContactsScreen';
const Stack = createStackNavigator();
import RideDetailsScreen from './RideOverview';
import ChatScreen from './ChatScreen';
import SignUpScreen from './SignUpScreen';
import EditAccountScreen from './EditAccountScreen';
import VehicleManagementScreen from './VehicleManagementScreen';
import AddVehicleScreen from './AddVehicleScreen';
import SearchResultScreen from './SearchResultScreen';
import { RideProvider } from "./RideContext";

const App = () => {
  return (
    <RideProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="FindRideScreen" component={FindRideScreen} />
           <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
           <Stack.Screen name="CompleteProfileScreen" component={CompleteProfileScreen} />
            <Stack.Screen name="DriverDetails" component={DriverDetailsScreen} />
             <Stack.Screen name="Map" component={MapScreen} />
             <Stack.Screen name="RideOverview" component={RideOverview} />
              <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
                <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
                  <Stack.Screen name="MapScreen" component={MapScreen} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                    <Stack.Screen name="EditAccountScreen" component={EditAccountScreen} />
        <Stack.Screen name="VehicleManagementScreen" component={VehicleManagementScreen} />
        <Stack.Screen name="AddVehicleScreen" component={AddVehicleScreen} />
        
     
      </Stack.Navigator>
    </NavigationContainer>
    </RideProvider>
  );
};

export default App;
