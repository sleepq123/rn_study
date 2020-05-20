import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Toast} from '@ant-design/react-native';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {appService} from '../api';

const Tab = createMaterialTopTabNavigator();

class PopularItem extends Component {
  state = {};
  componentDidMount() {
    appService.getTestData().then(res => {
      console.log(res);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>PopularItem</Text>
      </View>
    );
  }
}
const TABS = {
  Home: (
    <Tab.Screen
      name="Feed"
      key="Feed"
      component={PopularItem}
      options={{tabBarLabel: 'Home'}}
    />
  ),
  Home2: (
    <Tab.Screen
      name="Feed2"
      key="Feed2"
      component={PopularItem}
      options={{tabBarLabel: 'Home2'}}
    />
  ),
  Home3: (
    <Tab.Screen
      name="Feed3"
      key="Feed3"
      component={PopularItem}
      options={{tabBarLabel: 'Home3'}}
    />
  ),
};
class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _createTopTabs = () => {
    const {Home, Home2, Home3} = TABS;
    const tabs = [Home, Home2, Home3];
    const {theme} = this.props;
    return (
      <Tab.Navigator
        backBehavior="none"
        tabBarOptions={{
          labelStyle: {fontSize: 12},
          activeTintColor: theme.color,
          indicatorStyle: {
            backgroundColor: theme.color,
          },
        }}>
        {tabs}
      </Tab.Navigator>
    );
  };
  render() {
    const TopTabs = this._createTopTabs;
    return <TopTabs />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  red: {
    color: 'red',
  },
});

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    theme: state.theme,
  };
};
export default connect(mapStateToProps)(PopularPage);
