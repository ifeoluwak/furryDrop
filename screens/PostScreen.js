import React from "react"
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView
} from "react-native"
import { Button, Icon, Spinner } from "native-base"
import { ImagePicker, SecureStore, Permissions } from "expo"
import { connect } from "react-redux"
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

class PostScreen extends React.Component {
  static navigationOptions = {
    title: "Post",
    headerTitleStyle: {
      fontSize: 25,
      fontWeight: "100",
      color: "#343434"
    }
  }

  state = {
    image: null,
    uploading: false,
    uid: null
  }

  async componentWillMount() {
    let uid = await SecureStore.getItemAsync("userID")
    this.setState({
      uid
    })

    console.log(uid)
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
        this.setState({ image: result })
      }
    }
  }

  writeNewPost = async () => {
    let value = this.refs.form.getValue()
    if (value) {
      this.setState({ uploading: true })
      let img = await uploadToCloudinary(this.state.image)
      if (img) {
        let theTime = new Date()
        let postRef = firebase.database().ref("posts")
        var newPostRef = postRef.push()
        newPostRef
          .set({
            author: this.state.uid,
            location: value.location,
            description: value.description,
            drop_duration: value.drop_duration,
            petname: value.petname,
            phone: value.phone,
            token_amt: value.token_amt,
            updated_at: `${theTime}`,
            furryimage: img,
            created_at: `${theTime}`,
            country: this.props.countryID
          })
          .then(response => console.log(response))

        this.setState({ uploading: false, image: null })
      }
    }
  }

  render() {
    let { image } = this.state
    console.log("fgirg")
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
          // keyboardVerticalOffset={-20}
          enabled
          style={{ flex: 1 }}
        >
          <TouchableOpacity
            onPress={() => this.pickImage()}
            style={{ width: 200, alignSelf: "center" }}
          >
            <View style={{ backgroundColor: "transparent" }}>
              {this.state.image ? (
                <Image
                  source={{ uri: image.uri }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 75,
                    alignSelf: "center"
                  }}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: "grey",
                    width: 200,
                    height: 200,
                    borderRadius: 100
                  }}
                />
              )}
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
            Country is set to {this.props.countryID || "US"}
          </Text>
          <Form ref="form" type={Post} options={options} />
          <Button
            block
            rounded
            dark
            style={{ marginBottom: 25 }}
            onPress={() => this.writeNewPost()}
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
//     padding: 15,
//     backgroundColor: "#fff"
//   }
// })

const mapStateToProps = state => ({
  countryID: state.furrys.countryID
})

export default connect(
  mapStateToProps,
  null
)(PostScreen)
