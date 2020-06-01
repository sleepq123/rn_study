import React from 'react';
import {View, StyleSheet} from 'react-native';

export default class GlobalUi {
  getLine() {
    return <View style={styles.line} />;
  }
}

const styles = StyleSheet.create({
  line: {
    height: 0.5,
    backgroundColor: 'grey',
    elevation: 0.5,
  },
});
