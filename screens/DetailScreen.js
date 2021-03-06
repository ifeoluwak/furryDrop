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
import Country from "../constants/Country"

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.state.params.petname.toUpperCase()}`,
      tabBarVisible: false,
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "100",
        color: "#343434"
      }
    }
  }

  state = {
    isVisible: false
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
      token_amt,
      updated_at,
      cid
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
              imageWidth={1000}
              imageHeight={750}
              isVisible={this.state.isVisible}
              title={petname}
              onClose={() => this.setState({ isVisible: false })}
            />
          )}
        </TouchableOpacity>
        <View style={styles.body}>
          <Text style={styles.textStyle}>{description}</Text>
          <View
            style={{
              borderTopColor: "#ccc",
              borderWidth: 0.5,
              alignSelf: "center",
              marginTop: 30,
              marginBottom: 15,
              width: 200
            }}
          />
          <Text style={styles.date}>{updated_at.substring(4, 21)}</Text>
          <View style={styles.item}>
            <Ionicons name="ios-locate-outline" size={28} color="#000" />
            <Text style={styles.textStyle}>{location}</Text>
          </View>
          <View style={styles.item}>
            <Ionicons name="ios-calendar-outline" size={28} color="#000" />
            <Text style={styles.textStyle}>{drop_duration || "Null"} days</Text>
          </View>
          <View style={styles.item}>
            <Ionicons
              name="ios-phone-portrait-outline"
              size={28}
              color="#000"
            />
            <Text style={styles.textStyle}>{phone}</Text>
          </View>
          <View>
            <Text style={styles.textStyle}>
              Owner is willing to pay {cid ? Country[cid].currency : ""}{" "}
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
    paddingRight: 15,
    paddingBottom: 20
  },
  textStyle: {
    fontSize: 16,
    fontWeight: "100",
    color: "#343434",
    lineHeight: 25
  },
  date: {
    fontSize: 13,
    fontWeight: "100",
    color: "#343434",
    lineHeight: 20,
    alignSelf: "center",
    marginBottom: 15,
    fontStyle: "italic"
  },
  item: {
    paddingBottom: 15
  }
})
