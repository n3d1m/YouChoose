import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Text } from "react-native-paper";

export default class HomeContent extends React.Component {
  render() {
    return (
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Can't settle on a place to eat?</Text>
          <Text style={styles.text}>Let us decide for you.</Text>
        </View>
        <View style={{ marginTop: "35%" }} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.goToSignUp(true);
            console.log("hello");
            //this.props.navigation.navigate("SignUp")}
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{ marginTop: "5%" }} />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    //marginTop: "10%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22.5,
    fontFamily: "AvenirNext-Regular",
    color: "white",
  },
  buttonContainer: {
    height: "25%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "red",
  },
  button: {
    height: "10%",
    width: "85%",
    textAlign: "center",
    backgroundColor: "#FF6B00",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontFamily: "AvenirNext-Regular",
    color: "white",
    fontWeight: "bold",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
});
