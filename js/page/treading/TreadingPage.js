import React, {Component} from 'react';
import {View, Text, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {Popover} from '@ant-design/react-native';

import NavigationBar from '../../components/NavigationBar';

const timeSpace = [
  {label: '今天', value: 'today'},
  {label: '近一周', value: 'week'},
  {label: '近一月', value: 'month'},
];
class TreadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let leftBtn = (
      <TouchableOpacity
        onPress={() => {
          Alert.alert('返回');
        }}>
        <Text style={styles.titleFont}>返回</Text>
      </TouchableOpacity>
    );
    let titleView = (
      <View style={styles.titleStyle}>
        <Text style={styles.titleFont}>趋势 </Text>
        <Popover
          overlay={timeSpace.map(({label, value}) => {
            return (
              <Popover.Item value={value}>
                <Text>{label}</Text>
              </Popover.Item>
            );
          })}
          placement="bottom"
          onSelect={val => {
            console.log('select' + val);
          }}>
          <Text style={styles.titleFont}>今天</Text>
        </Popover>
      </View>
    );

    return (
      <View>
        <NavigationBar
          titleView={titleView}
          statusBar={{backgroundColor: '#2196F3'}}
          leftButton={leftBtn}
        />
        <Text>TreadingPage</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    flexDirection: 'row',
  },
  titleFont: {
    color: 'white',
    fontSize: 18,
  },
});

export default TreadingPage;
