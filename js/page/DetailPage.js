import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {WebView} from 'react-native-webview';

import NavigationBar from '../components/NavigationBar';
import UiViewUtils from '../utils/UiViewUtils';
import {Button} from '@ant-design/react-native';

class DetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canGoBack: 0,
      isError: false,
    };
  }

  canGoBack = false;

  handleWebViewNavigationStateChange = newNavState => {
    const {canGoBack} = newNavState;
    this.canGoBack = canGoBack;
  };

  _renderErrorPage = () => {
    return (
      <View style={styles.errorContainer}>
        <Image
          style={styles.errorImg}
          source={require('../assets/network_error.png')}
        />
        <Text style={styles.errorFont}>啊哦,网络好像跑到外星球去了~</Text>
        <Button
          type="primary"
          onPress={() => {
            this.setState(
              {
                isError: false,
              },
              () => {
                this._webView.reload();
              },
            );
          }}>
          重新加载
        </Button>
      </View>
    );
  };

  render() {
    const {url, title} = this.props.route.params;
    const _leftButton = UiViewUtils.leftButtonView(() => {
      if (this.canGoBack) {
        this.setState({
          isError: false,
        });
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
        {this.state.isError ? (
          this._renderErrorPage()
        ) : (
          <WebView
            ref={webView => (this._webView = webView)}
            style={{flex: 1}}
            source={{uri: url}}
            startInLoadingState={true}
            onNavigationStateChange={this.handleWebViewNavigationStateChange}
            onError={syntheticEvent => {
              this.setState({
                isError: true,
              });
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorImg: {
    width: 300,
    height: 300,
  },
  errorFont: {
    fontSize: 14,
    marginBottom: 20,
  },
});

export default DetailPage;
