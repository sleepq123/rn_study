import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class FavoritePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>收藏</Text>
      </View>
    );
  }
}

export default FavoritePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
