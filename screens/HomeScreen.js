import React from 'react';
import {Image, TouchableOpacity, Platform, FlatList, StyleSheet, View, Button, Icon, Text } from 'react-native';
import { connect } from 'react-redux'
import Furry from '../components/Furry'



class HomeScreen extends React.Component {

  static navigationOptions = {
    headerTitle:'FurryDrop',
    headerTitleStyle: {
      fontSize: 25,
      color: '#343434'
    }
    //headerRight: <Button onPress={()=>{}} title='' transparent><Icon name="md-more"/></Button>,
  };


  goToDetail = (item)=>this.props.navigation.navigate('Detail', {...item})

  renderFurrys = ({item}) => {
    return (
      <TouchableOpacity onPress={()=>this.goToDetail(item)}>
      <Furry item={item} />
      </TouchableOpacity>
  )}

  loadMore = ()=> {
    alert('hello')
  }

  render() {
    return (
      <View style={styles.container}>
      {
        this.props.furry.length?
        <FlatList
            data={this.props.furry}
            renderItem={this.renderFurrys}
            extraData={this.props}
            keyExtractor={(item, index) => index}
            style={{alignSelf: 'stretch'}}
            action={this.goToDetail}
          />
          :
          <Text>Loading....please wait</Text>
      }
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
    furry: state.furrys.furrys
})


export default connect(mapStateToProps, null)(HomeScreen)
