import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import InboxScreen from './InboxScreen';
import ResetPasswordScreen from './ResetPasswordScreen';
import FindRideScreen from './FindRideScreen';
import PersonalDetailsScreen from './PersonalDetailsScreen';
import DriverDetailsScreen from './DriverDetailsScreen';
import MapScreen from './MapScreen';
import RideOverview from './RideOverview';
import PhoneVerification from './PhoneVerification';
import ProfileScreen from './ProfileScreen';
import EmergencyContactsScreen from './EmergencyContactsScreen';
const Stack = createStackNavigator();
import RideDetailsScreen from './RideOverview';
import ChatScreen from './ChatScreen';
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Inbox" component={InboxScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="FindRide" component={FindRideScreen} />
           <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
            <Stack.Screen name="DriverDetails" component={DriverDetailsScreen} />
             <Stack.Screen name="Map" component={MapScreen} />
             <Stack.Screen name="RideOverview" component={RideOverview} />
              <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
                <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
                  <Stack.Screen name="MapScreen" component={MapScreen} />
                    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EmergencyContactsScreen" component={EmergencyContactsScreen} />
        
     
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
