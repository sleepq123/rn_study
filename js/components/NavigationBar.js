import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ViewPropTypes,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

const NAV_BAR_HEIGHT_ANDROID = 50; //Android的NavigationBar高度
const NAV_BAR_HEIGHT_IOS = 44; //iOs的NavigationBar高度
const STATUS_BAR_HEIGHT = 20; //状态栏高度

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      title,
      navStyle,
      statusBar,
      hidden,
      leftButton,
      rightButton,
    } = this.props;
    const isLongTitle = (title && title.length) > 10 ? true : false; // 判断title是否需要长文本截取处理
    let titleView = this.props.titleView ? (
      this.props.titleView
    ) : (
      <Text
        style={StyleSheet.flatten([
          styles.title,
          isLongTitle && styles.longTitle,
        ])}
        numberOfLines={1}>
        {title}
      </Text>
    );

    return (
      <View>
        {!statusBar.hidden && (
          <StatusBar style={styles.statusBar} {...statusBar} />
        )}
        {!hidden && (
          <View style={[styles.navBarContainer, navStyle]}>
            {leftButton && this._getButtonElement(leftButton)}
            <View style={styles.titleContainer}>{titleView}</View>
            {rightButton && this._getButtonElement(rightButton)}
          </View>
        )}
      </View>
    );
  }

  _getButtonElement = ele => {
    return <View style={styles.btnStyle}>{ele}</View>;
  };
}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
  navBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_ANDROID : NAV_BAR_HEIGHT_IOS,
    backgroundColor: '#2196F3',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
    color: '#fff',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  longTitle: {
    paddingRight: 50,
  },
  btnStyle: {
    padding: 10,
  },
});

const StatusBarStyle = {
  barStyle: PropTypes.oneOf(['light-content', 'default', 'dark-content']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

NavigationBar.propTypes = {
  navStyle: ViewPropTypes.style,
  title: PropTypes.string,
  titleView: PropTypes.element,
  hidden: PropTypes.bool,
  statusBar: PropTypes.shape(StatusBarStyle),
  leftButton: PropTypes.element,
  rightButton: PropTypes.element,
};

NavigationBar.defaultProps = {
  hidden: false,
  statusBar: {
    barStyle: 'default',
    hidden: false,
  },
};

export default NavigationBar;
