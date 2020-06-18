import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

class WelcomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{uri: require('../assets/images/welcome.png')}}
          style={styles.image}>
          <TouchableOpacity style={styles.skip} onPress={this.props.skip}>
            <Text style={{color: 'white'}}>跳过</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  skip: {
    position: 'relative',
    top: 20,
    right: 20,
    width: 120,
    height: 60,
    backgroundColor: 'skyblue',
    borderRadius: 10,
    opacity: 0.3,
  },
});

export default WelcomePage;
