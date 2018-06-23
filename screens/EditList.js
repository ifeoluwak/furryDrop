import React, { Component } from "react"
import { FlatList, Alert } from "react-native"
import { List, ListItem, Left, Body, Thumbnail, Text } from "native-base"
import { connect } from "react-redux"
import Swipeout from "react-native-swipeout"
import * as firebase from "firebase"

class EditList extends Component {
  static navigationOptions = {
    title: "My Furrys",
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: "100",
      color: "#343434"
    }
  }

  goToDetail = item =>
    this.props.navigation.navigate("EditDetails", { ...item })
  delete = item => {
    Alert.alert("Delete", "Are you sure you want to delete", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () =>
          firebase
            .database()
            .ref()
            .child("posts")
            .child(item.key)
            .remove()
      }
    ])
  }

  renderFurrys = ({ item }) => {
    let swipeSettings = {
      autoClose: true,
      right: [
        {
          onPress: () => {
            this.delete(item)
          },
          text: "Delete",
          type: "delete"
        },
        {
          onPress: () => {
            this.goToDetail(item)
          },
          text: "Edit",
          type: "primary"
        }
      ]
    }
    return (
      <Swipeout {...swipeSettings}>
        <List style={{ backgroundColor: "#fff" }}>
          <ListItem
            avatar
            style={{
              marginLeft: 0,
              paddingLeft: 5,
              backgroundColor: "rgba(255,255,255,0.6)"
            }}
          >
            <Left>
              <Thumbnail source={{ uri: item.furryimage }} />
            </Left>
            <Body>
              <Text style={{ fontWeight: "100" }}>{item.petname}</Text>
              <Text note numberOfLines={2} style={{ fontWeight: "100" }}>
                {item.description}...
              </Text>
            </Body>
          </ListItem>
        </List>
      </Swipeout>
    )
  }

  render() {
    return this.props.myfurrys.length ? (
      <FlatList
        data={this.props.myfurrys}
        renderItem={this.renderFurrys}
        extraData={this.props}
        keyExtractor={item => item.key}
        style={{ alignSelf: "stretch", backgroundColor: "#fff" }}
      />
    ) : (
      <Text style={{ textAlign: "center", marginTop: 30 }}>
        You don't have any furrys.
      </Text>
    )
  }
}

const mapStateToProps = state => ({
  myfurrys: state.furrys.myfurrys
})

export default connect(
  mapStateToProps,
  null
)(EditList)
