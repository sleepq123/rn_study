import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NavigationBar from '../../components/NavigationBar';
import HotTab from './HotTab';
import {View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

class HotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderTabs = () => {
    const {hotTab} = this.props.hot;
    const Tabs = Object.keys(hotTab).map(key => hotTab[key]);
    return Tabs.map(({label, value}) => {
      return (
        <Tab.Screen
          name={value}
          key={value}
          component={HotTab}
          options={{tabBarLabel: label}}
        />
      );
    });
  };

  render() {
    const {theme} = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          hidden={true}
          statusBar={{backgroundColor: 'white', barStyle: 'dark-content'}}
        />
        <Tab.Navigator
          backBehavior="none"
          lazy={true}
          tabBarOptions={{
            labelStyle: {fontSize: 16, fontWeight: 'bold'},
            activeTintColor: theme.color,
            indicatorStyle: {
              backgroundColor: theme.color,
            },
          }}>
          {this._renderTabs()}
        </Tab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    theme: state.theme,
    hot: state.hot,
  };
};
export default connect(mapStateToProps)(HotPage);
