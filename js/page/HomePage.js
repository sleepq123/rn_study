import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationUtil from '../navigator/NavigationUtil';

import PopularPage from './PopularPage';
import FavoritePage from './FavoritePage';
import TreadingPage from './TreadingPage';
import MinePage from './MinePage';

const Tab = createBottomTabNavigator();
const TABS = {
  PopularPage: (
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
  ),
  FavoritePage: (
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
  ),
  TreadingPage: (
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
  ),
  MinePage: (
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
  ),
};
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _bottomTab = () => {
    const {PopularPage, FavoritePage, TreadingPage, MinePage} = TABS;
    const tabs = [PopularPage, FavoritePage, TreadingPage, MinePage];
    const {theme} = this.props;
    return (
      <Tab.Navigator
        backBehavior="none"
        tabBarOptions={{
          activeTintColor: theme.color,
        }}>
        {tabs}
      </Tab.Navigator>
    );
  };
  render() {
    const {navigation} = this.props;
    NavigationUtil.navigation = navigation;
    const BottomTab = this._bottomTab;
    return <BottomTab />;
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    theme: state.theme,
  };
};
export default connect(mapStateToProps)(HomePage);
