import React from 'react';
import { ScrollView, View, StyleSheet, Image, TouchableOpacity, refs } from 'react-native';
import {Button, Text, Thumbnail, Icon} from 'native-base'
import { ImagePicker } from 'expo'
var t = require('tcomb-form-native');




var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  petname: t.String,              // a required string
  country: t.maybe(t.String),  // an optional string
  city: t.String,
  // from: t.Date,
  // toDate: t.Date,
  token_amt: t.Number,             // a required number
});

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };
  state = {
    image: this.props.navigation.state.params.furryimage,
  };

  


  onPress =  () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };


  render() {
    const value = this.props.navigation.state.params
    let {image} = this.state
    return (
      <ScrollView style={styles.container}>
      <TouchableOpacity onPress={()=>this.pickImage()} style={{width: 200, alignSelf: 'center'}}>
      <View>
      <Image source={{uri: image}} style={{width: 150, height: 150, borderRadius: 75, alignSelf:'center'}}/>
      <Icon name='md-camera' style={{position: 'absolute', right: 8, bottom: -5}} />
      </View>
      </TouchableOpacity>
        <Form
          ref="form"
          type={Person}
          value={value}
        />
        <Button onPress={()=>this.onPress()} underlayColor='#99d9f4'>
          <Text >Save</Text>
        </Button>
      </ScrollView>
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
});
