import React, { Component } from "react"
import { Image } from "react-native"
import { Content, Card } from "native-base"

export default class Furry extends Component {
  render() {
    let { item } = this.props
    return (
      <Content>
        <Card style={{ flex: 0, padding: 0 }}>
          <Image
            source={{ uri: item.furryimage }}
            style={{ height: 150, alignSelf: "stretch", flex: 1 }}
          />
        </Card>
      </Content>
    )
  }
}
