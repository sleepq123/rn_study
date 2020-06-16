import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {SearchBar, ListItem} from 'react-native-elements';
import {Tag, Icon} from '@ant-design/react-native';
import {connect} from 'react-redux';

import {actions} from '../../store/modules/app';
import {appService} from '../../api';

function SearchPage(props) {
  const [value, setValue] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggest, setSuggest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({offset: 0, limit: 20});

  const handleChange = val => {
    if (!val) {
      setValue(val);
      setShowSuggest(false);
      return;
    }
    setValue(val);
    handleSearchSuggest(val);
  };

  const handleClear = () => {
    setValue('');
    setShowSuggest(false);
  };

  const handleSearchSuggest = async val => {
    setLoading(true);
    setShowSuggest(true);

    try {
      let res = await appService.getSearchSuggest({q: val});
      setSuggest(res.suggest.map(({query}) => query));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSearch = async q => {
    props.addWord(q);
    const params = {
      ...searchParams,
      t: props.searchType,
      q,
    };

    try {
      let res = await appService.doSearch(params);
    } catch (error) {
      console.log(error);
    }
  };

  const _listTag = list => {
    return list.map(item => {
      return (
        <Tag
          style={styles.tagItem}
          tintColor="#2196F3"
          onPress={() => {
            handleSearch(item);
          }}>
          {item}
        </Tag>
      );
    });
  };

  const _renderSearchView = () => {
    return (
      <View>
        {props.searchWords.length > 0 && (
          <View style={styles.titleContainer}>
            <Text style={styles.titleFont}>历史搜索</Text>
            <Icon
              name="delete"
              onPress={() => {
                props.clearWord();
              }}
            />
          </View>
        )}
        <View style={styles.tagContainer}>{_listTag(props.searchWords)}</View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleFont}>搜索发现</Text>
        </View>
        <View style={styles.tagContainer}>
          {_listTag(['推荐栏一', '推荐栏二'])}
        </View>
      </View>
    );
  };

  const _renderSuggestList = () => {
    return suggest.map((item, index) => (
      <ListItem
        key={index}
        title={item}
        leftIcon={{name: 'search'}}
        onPress={() => {
          handleSearch(item);
        }}
        bottomDivider
      />
    ));
  };

  return (
    <View>
      <StatusBar backgroundColor="#2196F3" barStyle="light-content" />
      <SearchBar
        showLoading={loading}
        placeholder="Zhihu专栏"
        containerStyle={styles.containerStyle}
        inputContainerStyle={styles.inputContainerStyle}
        onChangeText={handleChange}
        onClear={handleClear}
        value={value}
      />
      {!showSuggest ? _renderSearchView() : _renderSuggestList()}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#2196F3',
    borderTopColor: '#2196F3',
    borderBottomColor: '#2196F3',
  },
  inputContainerStyle: {
    backgroundColor: '#eae9e8',
    borderWidth: 0,
  },
  titleFont: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
});

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    searchWords: state.app.searchWords,
    searchType: state.app.searchType,
  };
};
const mapDispatchToProps = (dispatch, owbnProps) => {
  return {
    addWord: word => dispatch(actions.addWord(word)),
    clearWord: () => dispatch(actions.clearWord()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
