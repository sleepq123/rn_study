import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {Button} from '@ant-design/react-native';

import DataSource from '../expand/DataSource';
import {appService} from '../api';

const dSource = new DataSource();
class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.state = {data: ''};
  }
  _fetchData = () => {
    dSource
      .fetchData('fetch_Test', appService.getTestData('zhihuadmin'))
      .then(res => {
        this.setState({data: res.data});
      });
  };

  render() {
    const {articles_count, title} = this.state.data;
    return (
      <View style={styles.container}>
        <Text>PopularItem</Text>
        <Button onPress={this._fetchData}>获取数据</Button>
        <ScrollView>
          <Text>{title}</Text>
          <Text>{articles_count}</Text>
        </ScrollView>
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
  red: {
    color: 'red',
  },
});

export default PopularTab;
