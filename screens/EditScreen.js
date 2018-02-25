import React from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, refs, KeyboardAvoidingView } from 'react-native';
import {Button, Text, Thumbnail, Icon} from 'native-base'
import { ImagePicker } from 'expo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as firebase from 'firebase'

var t = require('tcomb-form-native');



var Form = t.form.Form
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.height = 100

// here we are: define your domain model
var Person = t.struct({
  petname: t.String,              // a required string
  city: t.String,
  drop_duration: t.Number,
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
    drop_duration: {
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
};

export default class EditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {    
    return {
      title: `${navigation.state.params.petname.toUpperCase()}`,
    }
  };

  state = {
    image: this.props.navigation.state.params.furryimage,
  };

  

  onPress =  () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    const key = this.props.navigation.state.params.key
    if (value) { // if validation fails, value will be null
      //console.log(value); // value here is an instance of Person
      let theTime = new Date()
      let postRef = firebase.database().ref().child('posts').child(key)
      postRef.set(
        {
          "address": "12, Hoffstegadt street",
          "author": "1sSFXUfT6LPiCaR52GBrTuRhFSs2",
          "city": value.city,
          "description": value.description,
          "drop_duration": value.drop_duration,
          "petname": value.petname,
          "phone": value.phone,
          "token_amt": value.token_amt,
          'timestamp': theTime,
          "furryimage": "http://www.simplypetinsurance.co.uk/wp-content/uploads/2010/08/pet2.jpg",
        }
      );
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    //console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };


  render() {
    const value = this.props.navigation.state.params
    let {image} = this.state
    return (
      <KeyboardAwareScrollView style={styles.container}>
      <TouchableOpacity onPress={()=>this.pickImage()} style={{width: 200, alignSelf: 'center'}}>
      <View>
      <Image source={{uri: image}} style={{width: 150, height: 150, borderRadius: 75, alignSelf:'center'}}/>
      <Icon name='md-camera' style={{position: 'absolute', right: 10, bottom: -5}} />
      </View>
      </TouchableOpacity>
        <Form
          ref="form"
          type={Person}
          options={options}
          value={value}
        />
        <Button onPress={()=>this.onPress()} underlayColor='#99d9f4'>
          <Text >Save</Text>
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
  },
  textAreaStyle: {
    height: 100
  }
});
