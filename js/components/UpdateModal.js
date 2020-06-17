import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Modal,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CodePush from 'react-native-code-push'; // 引入code-push
import {Progress} from '@ant-design/react-native';
import {Divider} from 'react-native-elements';

import {CODE_PUSH_KEY} from '../config';

const deviceInfo = Dimensions.get('window');
let codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency: CodePush.CheckFrequency.MANUAL,
};

class UpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isMandatory: false,
      immediateUpdate: false,
      updateInfo: {},
      percent: 0,
    };
  }

  // 是否有更新 ->
  componentWillMount() {
    CodePush.disallowRestart(); //禁止重启
    this.syncImmediate(); //开始检查更新
  }

  componentDidMount() {
    CodePush.allowRestart();
  }

  syncImmediate() {
    CodePush.checkForUpdate(CODE_PUSH_KEY).then(update => {
      if (!update) {
        console.log('已是最新版本！');
      } else if (!update.failedInstall) {
        // 有更新,弹窗显示
        this.setState({
          modalVisible: true,
          updateInfo: update,
          isMandatory: update.isMandatory,
        });
      }
    });
  }

  _immediateUpdate() {
    this.setState({immediateUpdate: true});
    CodePush.sync(
      {
        deploymentKey: CODE_PUSH_KEY,
        updateDialog: false,
        installMode: CodePush.InstallMode.IMMEDIATE,
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }

  codePushStatusDidChange(status) {
    if (this.state.immediateUpdate) {
      switch (status) {
        case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('Checking for updates.');
          break;
        case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('Downloading package.');
          break;
        case CodePush.SyncStatus.INSTALLING_UPDATE:
          console.log('Installing update.');
          break;
        case CodePush.SyncStatus.UP_TO_DATE:
          console.log('Up-to-date.');
          break;
        case CodePush.SyncStatus.UPDATE_INSTALLED:
          console.log('Update installed.');
          break;
        case CodePush.SyncStatus.UNKNOWN_ERROR:
          this.syncMessage = 'An unknown error occurred';
          this.setState({modalVisible: false});
          break;
      }
    }
  }

  codePushDownloadDidProgress(progress) {
    if (this.state.immediateUpdate) {
      const percent =
        (progress.receivedBytes / progress.totalBytes).toFixed(2) * 100;
      if (this.currProgress >= 100) {
        this.setState({modalVisible: false});
      } else {
        this.setState({
          percent,
        });
      }
    }
  }

  render() {
    const {isMandatory, modalVisible, updateInfo, immediateUpdate} = this.state;
    return (
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <Image
              style={styles.updateBg}
              source={require('../assets/images/updateBg.png')}
              resizeMode={'stretch'}
            />
            {!immediateUpdate ? (
              <>
                <View style={{padding: 10}}>
                  <Text style={styles.updateTitle}>更新内容</Text>
                  <Text style={styles.updateFont}>
                    {updateInfo.description}
                  </Text>
                </View>
                <Text style={[styles.updateFont, styles.fontCenter]}>
                  快来体验新版本吧(wifi环境下载更流畅)
                </Text>
                <Divider />
                <View style={styles.footer}>
                  {!isMandatory ? (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.footerBtn,
                          {borderRightWidth: 1, borderColor: '#e1e8ee'},
                        ]}
                        onPress={() => this.setState({modalVisible: false})}>
                        <Text style={[styles.updateFont, styles.fontCenter]}>
                          残忍拒绝
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.footerBtn}
                        onPress={() => {
                          this._immediateUpdate();
                        }}>
                        <Text style={styles.fontCenter}>极速更新</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <TouchableOpacity
                      style={styles.footerBtn}
                      onPress={() => {
                        this._immediateUpdate();
                      }}>
                      <Text style={styles.fontCenter}>立即更新</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            ) : (
              <View style={{height: 60, padding: 20}}>
                <Text>正在努力更新中...</Text>
                <Progress
                  style={{backgroundColor: 'white'}}
                  percent={this.state.percent}
                />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    height: deviceInfo.height,
    width: deviceInfo.width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    marginHorizontal: 60,
    borderRadius: 15,
    backgroundColor: 'white',
  },
  updateBg: {
    width: deviceInfo.width - 60,
    height: 180,
    borderRadius: 15,
  },
  updateTitle: {
    fontSize: 16,
  },
  updateFont: {
    fontSize: 12,
    padding: 5,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerBtn: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  fontCenter: {
    textAlign: 'center',
  },
});

export default CodePush(codePushOptions)(UpdateModal);
