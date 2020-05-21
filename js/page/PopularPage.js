import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import PopularTab from './PopularTab';

const Tab = createMaterialTopTabNavigator();

class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderTabs = () => {
    const {specialColumn} = this.props;
    return specialColumn.likedColumns.map(({colLabel, colKey}) => {
      return (
        <Tab.Screen
          name={colKey}
          key={colKey}
          component={PopularTab}
          options={{tabBarLabel: colLabel}}
        />
      );
    });
  };

  render() {
    const {theme} = this.props;
    return (
      <Tab.Navigator
        backBehavior="none"
        lazy={true}
        tabBarOptions={{
          labelStyle: {fontSize: 12},
          activeTintColor: theme.color,
          indicatorStyle: {
            backgroundColor: theme.color,
          },
        }}>
        {this._renderTabs()}
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    theme: state.theme,
    specialColumn: state.specialColumn,
  };
};
export default connect(mapStateToProps)(PopularPage);
