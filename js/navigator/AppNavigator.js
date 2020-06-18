import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Provider} from '@ant-design/react-native';

import routes from '../route';
import WelcomePage from '../page/WelcomePage';

const Stack = createStackNavigator();

const MainNaviagtor = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {routes.map(item => {
        return <Stack.Screen {...item} />;
      })}
    </Stack.Navigator>
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
    }, 200);
  }

  componentWillUnmount() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

  skip = () => {
    this.setState({isWelcome: false});
    clearTimeout(this._timer);
  };

  render() {
    const {isWelcome} = this.state;
    return (
      <Provider>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" backBehavior="none">
            {isWelcome ? (
              <Stack.Screen
                name="Welcome"
                component={WelcomePage}
                skip={this.skip}
              />
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
