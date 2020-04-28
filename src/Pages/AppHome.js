import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import logo from "../static/logo.png";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Can't settle on a place to eat?</Text>
          <Text style={styles.text}>Let us decide for you.</Text>
        </View>
        <View style={{ marginTop: "35%" }} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("SignUp")}
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
  background: {
    backgroundColor: "#002A57",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  logo: {
    height: "21%",
    width: "45%",
    marginTop: "20%",
  },
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
    height: "6%",
    width: "80%",
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
});
