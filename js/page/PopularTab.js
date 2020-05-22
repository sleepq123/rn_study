import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList} from 'react-native';
import {Toast} from '@ant-design/react-native';

import Type from '../reducer/type';
import DataSource from '../expand/DataSource';
import {columnService} from '../api';

import PopularItem from '../components/PopularItem';
const dSource = new DataSource();
let unsubscribe;
class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.state = {data: '', timestamp: '', loading: false};
  }

  componentDidMount() {
    const {navigation, route, changeCurrentTab} = this.props;
    this._fetchData();

    navigation.addListener('tabPress', e => {
      changeCurrentTab(route.name);
    });
  }

  componentWillUnmount() {
    if (typeof unsubscribe === 'function') {
      unsubscribe();
    }
  }

  _fetchData = () => {
    this.setState({
      loading: true,
    });
    dSource
      .fetchData('fetch_Test', columnService.getTipjar('57764200'))
      .then(res => {
        Toast.success('已刷新');
        this.setState({
          data: res.data.data,
          timestamp: res.timestamp,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const {loading} = this.state;
    const {tipjarors} = this.state.data;
    return (
      <FlatList
        data={tipjarors}
        renderItem={({item}) => (
          <PopularItem timestamp={this.state.timestamp} options={item} />
        )}
        refreshing={loading}
        onRefresh={() => {
          this._fetchData();
        }}
      />
    );
  }
}

const mapDispatchToProps = (dispatch, owbnProps) => {
  return {
    changeCurrentTab: current => dispatch({type: Type.COLUMNE_CHANGE, current}),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(PopularTab);
