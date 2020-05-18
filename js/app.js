import React from 'react';
import {Alert, BackHandler, View} from 'react-native';

import AppNavigator from './navigator/AppNavigator';

let backHandler;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
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
    return <AppNavigator />;
  }
}

export default App;
