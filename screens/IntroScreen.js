import React, { Component } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import Swiper from "react-native-swiper"

var slide1 = require("../assets/images/slide1.jpeg")
var slide2 = require("../assets/images/slide2.jpeg")
var slide3 = require("../assets/images/slide3.jpeg")
var slide4 = require("../assets/images/slide4.jpeg")

const slides = [
  { title: "Going On A Trip & Can't Take Along Your Pet?", image: slide1 },
  { title: "Drop Your Pets In Loving Homes With Pet Lovers", image: slide2 },
  {
    title: "Wanna Take Your Pets For A Walk, But Short On Time?",
    image: slide4
  },
  { title: "Earn A Little Cash Caring For Pets You Love", image: slide3 }
]

class Intro extends Component {
  render() {
    return (
      <Swiper
        dotColor={"#fff"}
        activeDotColor={"rgba(255,255,255,0.4)"}
        showsButtons={false}
      >
        {slides.map((slide, i) => (
          <View style={styles.slide} key={i}>
            <Text style={styles.texttop}>{slide.title}</Text>
            <Image source={slide.image} style={styles.img} />
            <TouchableOpacity
              style={styles.skip}
              onPress={() => this.props.navigation.navigate("Login")}
              title="login with facebook"
            >
              <Text style={styles.skiptext}>SKIP</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Swiper>
    )
  }
}

export default Intro

var styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000"
  },
  texttop: {
    color: "#fff",
    lineHeight: 60,
    fontSize: 32,
    fontWeight: "bold",
    position: "absolute",
    top: 30
  },
  skip: {
    backgroundColor: "#fff",
    width: 250,
    borderRadius: 30,
    padding: 20,
    position: "absolute",
    bottom: 75
  },
  skiptext: {
    textAlign: "center",
    fontWeight: "bold"
  },
  img: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined,
    resizeMode: "contain"
  }
})
