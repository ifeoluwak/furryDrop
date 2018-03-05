import React, { Component } from 'react'
import { FlatList, ActivityIndicator, Alert } from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import {connect} from 'react-redux'
import Swipeout from 'react-native-swipeout'
import * as firebase from 'firebase'

class EditList extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title:'My Furrys',
  };

  goToDetail = (item)=>this.props.navigation.navigate('EditDetails', {...item})
  delete = (item)=>{
    Alert.alert("Delete", "Are you sure you want to delete", [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => firebase.database().ref().child('posts').child(item.key).remove()},
    ])
  }

  renderFurrys  = ({item}) => {
    var swipeSettings = {
      autoClose: true,
      right:[
        {
          onPress: ()=>{this.delete(item)},
          text: 'Delete',
          type: 'delete'
        },
        {
          onPress: ()=>{this.goToDetail(item)},
          text: 'Edit',
          type: 'primary'
        }
      ]
  }
    return (
      <Swipeout {...swipeSettings}>
        <List>
            <ListItem avatar style={{marginLeft:0, paddingLeft:5}}>
              <Left>
                <Thumbnail source={{ uri: item.furryimage }} />
              </Left>
              <Body>
                <Text>{item.petname}</Text>
                <Text note>Doing what you like will always keep you happy . .</Text>
              </Body>
              <Right>
                <Text note>3:43 pm</Text>
              </Right>
            </ListItem>
          </List>
      </Swipeout>
      
  )}

  render() {
    return (
      this.props.myfurrys.length?
      <FlatList
            data={this.props.myfurrys}
            renderItem={this.renderFurrys}
            extraData={this.props}
            keyExtractor={(item, index) => index}
            style={{alignSelf: 'stretch'}}
          />
          :<Text style={{textAlign: 'center', marginTop: 30}}>You don't have any furrys.</Text>
    );
  }
}

const mapStateToProps = (state)=>(
{
  myfurrys: state.furrys.myfurrys
}
)

export default connect(mapStateToProps, null)(EditList)