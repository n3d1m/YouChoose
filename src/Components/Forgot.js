import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Text } from "react-native-paper";
import lock from "../static/lock.png";

const screenHeight = Math.round(Dimensions.get("window").height);

export default class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.contentContainer}>
          <Image style={styles.lock} source={lock} />
          <Text style={styles.text}>Forgot your password?</Text>
          <View style={{ marginTop: screenHeight * 0.075 }} />
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={26}
              color="#002A57"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#002A57"
            />
          </View>
          <View style={{ marginTop: screenHeight * 0.15 }} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
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
  lock: {
    height: "22%",
    width: "35%",
    marginTop: screenHeight * 0.1,
  },
  contentContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: screenHeight,
  },
  text: {
    fontSize: 22.5,
    fontFamily: "AvenirNext-Regular",
    color: "white",
    marginTop: screenHeight * 0.05,
  },
  inputContainer: {
    width: "85%",
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
    height: "5%",
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
});
