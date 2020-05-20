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
import { withNavigation } from "react-navigation";
import axios from "axios";

import * as EmailValidator from "email-validator";
const screenHeight = Math.round(Dimensions.get("window").height);

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidePass: true,
      email: "nedimhodzic42@gmail.com",
      password: "test",
      error: false,
      errorMessage: "",
      spinner: false,
    };
  }

  resetErrors = () => {
    this.setState({ error: false, errorMessage: "", spinner: true });
  };

  handleSignIn = async () => {
    this.resetErrors();

    if (EmailValidator.validate(this.state.email) == false) {
      this.setState({
        error: true,
        errorMessage: "Invalid Email",
        spinner: false,
      });
    } else if (this.state.password.length < 1) {
      this.setState({
        error: true,
        errorMessage: "Invalid Password",
        spinner: false,
      });
    } else {
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
        console.log("fuck");
        this.props.goToMain();
        //const { navigate } = this.props.navigation;
        //this.props.navigation.navigate("Main");
      }
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.contentContainer}>
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
              onChangeText={(text) => this.setState({ password: text })}
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
                onPress={() => this.handleSignIn()}
              >
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => this.props.goToForgot()}
                >
                  <Text style={styles.loginText}>Forgot Password?</Text>
                </TouchableOpacity>
                <Text style={styles.bottomText}>Don't have an account?</Text>
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3%",
                  }}
                  onPress={() => this.props.goToSignUp()}
                >
                  <Text style={styles.loginText}>Sign Up</Text>
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
    top: screenHeight * 0.075,
  },
  bottomText: {
    color: "white",
    fontFamily: "AvenirNext-Regular",
    fontSize: 16,
    marginTop: "50%",
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
    marginTop: screenHeight * 0.12,
    width: "85%",
  },
});
