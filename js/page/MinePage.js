import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Toast, Icon} from '@ant-design/react-native';
import {connect} from 'react-redux';
import {actions} from '../store/modules/theme';
class MinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {changeTheme} = this.props;
    return (
      <View style={styles.container}>
        <Text>MinePage</Text>
        <Button
          onPress={() => {
            changeTheme('#5b85e3');
          }}>
          改变主题
        </Button>
        <Button
          type="primary"
          onPress={() => {
            Toast.info('点击了antButton');
          }}>
          ant button
        </Button>
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

const mapDispatchToProps = {
  changeTheme: actions.changeTheme,
};

export default connect(
  null,
  mapDispatchToProps,
)(MinePage);
