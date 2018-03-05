import React from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/LoginScreen'
import Intro from '../screens/IntroScreen'
import { GET_FURRYS, GET_MY_FURRYS } from '../Reducers/furry'
import { SecureStore } from 'expo'
import * as firebase from 'firebase'

const LoginStackNavigator = StackNavigator(
  {
    Intro: {
      screen: Intro,
    },
    Login: {
      screen: Login,
    },
    Main: {
      screen: MainTabNavigator,
      key: 'main'
    },
  },
  {
    headerMode: 'none'
  }
);

class RootNavigator extends React.Component {

  state = {
    loggedIn : false
  }


  async componentDidMount() {
    let userID = await SecureStore.getItemAsync('userID')
    if(userID){
      this.props.getMyFurrys(userID)
      this.setState({loggedIn: true})
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        SecureStore.setItemAsync("userID", user.uid)
        this.props.getMyFurrys(user.uid)
        this.setState({loggedIn: true})
      }

    });

    this.props.getFurrys()

  }

  render() {
     return this.state.loggedIn?<MainTabNavigator />:<LoginStackNavigator/>
  }
}

const mapDispatchToProps = (dispatch)=>({
    getFurrys:()=>dispatch(GET_FURRYS()),
    getMyFurrys:(uid)=>dispatch(GET_MY_FURRYS(uid))
  }
)

export default connect(null, mapDispatchToProps)(RootNavigator)
