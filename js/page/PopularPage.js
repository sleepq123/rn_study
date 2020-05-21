import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import PopularTab from './PopularTab';

const Tab = createMaterialTopTabNavigator();

const TABS = {
  Home: (
    <Tab.Screen
      name="Feed"
      key="Feed"
      component={PopularTab}
      options={{tabBarLabel: 'Home'}}
    />
  ),
  Home2: (
    <Tab.Screen
      name="Feed2"
      key="Feed2"
      component={PopularTab}
      options={{tabBarLabel: 'Home2'}}
    />
  ),
  Home3: (
    <Tab.Screen
      name="Feed3"
      key="Feed3"
      component={PopularTab}
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

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    theme: state.theme,
  };
};
export default connect(mapStateToProps)(PopularPage);
