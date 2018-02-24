import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/LoginScreen'
import Intro from '../screens/IntroScreen'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import { GET_FURRYS, GET_MY_FURRYS } from '../Reducers/furry'
import * as firebase from 'firebase'


// const RootStackNavigator = StackNavigator(
//   {
//     Main: {
//       screen: MainTabNavigator,
//     },
//   },
//   {
//     //headerMode: 'none',
  
//   }
// );

const LoginStackNavigator = StackNavigator(
  {
    Login: {
      screen: Login,
    },
    Intro: {
      screen: Intro,
    },
    Main: {
      screen: MainTabNavigator
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
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
    // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      console.log("We are authenticated now!");
      this.setState({loggedIn: true})
    }

  });

    this.props.getFurrys()
    this.props.getMyFurrys()
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
     return this.state.loggedIn?<MainTabNavigator />:<LoginStackNavigator/>
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}

const mapDispatchToProps = (dispatch)=>({
    getFurrys:()=>dispatch(GET_FURRYS()),
    getMyFurrys:()=>dispatch(GET_MY_FURRYS())
  }
)

export default connect(null, mapDispatchToProps)(RootNavigator)
