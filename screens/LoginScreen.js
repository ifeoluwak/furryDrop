import React, {Component} from 'react'
import { Button, View, Text } from 'native-base'
import {Facebook} from 'expo'


export default class Login extends Component {


logIn = async() => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('169876030424097', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      console.log('Logged in!', `Hi ${(await response.json()).name}!`,);
    }
  }
  

  

    render() {
        return (
            <View>
                <Button onPress={()=>this.logIn()} title=''>
                    <Text>Login with Facebook</Text>
                </Button>
            </View>
        )
    }
}