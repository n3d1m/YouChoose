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

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hidePass: true };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="face" size={26} color="#002A57" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#002A57"
            />
          </View>
          <View style={{ marginTop: "3%" }} />
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons
              name="email-outline"
              size={26}
              color="#002A57"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#002A57"
            />
          </View>
          <View style={{ marginTop: "3%" }} />
          <View style={styles.inputContainer}>
            <AntDesign name="lock1" size={26} color="#002A57" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#002A57"
              secureTextEntry={this.state.hidePass}
            />
            {this.state.hidePass ? (
              <Ionicons
                name="ios-eye-off"
                size={26}
                style={{ paddingRight: 7.5 }}
                color="#002A57"
                onPress={() =>
                  this.setState({ hidePass: !this.state.hidePass })
                }
              />
            ) : (
              <Ionicons
                name="ios-eye"
                size={26}
                style={{ paddingRight: 7.5 }}
                color="#002A57"
                onPress={() =>
                  this.setState({ hidePass: !this.state.hidePass })
                }
              />
            )}
          </View>
          <View style={{ marginTop: "50%" }} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.bottomContainer}>
            <Text style={styles.bottomText}>Already have an account?</Text>
            <TouchableOpacity
              style={{
                marginTop: "3%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
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
  logo: {
    height: "21%",
    width: "45%",
    marginTop: "20%",
  },
  inputContainer: {
    width: "85%",
    height: "10%",
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
  bottomContainer: {
    position: "absolute",
    bottom: "0%",
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
  contentContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    // height: 1000,
    // height: "100%",
    // width: "100%",
    //marginTop: "50%",
  },
});
