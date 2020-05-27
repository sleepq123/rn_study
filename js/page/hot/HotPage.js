import React, {Component} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import NavigationBar from '../../components/NavigationBar';
import HotTab from './HotTab';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialTopTabNavigator();

class HotPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
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

  menuSelect = () => {
    alert('menuSelect');
  };

  render() {
    const {theme} = this.props;
    return (
      <View style={styles.container}>
        <NavigationBar
          hidden={true}
          statusBar={{backgroundColor: 'white', barStyle: 'dark-content'}}
        />
        <View style={styles.navMenu}>
          <TouchableWithoutFeedback onPress={this.menuSelect}>
            <Icon
              style={[styles.navDownIcon, styles.rotateStyle]}
              name="caret-down"
              color={theme.color}
            />
          </TouchableWithoutFeedback>
        </View>

        <Tab.Navigator
          backBehavior="none"
          lazy={true}
          tabBarOptions={{
            scrollEnabled: true,
            labelStyle: {fontSize: 16, fontWeight: 'bold'},
            tabStyle: {width: 60, height: 50},
            style: {marginRight: 50},
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
  navMenu: {
    zIndex: 999,
    position: 'absolute',
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 5,
  },
  navDownIcon: {
    fontSize: 22,
  },
});

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    theme: state.theme,
    hot: state.hot,
  };
};
export default connect(mapStateToProps)(HotPage);
