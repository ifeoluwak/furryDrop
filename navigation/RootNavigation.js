import React from "react"
import { StackNavigator } from "react-navigation"
import { connect } from "react-redux"
import { SecureStore } from "expo"
import * as firebase from "firebase"
import MainTabNavigator from "./MainTabNavigator"
import Login from "../screens/LoginScreen"
import Intro from "../screens/IntroScreen"
import { GET_FURRYS, GET_MY_FURRYS } from "../Reducers/furry"

const LoginStackNavigator = StackNavigator(
  {
    Intro: {
      screen: Intro
    },
    Login: {
      screen: Login
    },
    Main: {
      screen: MainTabNavigator,
      key: "main"
    }
  },
  {
    headerMode: "none"
  }
)

class RootNavigator extends React.Component {
  state = {
    loggedIn: false
  }

  async componentWillMount() {
    // await SecureStore.deleteItemAsync("countryID")
    let userID = SecureStore.getItemAsync("userID")
    let countryID = SecureStore.getItemAsync("countryID")
    const uid = await userID
    const cid = await countryID
    console.log(uid)
    if (uid && cid) {
      this.props.getFurrys(cid)
      this.props.getMyFurrys(uid)
      this.setState({ loggedIn: true })
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        SecureStore.setItemAsync("userID", user.uid)
        this.props.getMyFurrys(user.uid)
        this.props.getFurrys(cid)
        this.setState({ loggedIn: true })
      }
    })
  }

  render() {
    return this.state.loggedIn ? <MainTabNavigator /> : <LoginStackNavigator />
  }
}

const mapDispatchToProps = dispatch => ({
  getFurrys: id => dispatch(GET_FURRYS(id)),
  getMyFurrys: uid => dispatch(GET_MY_FURRYS(uid))
})

export default connect(
  null,
  mapDispatchToProps
)(RootNavigator)
