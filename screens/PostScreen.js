import React from 'react';
import { ScrollView, View, StyleSheet, Image, Platform, TouchableOpacity, refs } from 'react-native';
import {Button, Text, Thumbnail, Icon, Spinner} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ImagePicker } from 'expo'
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
}


export default class PostScreen extends React.Component {
  static navigationOptions = {
    title: 'Post',
    headerTitle: 'Post',
  };

  state = {
    image: null,
    uploading: false,
    uid: null
  };

  
  async componentDidMount(){
    let {uid} = await firebase.auth().currentUser;
    this.setState({
      uid
    })
    
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });


    if (!result.cancelled) {
      this.setState({ image: result });
    }
  };


  writeNewPost = async() => {
    let value = this.refs.form.getValue()
    if(value){
      this.setState({uploading: true})
      let img = await uploadToCloudinary(this.state.image)
      if(img) {
          let theTime = new Date()
          let postRef = firebase.database().ref('posts');
          var newPostRef = postRef.push();
          newPostRef.set(
            {
              "author": this.state.uid,
              "location": value.location,
              "description": value.description,
              "drop_duration": value.drop_duration,
              "petname": value.petname,
              "phone": value.phone,
              "token_amt": value.token_amt,
              'timestamp': theTime,
              'furryimage': img
            }
          ).then(response=>console.log(response))
          
          this.setState({uploading: false, image: null})
      }
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
        <View style={{backgroundColor: 'grey',width: 200, height: 200, borderRadius: 100}}/>
      }
      <Icon name='md-camera' style={{position: 'absolute', right: 10, bottom: -5}} />
      </View>
      </TouchableOpacity>
      
      <Form
          ref="form"
          type={Post}
          options={options}
        />
        <Button block rounded dark style={{marginBottom: 25}} onPress={()=>this.writeNewPost()} underlayColor='#99d9f4'>
        {this.state.uploading?<Spinner color='#fff' />:<Text >Save</Text>}
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
