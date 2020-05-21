import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Text } from "react-native-paper";
import logo from "../static/logo.png";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import axios from "axios";

import * as EmailValidator from "email-validator";
var passwordValidator = require("password-validator");

const screenHeight = Math.round(Dimensions.get("window").height);

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePass: true,
      fullName: "Ned",
      email: "nedimhodzic42@gmail.com",
      password: "T3stt123",
      error: false,
      errorMessage: "",
      spinner: false,
    };
  }

  resetErrors = () => {
    this.setState({ error: false, errorMessage: "", spinner: true });
  };

  passwordCheck = (password) => {
    var schema = new passwordValidator();

    schema
      .is()
      .min(8)
      .is()
      .max(50)
      .has()
      .uppercase()
      .has()
      .lowercase()
      .has()
      .digits();

    return schema.validate(password);
  };

  handleSignUp = async () => {
    this.resetErrors();

    if (this.state.fullName.length < 1) {
      this.setState({
        error: true,
        errorMessage: "Invalid Full Name",
        spinner: false,
      });
    } else if (EmailValidator.validate(this.state.email) == false) {
      this.setState({ error: true, errorMessage: "Invalid Email" });
    } else if (this.passwordCheck(this.state.password) == false) {
      this.setState({
        spinner: false,
        error: true,
        errorMessage:
          "Passwords must be at least 8 characters long, contain at least 1 uppercase and lowercase letter, and contain at least 1 digit.",
      });
    } else {
      const res = axios.post("https://cinis.serveo.net/signup", {
        full_name: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
      });

      const response = await res;
      var returnStatement = response.data.response;

      console.log(returnStatement);

      if (returnStatement == "An account with this email already exists") {
        this.setState({
          error: true,
          errorMessage: returnStatement,
          spinner: false,
        });
      } else if (returnStatement == "Success") {
        this.signIn();
      }
    }
  };

  signIn = async () => {
    const res = axios.post("https://cinis.serveo.net/login", {
      email: this.state.email,
      password: this.state.password,
    });
    const response = await res;
    var returnStatement = response.data;

    console.log(returnStatement);

    if (returnStatement.ok == false) {
      this.setState({
        error: true,
        errorMessage: returnStatement.response,
        spinner: false,
      });
    } else {
      this.props.goToMain();
    }
  };

  render() {
    console.log(this.state.error);
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="face" size={26} color="#002A57" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#002A57"
              value={this.state.fullName}
              onChangeText={(text) => this.setState({ fullName: text })}
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
              onChangeText={(text) => this.setState({ email: text })}
              value={this.state.email}
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
              value={this.state.password}
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
          {this.state.error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            </View>
          )}
          <View style={{ marginTop: screenHeight * 0.2 }} />

          {this.state.spinner ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <View
              style={{
                width: "100%",
                justifyContent: "flex-start",
                alignItems: "center",
                flex: 1,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.handleSignUp();
                }}
              >
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
                  onPress={() => this.props.goToSignIn()}
                >
                  <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
    height: screenHeight * 0.05,
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
    height: screenHeight * 0.05,
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
    top: screenHeight * 0.065,
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
    height: screenHeight,
  },
  errorText: {
    color: "red",
    fontFamily: "AvenirNext-Regular",
    fontSize: 14,
    textAlign: "center",
  },
  errorBox: {
    position: "absolute",
    marginTop: screenHeight * 0.18,
    width: "85%",
  },
});
