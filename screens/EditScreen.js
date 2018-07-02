import React from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native"
import { Button, Icon, Spinner } from "native-base"
import { ImagePicker, Permissions } from "expo"
import * as firebase from "firebase"
import uploadToCloudinary from "../api/imageUpload"

var t = require("tcomb-form-native")

var Form = t.form.Form
const stylesheet = _.cloneDeep(t.form.Form.stylesheet)
stylesheet.textbox.normal.fontSize = 14
stylesheet.textbox.normal.fontWeight = "100"
stylesheet.textbox.normal.color = "#343434"
stylesheet.controlLabel.normal.fontSize = 18
stylesheet.controlLabel.normal.fontWeight = "100"
stylesheet.controlLabel.normal.color = "#343434"

var Post = t.struct({
  petname: t.String,
  location: t.String,
  drop_duration: t.Number,
  phone: t.Number,
  description: t.maybe(t.String),
  token_amt: t.maybe(t.Number)
})

var options = {
  fields: {
    petname: {
      label: "Pet Name",
      placeholder: "",
      stylesheet
    },
    location: {
      label: "Your location/city",
      placeholder: "e.g San fransisco",
      stylesheet
    },
    drop_duration: {
      label: "Drop Duration (Days)",
      placeholder: "e.g 20",
      stylesheet
    },
    phone: {
      stylesheet
    },
    description: {
      type: "textarea",
      label: "Description (optional)",
      placeholder: "",
      multiline: true,
      numberOfLines: 20,
      stylesheet
    },
    token_amt: {
      label: "Token Amount",
      placeholder: "e.g 20",
      stylesheet
    }
  }
}

export default class EditScreen extends React.Component {
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
    image: this.props.navigation.state.params.furryimage,
    pickImaged: null,
    uploading: false
  }

  onPress = async () => {
    var value = this.refs.form.getValue()
    const {
      key,
      author,
      created_at,
      country
    } = this.props.navigation.state.params
    if (value) {
      this.setState({ uploading: true })
      let img = this.state.pickImaged
        ? await uploadToCloudinary(this.state.pickImaged)
        : this.state.image
      if (img) {
        let theTime = new Date()
        let postRef = firebase
          .database()
          .ref()
          .child("posts")
          .child(key)
        postRef.set({
          author,
          location: value.location,
          description: value.description,
          drop_duration: value.drop_duration,
          petname: value.petname,
          phone: value.phone,
          token_amt: value.token_amt,
          created_at,
          updated_at: `${theTime}`,
          country,
          furryimage: img
        })
        this.setState({ uploading: false })
        this.props.navigation.pop()
      }
    }
  }

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)

    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        base64: true
      })

      if (!result.cancelled) {
        this.setState({ pickImaged: result })
      }
    }
  }

  render() {
    const value = this.props.navigation.state.params
    let { image, pickImaged } = this.state
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "#fff",
          paddingHorizontal: 10
        }}
      >
        <KeyboardAvoidingView
          behavior={"padding"}
          enabled
          style={{ flex: 1 }}
          // keyboardVerticalOffset={20}
        >
          <TouchableOpacity
            onPress={() => this.pickImage()}
            style={{ width: 200, alignSelf: "center" }}
          >
            <View>
              <Image
                source={{ uri: pickImaged ? pickImaged.uri : image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 75,
                  alignSelf: "center"
                }}
              />
              <Icon
                name="md-camera"
                style={{ position: "absolute", right: 10, bottom: -5 }}
              />
            </View>
          </TouchableOpacity>
          <Text
            note
            style={{ alignSelf: "center", marginBottom: 10, marginTop: 30 }}
          >
            Country is set to {value.country}
          </Text>
          <Form ref="form" type={Post} options={options} value={value} />
          <Button
            block
            rounded
            dark
            style={{ marginBottom: 25 }}
            onPress={this.onPress}
            underlayColor="#99d9f4"
          >
            {this.state.uploading ? (
              <Spinner color="#fff" />
            ) : (
              <Text style={{ color: "#fff" }}>Save</Text>
            )}
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 15,
//     paddingLeft: 15,
//     paddingRight: 15,
//     backgroundColor: "#fff"
//   }
// })
