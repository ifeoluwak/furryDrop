import React from 'react';
import { ScrollView, View, StyleSheet, Image, Platform, TouchableOpacity, refs } from 'react-native';
import {Button, Text, Thumbnail, Icon} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ImagePicker } from 'expo'
import * as firebase from 'firebase'
import RNFetchBlob from 'react-native-fetch-blob'


const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

var t = require('tcomb-form-native');



var Form = t.form.Form
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.height = 100

// here we are: define your domain model
var Person = t.struct({
  petname: t.String,              // a required string
  city: t.String,
  drop_period: t.Number,
  phone: t.Number,
  description: t.maybe(t.String),
  token_amt: t.maybe(t.String),             // a required number
});

var options = {
  fields: {
    petname: {
      label: 'Pet Name',
      placeholder: '',
      error: 'pet name is required',
    },
    city: {
      label: 'Your City',
      placeholder: 'e.g San fransisco',
      error: 'city field is required'
    },
    drop_period: {
      label: 'Drop Period (Days)',
      placeholder: 'e.g 20',
      error: 'Enter a valid number'
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
}


export default class PostScreen extends React.Component {
  static navigationOptions = {
    title: 'Post',
    headerTitle: 'Post',
  };

  state = {
    image: null,
  };

  


  onPress =  () => {
    // // call getValue() to get the values of the form
    // var value = this.refs.form.getValue();
    // if (value) { // if validation fails, value will be null
    //   console.log(value); // value here is an instance of Person
    // }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result });
      this.uploadImageAsync(result)
    }
  };

  uploadImageAsync = async result => {
    //let storage = firebase.storage().ref("furryimg");

    let imageUri = result ? `data:image/jpg;base64,${result.base64}` : null;
    //imageUri && console.log({uri: imageUri.slice(0, 100)});

    // let uri = imageUri.slice(0, 100)
    // console.log(uri)
  
    let uriParts = result.uri.split('.');
    //let uri = Base64.stringify(uriParts)
    let fileType = uriParts[uriParts.length - 1];
    let filename = result.uri.split('/').pop();

    this.uploadImage(result.uri, 'image/jpeg', 'mangojuice')
  
  }


 uploadImage = (uri, mime = 'image/jpeg', name) => {

    return new Promise((resolve, reject) => {
      let imgUri = uri; let uploadBlob = null;
      const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
      // const { currentUser } = firebase.auth();
      // const imageRef = firebase.storage().ref(`/jobs/${currentUser.uid}`)
      let imageRef = firebase.storage().ref("furryimg")
  
      fs.readFile(uploadUri, 'base64')
        .then(data => {
          return Blob.build(data, { type: `${mime};BASE64` });
        })
        .then(blob => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime, name: name });
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL();
        })
        .then(url => {
          resolve(url);
        })
        .catch(error => {
          reject(error)
      })
    })
  }


  writeNewPost = () => {
    // A post entry.
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value.city); // value here is an instance of Person
      let theTime = new Date()
      let postRef = firebase.database().ref('posts');
      var newPostRef = postRef.push();
      newPostRef.set(
        {
          "city": value.city,
          "description": value.description,
          "drop_period": value.drop_period,
          "petname": value.petname,
          "phone": value.phone,
          "token_amt": value.token_amt,
          'timestamp': theTime,
          'furryimage': 'https://46yxb83hlyy77jig73dh02ok-wpengine.netdna-ssl.com/wp-content/uploads/2015/10/Goat-Lovers-Anonymous-21.jpg'
        }
      );

    }
  
  }



  render() {
    let {image} = this.state
    return (
      <KeyboardAwareScrollView style={styles.container}>
      <TouchableOpacity onPress={()=>this.pickImage()} style={{width: 200, alignSelf: 'center'}}>
      <View style={{backgroundColor:'transparent'}}>
      {this.state.image?
        <Image source={{uri: image.uri}} style={{width: 150, height: 150, borderRadius: 75, alignSelf:'center'}}/>
        :
        <View style={{height:200, backgroundColor: 'grey',width: 200, height: 200, borderRadius: 100}}/>
      }
      <Icon name='md-camera' style={{position: 'absolute', right: 10, bottom: -5}} />
      </View>
      </TouchableOpacity>
      <Form
          ref="form"
          type={Person}
          options={options}
        />
        <Button block rounded style={{marginBottom: 25}} onPress={()=>this.writeNewPost()} underlayColor='#99d9f4'>
          <Text >Save</Text>
        </Button>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});
