import React from "react"
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Icon, Picker } from "native-base"
import { SecureStore } from "expo"
import { GET_FURRYS } from "../Reducers/furry"
import Furry from "../components/Furry"
import Country from "../constants/Country"

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: "FurryDrop",
    headerTitleStyle: {
      fontSize: 25,
      color: "#343434"
    }
    //headerRight: <Button onPress={()=>{}} title='' transparent><Icon name="md-more"/></Button>,
  }

  state = {
    selected: ""
  }

  async componentWillMount() {
    let id = await SecureStore.getItemAsync("countryID")
    this.setState({ selected: id || "US" })
  }

  inputRefs = {}

  setCountry = val => {
    SecureStore.setItemAsync("countryID", val)
  }

  goToDetail = item => this.props.navigation.navigate("Detail", { ...item })

  renderFurrys = ({ item }) => {
    return (
      <TouchableOpacity key={item.key} onPress={() => this.goToDetail(item)}>
        <Furry item={item} />
      </TouchableOpacity>
    )
  }

  render() {
    const cCode = Object.keys(Country)
    console.log(this.props.furry)
    return (
      <View style={styles.container}>
        <Picker
          mode="dropdown"
          iosHeader="Select Country"
          iosIcon={<Icon name="ios-arrow-down-outline" />}
          placeholder="Select Country"
          placeholderStyle={{ color: "grey" }}
          style={{
            width: "100%",
            borderBottomColor: "#000",
            borderBottomWidth: 0.3
          }}
          selectedValue={this.state.selected}
          onValueChange={value => {
            this.setState({
              selected: value
            })
            this.setCountry(value)
            this.props.GET_FURRYS(value)
          }}
        >
          {cCode.map(item => (
            <Picker.Item label={Country[item].name} value={item} key={item} />
          ))}
        </Picker>
        {this.props.furry.length ? (
          <FlatList
            data={this.props.furry}
            renderItem={this.renderFurrys}
            style={{ alignSelf: "stretch", marginTop: 5 }}
            action={this.goToDetail}
            ListEmptyComponent={<Text>Nothing to Show</Text>}
            ListFooterComponent={
              <Text style={{ alignSelf: "center" }}>
                No more furrys to show
              </Text>
            }
          />
        ) : (
          <ActivityIndicator color="red" size="large" />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10
  },
  picker: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "red",
    color: "black",
    width: "100%"
  }
})

const mapStateToProps = state => ({
  furry: state.furrys.furrys
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      GET_FURRYS
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
