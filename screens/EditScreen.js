import React from 'react';
import { ScrollView, StyleSheet, refs } from 'react-native';
import {Button, Text} from 'native-base'
var t = require('tcomb-form-native');




var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
  name: t.String,              // a required string
  surname: t.maybe(t.String),  // an optional string
  age: t.Number,
  fromDate: t.Date,              // a required number
  rememberMe: t.Boolean        // a boolean
});

export default class EditScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };


  onPress =  () => {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <Form
          ref="form"
          type={Person}
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
    backgroundColor: '#fff',
  },
});
