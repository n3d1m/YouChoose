import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import logo from "../static/logo.png";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.logo} source={logo} />
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
});
