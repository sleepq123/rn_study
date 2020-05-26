import React, {Component} from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {Flex, Icon, Toast} from '@ant-design/react-native';
import PropTypes from 'prop-types';

import {formatDate} from '../../utils/tools';

class PopularItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _handleCollect = () => {
    Toast.success('收藏成功');
  };
  render() {
    const {image_url, title, intro, description, created} = this.props.options;
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Flex justify="start">
          <Image style={styles.portraitImg} source={{uri: image_url}} />
          <Flex.Item style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemIntro} numberOfLines={1}>
              {intro}
            </Text>
          </Flex.Item>
          <Flex align="start">
            <Icon
              style={{marginRight: 10}}
              name="star"
              size="md"
              onPress={() => {
                this._handleCollect();
              }}
            />
            <Icon
              name="unordered-list"
              size="md"
              onPress={() => {
                this._handleCollect();
              }}
            />
          </Flex>
        </Flex>
        <Text style={styles.itemContent}>{description}</Text>
        <Text style={styles.itemDate}>·{formatDate(created)}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#fff',
  },
  itemHeader: {
    marginLeft: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  itemIntro: {color: 'grey'},
  itemContent: {
    marginTop: 15,
  },
  portraitImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemDate: {
    textAlign: 'right',
  },
});

PopularItem.propTypes = {
  options: PropTypes.object,
};

PopularItem.defaultProps = {
  options: {},
};

export default PopularItem;
