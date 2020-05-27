import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '@ant-design/react-native';

export default class UiViewUtils {
  static leftButtonView(bc) {
    return (
      <TouchableOpacity
        style={styles.leftBtn}
        onPress={() => {
          bc();
        }}>
        <Icon name="arrow-left" style={styles.leftIcon} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  leftBtn: {
    color: 'white',
  },
  leftIcon: {
    color: 'white',
  },
});
