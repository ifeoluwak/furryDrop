import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Asset } from 'expo'

var slide1 = require('../assets/images/slide1.jpeg')
var slide2 = require('../assets/images/slide2.jpeg')
var slide3 = require('../assets/images/slide3.jpeg')


class Intro extends Component {
    render(){
        return (
            <Swiper style={styles.wrapper} showsButtons={true}>
            <Image source={slide1} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined }}/>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
            <Image source={slide2} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined }}/>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
            <Image source={slide3} style={{ flex: 1, alignSelf: 'stretch', width: undefined, height: undefined }}/>
              <Text style={styles.text}>And simple</Text>
            </View>
          </Swiper>
        )
    }
}


export default Intro;



var styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    
  })