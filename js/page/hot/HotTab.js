import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Toast, ActivityIndicator} from '@ant-design/react-native';

import DataSource from '../../expand/DataSource';
import {actions} from '../../store/modules/hot';
import {appService} from '../../api';
import {formatDate} from '../../utils/tools';

import HotItem from './HotItem';
const dSource = new DataSource();
let unsubscribe;
class HotTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seed: '',
      data: [],
      limit: 6,
      offset: 0,
      loading: false,
      endLoading: false,
      isNoMore: false,
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
    const {name} = this.props.route;

    this.setState({
      loading: true,
      limit: 6,
      offset: 0,
    });

    dSource
      .fetchData(`getHostlist_${name}`, appService.getHostlist(name, {limit}))
      .then(res => {
        console.log('已刷新,上次获取数据时间' + formatDate(res.timestamp));
        this.setState({
          data: res.data.data.splice(offset, limit), // 接口不支持分页，伪分页处理
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
    if (!this.state.canLoadmore || this.state.isNoMore) {
      return;
    }
    let {limit, offset, data} = this.state;
    const {name} = this.props.route;
    let params = {
      limit,
      offsett: offset++,
    };

    try {
      this.setState({
        endLoading: true,
        canLoadmore: false,
      });
      let res = await appService.getHostlist(name, params);
      if (JSON.stringify(res.data.splice(offset * limit, limit)) === '[]') {
        this.setState({
          isNoMore: true,
        });
        Toast.info('没有更多数据了!');
        return;
      }
      this.setState({
        offset,
        data: data.concat(res.data.splice(offset * limit, limit)), // 接口不支持分页，伪分页处理
        endLoading: false,
      });
    } catch (error) {
      Toast.info(error.toString());
      this.setState({
        endLoading: false,
      });
    }
  };

  _renderFooter = () => {
    const {endLoading, isNoMore} = this.state;
    return (
      (endLoading || isNoMore) && (
        <View style={styles.footerStyle}>
          {endLoading && <ActivityIndicator size="small" color="#888888" />}
          <Text>{isNoMore ? '我也是有底线的！' : '加载中...'}</Text>
        </View>
      )
    );
  };

  render() {
    const {loading, data} = this.state;
    return (
      <FlatList
        style={styles.HotTab}
        data={data}
        renderItem={({item}) => <HotItem key={item.id} options={item} />}
        keyExtractor={(item, index) => index}
        extraData={this.state}
        initialNumToRender={4}
        refreshing={loading}
        onRefresh={this._fetchData}
        onEndReached={this._fetchLoadMore}
        ListFooterComponent={this._renderFooter}
        onEndReachedThreshold={0.2}
        onMomentumScrollBegin={() => {
          this.setState({
            canLoadmore: true,
          });
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  HotTab: {
    backgroundColor: '#f9f9f9',
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    padding: 10,
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
)(HotTab);
