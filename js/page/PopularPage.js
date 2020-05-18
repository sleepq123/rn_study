import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _createTopTabs = () => (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {fontSize: 12},
      }}>
      <Tab.Screen
        name="Feed"
        component={PopularItem}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="Feed2"
        component={PopularItem}
        options={{tabBarLabel: 'Home2'}}
      />
      <Tab.Screen
        name="Feed3"
        component={PopularItem}
        options={{tabBarLabel: 'Home3'}}
      />
    </Tab.Navigator>
  );
  render() {
    const TopTabs = this._createTopTabs;
    return <TopTabs />;
  }
}

class PopularItem extends Component {
  state = {};
  render() {
    return (
      <View>
        <Text>PopularItem</Text>
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
export default PopularPage;
