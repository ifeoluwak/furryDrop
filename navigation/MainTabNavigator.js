import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import EditList from '../screens/EditList';
import EditScreen from '../screens/EditScreen'
import PostScreen from '../screens/PostScreen';




export const EditStack = StackNavigator({
  EditList: {
    screen: EditList,
  },
  FurryDetails: {
    screen: EditScreen,
    
  }}, 
);

export const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
  } 
});
export const PostStack = StackNavigator({
  Post: {
    screen: PostScreen,
  } 
});

export default TabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    MyFurrys: {
      screen: EditStack,
    },
    Post: {
      screen: PostStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName =
              Platform.OS === 'ios'
                ? `ios-information-circle${focused ? '' : '-outline'}`
                : 'md-information-circle';
            break;
          case 'MyFurrys':
            iconName = Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link';
            break;
          case 'Post':
            iconName =
              Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    
  }
);
