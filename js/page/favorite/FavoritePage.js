import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Tabs, Icon, Modal} from '@ant-design/react-native';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import {actions} from '../../store/modules/favorite';

import NavigationBar from '../../components/NavigationBar';

class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
    };
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.target.title}
      subtitle={item.target.excerpt}
      rightIcon={() => {
        return (
          <Icon
            name="delete"
            onPress={() => {
              Modal.alert('确定取消收藏该问题？', null, [
                {
                  text: '取消',
                  onPress: () => console.log('cancel'),
                },
                {
                  text: '确定',
                  onPress: () => {
                    this.props.delFavoriteItem(item.id);
                  },
                },
              ]);
            }}
          />
        );
      }}
      bottomDivider
      chevron
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          title="收藏"
          statusBar={{backgroundColor: '#2196F3', barStyle: 'light-content'}}
          rightButton={() => (
            <Text
              onPress={() => {
                this.setState({
                  isEdit: !this.state.isEdit,
                });
              }}>
              {this.state.isEdit ? '编辑' : '取消'}
            </Text>
          )}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.props.items}
          renderItem={this.renderItem}
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

const mapStateToProps = (state /**ownProps */) => {
  return {
    items: state.favorite.items,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    delFavoriteItem: id => dispatch(actions.delFavoriteItem(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoritePage);
