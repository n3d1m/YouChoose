import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "react-native-paper";
import logo from "../static/logo.png";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidePass: true };
  }

  render() {
    return null;
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
  inputContainer: {
    width: "80%",
    height: "5%",
    backgroundColor: "white",
    borderColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#002A57",
    alignContent: "center",
    height: "100%",
    paddingLeft: 7.5,
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
  bottomContainer: {
    position: "absolute",
    bottom: "12%",
  },
  bottomText: {
    color: "white",
    fontFamily: "AvenirNext-Regular",
    fontSize: 16,
  },
  loginText: {
    color: "#FF6B00",
    fontFamily: "AvenirNext-Regular",
    fontSize: 16,
    fontWeight: "bold",
  },
});
