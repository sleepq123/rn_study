import React, {Component} from 'react';
import {View, Text, Alert} from 'react-native';

import NavigationBar from '../../components/NavigationBar';
import {TouchableOpacity} from 'react-native-gesture-handler';

class TreadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <NavigationBar
          title="趋势"
          leftButton={
            <TouchableOpacity
              onPress={() => {
                Alert.alert('返回');
              }}>
              <Text>返回</Text>
            </TouchableOpacity>
          }
        />
        <Text>TreadingPage</Text>
      </View>
    );
  }
}

export default TreadingPage;
