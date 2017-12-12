import React, {Component} from 'react'
import { Image, StyleSheet } from 'react-native'
import { Button, View, Text, Icon } from 'native-base'
import {Facebook} from 'expo'
import * as firebase from 'firebase'

var img = require('../assets/images/dog.png')


export default class Login extends Component {


logIn = async() => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('169876030424097', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
        console.log(token)
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      console.log('Logged in!', `Hi ${(await response.json()).name}!`,);

      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      
        // Sign in with credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).catch((error) => {
        // Handle Errors here.
        });
    }
  }
  

  

    render() {
        return (
            <View style={styles.container}>
            <Image source={img} style={{width: 150, height: 150, marginBottom: 70}}/>
                <Button danger block onPress={()=>this.logIn()} title='login with facebook' style={{alignSelf:'center'}}>
                <Icon name='logo-facebook' />
                    <Text>Login with Facebook</Text>
                </Button>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FF6347',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
    },
})