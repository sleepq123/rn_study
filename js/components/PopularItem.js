import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import PropTypes from 'prop-types';

class PopularItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {id, name, avatar_url} = this.props.options;
    return (
      <TouchableOpacity style={{flex: 1}}>
        <Text>{this.props.timestamp}</Text>
        <View>
          <Text>{id}</Text>
          <Text>{name}</Text>
          <Text>{avatar_url}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

PopularItem.PropTypes = {
  options: PropTypes.object,
};

PopularItem.defaultProps = {
  options: {},
};

export default PopularItem;
