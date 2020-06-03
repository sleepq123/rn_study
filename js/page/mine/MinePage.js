import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {actions} from '../../store/modules/theme';

import NavigationUtil from '../../navigator/NavigationUtil';
import NavItem from '../../components/NavItem';
import {Toast} from '@ant-design/react-native';

import AnalyticsUtil from '../../res/nativeModule/AnalyticsUtil';
let mineJson = require('../../res/json/mine.json');

class MinePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = key => {
    switch (key) {
      case 'theme':
        AnalyticsUtil.onPageStart('mine');
        console.log(AnalyticsUtil.onPageStart);

        this.props.changeTheme('#8a28db');
        Toast.success('主题切换成功');
        AnalyticsUtil.onPageEnd('mine');
        break;
      case 'github':
        NavigationUtil.goPage('Detail', {
          url: 'https://github.com/sleepq123',
          title: 'github',
        });
        break;
      default:
        break;
    }
  };

  // 渲染展开菜单
  _renderChildItem = (data, isChild) => {
    return data.map(({key, icon, title, isOpen, children}) => {
      let iconStyle = {name: icon, size: 32};
      return (
        <NavItem
          key={key}
          title={title}
          style={isChild && styles.itemChildStyle}
          isOpen={isOpen}
          iconStyle={iconStyle}
          children={children && this._renderChildItem(children, true)}
          onPress={() => {
            this.handleClick(key);
          }}
        />
      );
    });
  };

  // 渲染菜单列表
  _renderItem = () => {
    let list = [];
    mineJson.map((item, index) => {
      list.push(<Text key={index}>{}</Text>);
      let arrs = this._renderChildItem(item.data);
      list = list.concat(arrs);
    });
    return list;
  };

  render() {
    const _leftView = (
      <Image
        style={{width: 50, height: 50}}
        source={{
          uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
        }}
      />
    );
    const _titleView = (
      <View style={styles.headView}>
        <Text style={styles.headTitle}>new bron</Text>
        <Text>微信号: sleepq123</Text>
      </View>
    );

    return (
      <ScrollView style={styles.container}>
        <NavItem
          title="我的"
          style={styles.headContainer}
          leftView={_leftView}
          titleView={_titleView}
          onPress={() => {
            alert('onpress mine');
          }}
        />
        {this._renderItem()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E7ED',
    paddingBottom: 120,
  },
  headContainer: {
    paddingBottom: 36,
    paddingTop: 36,
    alignItems: 'flex-end',
  },
  headView: {
    justifyContent: 'space-between',
  },
  headTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemChildStyle: {
    backgroundColor: '#f5f5f5',
  },
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeTheme: color => dispatch(actions.changeTheme(color)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(MinePage);
