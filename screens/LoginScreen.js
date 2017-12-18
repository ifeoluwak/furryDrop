import React, {Component} from 'react'
import { Image, Modal, StyleSheet, TouchableHighlight } from 'react-native'
import { Button, View, Text, Icon } from 'native-base'
import {Facebook} from 'expo'
import * as firebase from 'firebase'

var img = require('../assets/images/dog.png')


export default class Login extends Component {
    state = {
        modalVisible: false,
    };
    
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

logIn = async() => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('169876030424097', {
        permissions: ['public_profile','email'],
      });
    if (type === 'success') {
        console.log(token)
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?fields=id,first_name,gender,last_name,location,picture,email&access_token=${token}`);
      let user = await response.json();
      console.log(JSON.stringify(user));

    //   const credential = firebase.auth.FacebookAuthProvider.credential(token);
      
    //     // Sign in with credential from the Facebook user.
    //     firebase.auth().signInWithCredential(credential).catch((error) => {
    //     // Handle Errors here.
    //     });
    }
}
  

    render() {
        return (
            <View style={styles.container}>
            <Image source={img} style={{width: 150, height: 150, marginBottom: 70}}/>
                <Button info block onPress={()=>this.props.navigation.navigate('Intro')} title='login with facebook' style={{alignSelf:'center'}}>
                <Icon name='logo-facebook' />
                    <Text>Login with Facebook</Text>
                </Button>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 22}}>
                    <View>
                    <Text>Hello World!</Text>

                    <TouchableHighlight 
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}>      
                        <Text>Hide Modal</Text>
                    </TouchableHighlight>
                    </View>
                </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
    },
})