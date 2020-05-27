import React from 'react';
import {StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';

import NavigationBar from '../components/NavigationBar';
import UiViewUtils from '../utils/UiViewUtils';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: 0,
    };
  }

  canGoBack = false;

  handleWebViewNavigationStateChange = newNavState => {
    const {canGoBack} = newNavState;
    this.canGoBack = canGoBack;
  };

  render() {
    const {url, title} = this.props.route.params;
    const _leftButton = UiViewUtils.leftButtonView(() => {
      if (this.canGoBack) {
        this._webView.goBack();
      } else {
        this.props.navigation.goBack();
      }
    });
    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          leftButton={_leftButton}
          statusBar={{backgroundColor: '#2196F3', barStyle: 'light-content'}}
        />
        <WebView
          ref={webView => (this._webView = webView)}
          style={{flex: 1}}
          source={{uri: url}}
          startInLoadingState={true}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

export default DetailPage;
