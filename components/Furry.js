import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';




export default class Furry extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        let {item} = this.props 
        return (
            <Content>
            <Card style={{flex: 0, padding: 0}}>
                    <Image source={{uri: item.furryimage}} style={{height: 200, alignSelf: 'stretch', flex: 1}}/>
                
                {/* <CardItem>
                <Left>
                    <Icon name="md-paw" size={30} />
                    <Text>{item.petname}</Text>
                </Left>
                </CardItem>
                <CardItem>
                <Left>
                    <Icon name="md-cash" size={30} />
                    <Text>{item.token_amt}</Text>
                </Left>
                </CardItem>
                <CardItem>
                <Left>
                    <Icon name="md-calendar" size={30} />
                    <Text>{item.from} - {item.to}</Text>
                </Left>
                </CardItem>
                <CardItem>
                <Left>
                    <Icon name="md-navigate" size={30} />
                    <Text>{item.address}</Text>
                </Left>
                </CardItem>
                <CardItem>
                <Left>
                    <Button>
                    <Icon name="md-call" size={30} />
                    </Button>
                </Left>
                <Right>
                    <Button>
                    <Icon name="md-mail" size={30} />
                    </Button>
                </Right>
                </CardItem> */}
            </Card>
            </Content>
        );
  }
}