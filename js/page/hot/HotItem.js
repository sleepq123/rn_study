import React, {PureComponent} from 'react';
import {TouchableOpacity, Text, View, Image, StyleSheet} from 'react-native';
import {Icon, Toast} from '@ant-design/react-native';
import PropTypes from 'prop-types';

import NavigationUtil from '../../navigator/NavigationUtil';

class HotItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleCollect = () => {
    Toast.success('收藏成功');
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

export default HotItem;
