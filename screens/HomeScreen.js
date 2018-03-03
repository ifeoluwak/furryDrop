import React from 'react';
import {Image, Platform, FlatList, StyleSheet, View, Button, Icon } from 'react-native';
import { connect } from 'react-redux'
import Furry from '../components/Furry'



class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle:'furryDrop',
    //headerRight: <Button onPress={()=>{}} title='' transparent><Icon name="md-more"/></Button>,
  };

  renderFurrys ({item}) {
    return (
      <Furry item={item}/>
  )}

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            data={this.props.furry.furrys}
            renderItem={this.renderFurrys}
            extraData={this.props}
            keyExtractor={(item, index) => index}
            style={{alignSelf: 'stretch'}}
          />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  }
});

const mapStateToProps = (state) => ({
    furry: state.furrys
})


export default connect(mapStateToProps, null)(HomeScreen)
