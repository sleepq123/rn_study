import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Provider} from '@ant-design/react-native';

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const Stack = createStackNavigator();

const MainNaviagtor = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Detail"
          component={DetailPage}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

class AppNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {isWelcome: true};
  }
  _timer = null;
  componentDidMount() {
    this._timer = setTimeout(() => {
      this.setState({isWelcome: false});
    }, 2000);
  }

  componentWillUnmount() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

  render() {
    const {isWelcome} = this.state;
    return (
      <Provider>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" backBehavior="none">
            {isWelcome ? (
              <Stack.Screen name="Welcome" component={WelcomePage} />
            ) : (
              <Stack.Screen
                name="App"
                component={MainNaviagtor}
                options={{
                  cardStyleInterpolator:
                    CardStyleInterpolators.forHorizontalIOS,
                }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default AppNavigator;
