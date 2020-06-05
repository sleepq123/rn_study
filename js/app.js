import React from 'react';
import {Alert, BackHandler} from 'react-native';
import {Provider} from 'react-redux';

import store from './store';
import AppNavigator from './navigator/AppNavigator';

import SplashScreen from 'react-native-splash-screen';

let backHandler;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    SplashScreen.hide();

    const backAction = () => {
      Alert.alert('提示', '你确定要退出app吗?', [
        {
          text: '不了，我再想想',
          onPress: () => null,
          style: 'cancel',
        },
        {text: '退出', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
  }

  componentWillUnmount() {
    backHandler.remove();
  }
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
