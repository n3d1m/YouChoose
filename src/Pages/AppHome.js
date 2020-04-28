import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "react-native-paper";
import logo from "../static/logo.png";
import Modal from "react-native-modal";

import HomeContent from "../Components/HomeContent";
import SignUp from "../Components/SignUp";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      move: false,
      moveValue: new Animated.Value(0),
      signInValue: new Animated.Value(1000),
      signUp: false,
      home: true,
    };
  }

  goToSignUp = (bool) => {
    this.setState({ home: !bool, signUp: bool });
  };

  render() {
    return (
      <View style={styles.background}>
        <Image style={styles.logo} source={logo} />
        <Modal
          isVisible={this.state.home}
          backdropOpacity={0}
          coverScreen={false}
          style={{ marginTop: 350 }}
          animationOut="slideOutLeft"
          animationOutTiming={50}
        >
          <HomeContent goToSignUp={this.goToSignUp} />
        </Modal>
        <Modal
          isVisible={this.state.signUp}
          onBackdropPress={() => {
            Keyboard.dismiss();
            console.log("backdrop");
          }}
          backdropOpacity={0}
          coverScreen={false}
          style={{ marginTop: 250 }}
          animationOut="slideOutLeft"
          animationIn="slideInRight"
        >
          <SignUp />
        </Modal>
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
  animated: {
    width: "100%",
  },
});
