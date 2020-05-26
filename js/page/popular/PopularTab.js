import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, StyleSheet} from 'react-native';
import {Toast} from '@ant-design/react-native';

import DataSource from '../../expand/DataSource';
import {actions} from '../../store/modules/column';
import {columnService} from '../../api';
import {formatDate} from '../../utils/tools';

import PopularItem from './PopularItem';
const dSource = new DataSource();
let unsubscribe;
class PopularTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: '',
      data: '',
      limit: 6,
      offset: 0,
      loading: false,
      endLoading: false,
    };
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
    const {limit, offset} = this.state;
    const {route} = this.props;
    let params = {
      limit,
      offset,
      seed: route.name,
    };
    this.setState({
      loading: true,
    });

    dSource
      .fetchData(
        `getColumnRecommendations_${route.name}`,
        columnService.getColumnRecommendations(params),
      )
      .then(res => {
        Toast.success('已刷新,上次获取数据时间' + formatDate(res.timestamp));
        this.setState({
          data: res.data.data,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  _fetchLoadMore = async () => {
    console.log('more');

    let {limit, offset, data} = this.state;
    let {route} = this.props;
    let params = {
      limit,
      offsett: offset++,
      seed: route.name,
    };

    try {
      this.setState({
        endLoading: true,
      });
      let res = await columnService.getColumnRecommendations(params);
      this.setState({
        offset,
        data: data.concat(res.data),
        endLoading: false,
      });
    } catch (error) {
      Toast.info(error.toString());
      this.setState({
        endLoading: false,
      });
    }
  };

  render() {
    const {loading, data} = this.state;
    return (
      <FlatList
        style={styles.popularTab}
        data={data}
        renderItem={({item}) => <PopularItem key={item.id} options={item} />}
        refreshing={loading}
        onRefresh={this._fetchData}
        onEndReached={this._fetchLoadMore}
        onEndReachedThreshold={0.2}
      />
    );
  }
}

const styles = StyleSheet.create({
  popularTab: {
    backgroundColor: '#f9f9f9',
  },
});

const mapDispatchToProps = (dispatch, owbnProps) => {
  return {
    changeCurrentTab: current => dispatch(actions.changeCurrentTab(current)),
  };
};
export default connect(
  null,
  mapDispatchToProps,
)(PopularTab);
