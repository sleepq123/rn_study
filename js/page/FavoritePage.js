import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import NavigationUtil from '../navigator/NavigationUtil';

class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>FavoritePage</Text>
        <Button
          title="去详情"
          onPress={() => {
            NavigationUtil.goPage('Detail');
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
export default FavoritePage;
