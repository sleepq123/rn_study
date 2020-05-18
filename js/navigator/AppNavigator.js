import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const Stack = createStackNavigator();

const InitNaviagtor = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Welcome" component={WelcomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainNaviagtor = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Detail" component={DetailPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// TODO createSwitchNavigator
export default MainNaviagtor;
