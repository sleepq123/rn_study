import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
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
          title="改变主题"
          onPress={() => {
            changeTheme('#5b85e3');
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTheme: color => dispatch({type: 'THEME_CHANGE', color}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(MinePage);
