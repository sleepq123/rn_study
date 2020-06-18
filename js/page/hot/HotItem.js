import React, {PureComponent} from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import {Icon, Modal} from '@ant-design/react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {actions} from '../../store/modules/favorite';

import {Toast} from '../../utils/utils';
import NavigationUtil from '../../navigator/NavigationUtil';

class HotItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 判断item是否已收藏
  isCollect = () => {
    return !!this.props.items.find(({id}) => this.props.options.id === id);
  };

  handleCollect = options => {
    const {id} = options;
    let operations = [];
    // 判断是否已收藏
    if (this.isCollect) {
      operations = [
        {
          text: '收藏',
          onPress: () => {
            this.props.addFavoriteItem(options);
            Toast.success('收藏成功');
          },
        },
      ];
    } else {
      operations = [
        {
          text: '取消收藏',
          onPress: () => {
            this.props.addFavoriteItem(id);
            Toast.success('取消收藏');
          },
        },
      ];
    }
    Modal.operation(operations);
  };

  _alert = msg => {
    alert(msg);
  };

  gotoDetailPage = ({id, title}) => {
    NavigationUtil.goPage('Detail', {
      url: `https://www.zhihu.com/question/${id}`,
      title,
    });
  };

  render() {
    const {target, children, detail_text} = this.props.options;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          this.gotoDetailPage(target);
        }}
        onLongPress={() => {
          this.handleCollect(this.props.options);
        }}>
        <View style={styles.itemTitle}>
          <Text style={styles.titleFont} numberOfLines={2}>
            {target.title}
          </Text>
          <Text numberOfLines={2}>{target.excerpt}</Text>
          <View style={styles.metrics}>
            <Icon name="fire" />
            <Text
              onPress={() => {
                this._alert('分享');
              }}
              style={{marginRight: 10}}>
              {detail_text}
            </Text>
            <Icon name="share-alt" />
            <Text
              onPress={() => {
                this._alert('分享');
              }}>
              分享
            </Text>
          </View>
        </View>
        {!!children[0].thumbnail && (
          <View>
            <Image
              style={styles.exhabitionImg}
              resizeMode="cover"
              source={{uri: children[0].thumbnail}}
            />
          </View>
        )}
        {/* {this.isCollect() && <View>已收藏</View>}S */}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
  },
  itemTitle: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
  },
  titleFont: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  metrics: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },
  exhabitionImg: {
    marginLeft: 5,
    width: 170,
    height: 105,
  },
});

HotItem.propTypes = {
  options: PropTypes.object,
};

HotItem.defaultProps = {
  options: {},
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    items: state.favorite.items,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFavoriteItem: item => dispatch(actions.addFavoriteItem(item)),
    delFavoriteItem: id => dispatch(actions.delFavoriteItem(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HotItem);
