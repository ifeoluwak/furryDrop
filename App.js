import React from "react"
import { StatusBar, StyleSheet, View } from "react-native"
import { AppLoading, Asset, Font, SecureStore } from "expo"
import { Ionicons } from "@expo/vector-icons"
import { Provider } from "react-redux"
import * as firebase from "firebase"
import RootNavigation from "./navigation/RootNavigation"
import { store } from "./Reducers"

const firebaseConfig = {
  apiKey: "AIzaSyClAuCXBN70ymEUXx6eJb_Y-xRALFI4KMQ",
  authDomain: "furryd-8d2cf.firebaseapp.com",
  databaseURL: "https://furryd-8d2cf.firebaseio.com",
  projectId: "furryd-8d2cf",
  storageBucket: "furryd-8d2cf.appspot.com",
  messagingSenderId: "822753904792"
}

firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar hidden />
            <RootNavigation />
          </View>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/dog.png"),
        require("./assets/images/slide1.jpeg"),
        require("./assets/images/slide2.jpeg"),
        require("./assets/images/slide3.jpeg"),
        require("./assets/images/slide4.jpeg")
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
      })
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = async () => {
    await SecureStore.setItemAsync("countryID", "US")
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: "rgba(0,0,0,0.2)"
  }
})
