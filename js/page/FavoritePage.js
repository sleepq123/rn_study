import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>FavoritePage</Text>
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
