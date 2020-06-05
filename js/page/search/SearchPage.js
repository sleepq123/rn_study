import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {SearchBar} from 'react-native-elements';

function SearchPage() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = val => {
    if (!val) {
      setValue(val);
      return;
    }
    setLoading(true);
    setValue(val);
    setTimeout(() => {
      handleSearch();
    }, 2000);
  };

  const handleClear = () => {
    setValue('');
  };

  const handleSearch = () => {
    setLoading(false);
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
});
export default SearchPage;
