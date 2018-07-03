import React, { Component } from "react"
import { Image, StyleSheet, Alert } from "react-native"
import { Button, View, Text, Icon } from "native-base"
import { Facebook } from "expo"
import * as firebase from "firebase"

var img = require("../assets/images/dog.png")

export default class Login extends Component {
  state = {
    modalVisible: false
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  logIn = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "169876030424097",
      {
        permissions: ["public_profile", "email"]
      }
    )
    if (type === "success") {
      //let user = await response.json();
      //console.log(JSON.stringify(user));

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .catch(error => {
          Alert.alert(error)
        })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={img}
          style={{ width: 150, height: 150, marginBottom: 70 }}
        />
        <Button
          info
          block
          onPress={() => this.logIn()}
          title="login with facebook"
          style={{ alignSelf: "center" }}
        >
          <Icon name="logo-facebook" />
          <Text>Login with Facebook</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: null,
    height: null
  }
})
