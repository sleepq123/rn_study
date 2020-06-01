import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
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

  static renderEleStyle(ele, style) {
    return <View style={style}>{ele}</View>;
  }
}

const styles = StyleSheet.create({
  leftBtn: {
    color: 'white',
    marginLeft: 10,
  },
  leftIcon: {
    color: 'white',
  },
});
