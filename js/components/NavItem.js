import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import {Icon} from '@ant-design/react-native';
import PropTypes from 'prop-types';

import GlobalUi from '../res/GlobalUi';
import UiViewUtils from '../utils/UiViewUtils';

class NavItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
    };
  }

  onClick = () => {
    if (this.props.children) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
      return;
    }

    this.props.onPress();
  };

  render() {
    const {title, titleView, leftView, style, iconStyle, children} = this.props;
    const {name, size, color} = iconStyle;

    return (
      <View>
        <TouchableOpacity
          style={[styles.itemContainer, style]}
          onPress={this.onClick}>
          <View style={styles.itemLeft}>
            {leftView ? (
              UiViewUtils.renderEleStyle(leftView, styles.leftView)
            ) : (
              <Icon name={name} size={size} style={styles.leftView} />
            )}
            {titleView ? (
              titleView
            ) : (
              <Text style={styles.titleFont}>{title}</Text>
            )}
          </View>
          {!children ? (
            <Icon name="right" />
          ) : this.state.isOpen ? (
            <Icon name="caret-up" />
          ) : (
            <Icon name="caret-down" />
          )}
        </TouchableOpacity>
        <View style={styles.line} />
        {children && this.state.isOpen && children.map(item => item)}
        {GlobalUi.getLine}
      </View>
    );
  }
}

const iconStyle = {
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

NavItem.propTypes = {
  style: ViewPropTypes.style,
  iconStyle: PropTypes.shape(iconStyle),
  title: PropTypes.string,
  titleView: PropTypes.element,
  leftView: PropTypes.element,
  children: PropTypes.array,
  onPress: PropTypes.func,
  isOpen: PropTypes.bool,
};

NavItem.defaultProps = {
  iconStyle: {},
  isOpen: false,
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftView: {
    marginRight: 10,
  },
  titleFont: {
    fontSize: 16,
    fontWeight: '200',
  },
  line: {
    height: 0.5,
    elevation: 0.5,
  },
});

export default NavItem;
