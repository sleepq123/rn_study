import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import PopularPage from './PopularPage';
import FavoritePage from './FavoritePage';
import TreadingPage from './TreadingPage';
import MinePage from './MinePage';

const Tab = createBottomTabNavigator();

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _bottomTab = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="PopularPage"
          component={PopularPage}
          options={{
            tabBarLabel: '流行',
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="fire" color={color} size={14} />
            ),
          }}
        />
        <Tab.Screen
          name="FavoritePage"
          component={FavoritePage}
          options={{
            tabBarLabel: '收藏',
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="heart" color={color} size={14} />
            ),
          }}
        />
        <Tab.Screen
          name="TreadingPage"
          component={TreadingPage}
          options={{
            tabBarLabel: '趋势',
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="chart-line" color={color} size={14} />
            ),
          }}
        />
        <Tab.Screen
          name="MinePage"
          component={MinePage}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({focused, color, size}) => (
              <Icon name="crown" color={color} size={14} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };
  render() {
    const BottomTab = this._bottomTab;
    return <BottomTab />;
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

export default HomePage;
