import React from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, refs, KeyboardAvoidingView } from 'react-native';
import {Button, Text, Thumbnail, Icon, Spinner} from 'native-base'
import { ImagePicker } from 'expo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase'
import uploadToCloudinary  from '../api/imageUpload'

var t = require('tcomb-form-native');


var Form = t.form.Form
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.height = 100

var Post = t.struct({
  petname: t.String,
  location: t.String,
  drop_duration: t.Number,
  phone: t.Number,
  description: t.maybe(t.String),
  token_amt: t.maybe(t.String),
});

var options = {
  fields: {
    petname: {
      label: 'Pet Name',
      placeholder: '',
    },
    location: {
      label: 'Your location',
      placeholder: 'e.g San fransisco',
    },
    drop_duration: {
      label: 'Drop Duration (Days)',
      placeholder: 'e.g 20',
    },
    description: {
      type: 'textarea',
      label: 'Description (120 Characters)',
      placeholder: '',
      multiline: true,
      numberOfLines: 20,
      stylesheet: stylesheet
    },
    token_amt: {
      label: 'Token Amount',
      placeholder: 'e.g 20 Dollars',
    },
  }
};

export default class EditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {    
    return {
      title: `${navigation.state.params.petname.toUpperCase()}`,
      tabBarVisible: false 
    }
  }

  state = {
    image: this.props.navigation.state.params.furryimage,
    pickImaged : null,
    uploading: false
  }

  

  onPress =  async() => {
    var value = this.refs.form.getValue();
    const key = this.props.navigation.state.params.key
    if (value) {
      this.setState({uploading: true})
      let img = this.state.pickImaged?await uploadToCloudinary(this.state.pickImaged): this.state.image
      let {uid} = await firebase.auth().currentUser;
      if(img) {
        let theTime = new Date()
        let postRef = firebase.database().ref().child('posts').child(key)
        postRef.set(
          {
            "author": uid,
            "location": value.location,
            "description": value.description,
            "drop_duration": value.drop_duration,
            "petname": value.petname,
            "phone": value.phone,
            "token_amt": value.token_amt,
            'timestamp': theTime,
            "furryimage": img,
          }
        )
        this.setState({uploading: false})
        this.props.navigation.pop()
      }
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ pickImaged: result });
    }
  };


  render() {
    const value = this.props.navigation.state.params
    let {image, pickImaged} = this.state
    return (
      <KeyboardAwareScrollView style={styles.container}>
      <TouchableOpacity onPress={()=>this.pickImage()} style={{width: 200, alignSelf: 'center'}}>
      <View>
      <Image source={{uri: pickImaged?pickImaged.uri:image}} style={{width: 150, height: 150, borderRadius: 75, alignSelf:'center'}}/>
      <Icon name='md-camera' style={{position: 'absolute', right: 10, bottom: -5}} />
      </View>
      </TouchableOpacity>
        <Form
          ref="form"
          type={Post}
          options={options}
          value={value}
        />
        <Button block rounded dark style={{marginBottom: 25}} onPress={this.onPress} underlayColor='#99d9f4'>
        {this.state.uploading?<Spinner color='#fff' />:<Text >Save</Text>}
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
  }
});
