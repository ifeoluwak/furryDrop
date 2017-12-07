import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux'
import MainTabNavigator from './MainTabNavigator';
import Login from '../screens/LoginScreen'
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import { GET_FURRYS } from '../Reducers/furry'
import * as firebase from 'firebase'


const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: MainTabNavigator,
    },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
    this.props.getFurrys()
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
     return <Login/>
    // <RootStackNavigator />;
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
    getFurrys:()=>dispatch(GET_FURRYS())
  }
)

export default connect(null, mapDispatchToProps)(RootNavigator)
