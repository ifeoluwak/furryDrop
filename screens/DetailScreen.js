import React, { Component } from "react"
import {
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text
} from "react-native"
import ImageView from "react-native-image-view"
import { Ionicons } from "@expo/vector-icons"
import { SecureStore } from "expo"
import Country from "../constants/Country"

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.petname.toUpperCase()}`,
      tabBarVisible: false,
      headerTitleStyle: {
        fontSize: 25
      }
    }
  }

  state = {
    isVisible: false,
    country: ""
  }

  async componentDidMount() {
    // let country = await SecureStore.getItemAsync("countryID")
    // this.setState({ country })
  }

  toggleModal = () => {
    this.setState({ isVisible: !this.state.isVisible })
  }

  render() {
    let {
      description,
      drop_duration,
      furryimage,
      location,
      petname,
      phone,
      token_amt
    } = this.props.navigation.state.params
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={() => this.toggleModal()}>
          {!this.state.isVisible ? (
            <Image
              source={{ uri: furryimage }}
              style={{ height: 200, alignSelf: "stretch", flex: 1 }}
            />
          ) : (
            <ImageView
              source={{ uri: furryimage }}
              imageWidth={750}
              imageHeight={750}
              isVisible={this.state.isVisible}
              title={petname}
              onClose={() => this.setState({ isVisible: false })}
            />
          )}
        </TouchableOpacity>
        <View style={styles.body}>
          <Text style={{ fontSize: 16 }}>{description}</Text>
          <View
            style={{
              borderTopColor: "#ccc",
              borderWidth: 0.5,
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 30,
              width: 200
            }}
          />
          <View style={{ paddingBottom: 15 }}>
            <Ionicons name="ios-locate-outline" size={28} color="#000" />
            <Text>{location}</Text>
          </View>
          <View style={{ paddingBottom: 15 }}>
            <Ionicons name="ios-calendar-outline" size={28} color="#000" />
            <Text>{drop_duration} days</Text>
          </View>
          <View style={{ paddingBottom: 15 }}>
            <Ionicons
              name="ios-phone-portrait-outline"
              size={28}
              color="#000"
            />
            <Text>{phone}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>
              Owner is willing to pay{" "}
              {this.state.country ? Country[this.state.country].currency : ""}{" "}
              {token_amt}
            </Text>
          </View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  body: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15
  }
})
