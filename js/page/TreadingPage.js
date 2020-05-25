import React, {Component} from 'react';
import {View, Text} from 'react-native';

import NavigationBar from '../components/NavigationBar';

class TreadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <NavigationBar title="趋势" leftButton={<Text>返回</Text>} />
        <Text>TreadingPage</Text>
      </View>
    );
  }
}

export default TreadingPage;
