import React from "react"
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Platform
} from "react-native"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Icon, Picker, Button } from "native-base"
import { SecureStore } from "expo"
import { GET_FURRYS, SET_COUNTRY } from "../Reducers/furry"
import Furry from "../components/Furry"
import Country from "../constants/Country"

class HomeScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      headerTitle: "FurryDrop",
      headerTitleStyle: {
        fontSize: 25,
        fontWeight: "100",
        color: "#343434"
      },
      headerRight: (
        <Button onPress={() => screenProps.logout()} title="" transparent>
          <Icon name={Platform.OS === "ios" ? "ios-power" : "md-power"} />
        </Button>
      )
    }
  }

  state = {
    selected: ""
  }

  async componentDidMount() {
    this.setState({ selected: this.props.countryID || "US" })
  }

  inputRefs = {}

  setCountry = val => {
    this.props.SET_COUNTRY(val)
    SecureStore.setItemAsync("countryID", val)
  }

  goToDetail = item => this.props.navigation.navigate("Detail", { ...item })

  renderFurrys = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => this.goToDetail({ ...item, cid: this.state.selected })}
      >
        <Furry item={item} />
      </TouchableOpacity>
    )
  }

  render() {
    const cCode = Object.keys(Country)
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
        {!this.props.loading ? (
          <FlatList
            data={this.props.furry}
            renderItem={this.renderFurrys}
            style={{ alignSelf: "stretch", marginTop: 5 }}
            action={this.goToDetail}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>No furry found!</Text>
              </View>
            }
            ListFooterComponent={
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>No more furry!</Text>
              </View>
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
  furry: state.furrys.furrys,
  loading: state.furrys.loading,
  countryID: state.furrys.countryID
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      GET_FURRYS,
      SET_COUNTRY
    },
    dispatch
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
