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
} from "react-native";
import { Text } from "react-native-paper";
import logo from "../static/logo.png";
import Modal from "react-native-modal";
import lock from "../static/lock.png";

import HomeContent from "../Components/HomeContent";
import SignUp from "../Components/SignUp";
import SignIn from "../Components/SignIn";
import Forgot from "../Components/Forgot";

const screenHeight = Math.round(Dimensions.get("window").height);

export default class AppHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: true,
      signUp: false,
      signIn: false,
      direction: null,
      forgotPassword: false,
      forgotCase: false,
    };
  }

  goToSignUp = () => {
    this.setState({
      home: false,
      signUp: true,
      signIn: false,
      firstRender: true,
      direction: "left",
    });
  };

  goToSignIn = () => {
    console.log("i am called");
    this.setState({
      home: false,
      signUp: false,
      signIn: true,
      firstRender: true,
      direction: "right",
    });
  };

  goToForgot = () => {
    this.setState({
      home: false,
      signUp: false,
      signIn: false,
      firstRender: true,
      direction: "right",
      forgotPassword: true,
      forgotCase: true,
    });
  };

  locationHistory = (screen) => {
    var history = { prev: "", current: "Home" };
  };

  goToMain = () => {
    const { navigate } = this.props.navigation;
    navigate("Main");
  };

  render() {
    return (
      <View style={styles.background}>
        <Modal
          isVisible={!this.state.forgotPassword}
          backdropOpacity={0}
          coverScreen={false}
          animationIn={!this.state.firstRender ? "fadeIn" : "slideInRight"}
          animationOut="slideOutRight"
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image style={styles.logo} source={logo} />
          </View>
        </Modal>

        <Modal
          isVisible={this.state.home}
          backdropOpacity={0}
          coverScreen={false}
          style={{ marginTop: 350 }}
          swipeDirection={["left", "right"]}
          onSwipeComplete={(direction) => {
            console.log(direction);
            if (direction["swipingDirection"] == "right") {
              this.goToSignIn();
            } else {
              this.goToSignUp();
            }
          }}
          animationOut={
            this.state.direction == "left" ? "slideOutLeft" : "slideOutRight"
          }
          animationIn={
            !this.state.firstRender
              ? "fadeIn"
              : this.state.direction == "left"
              ? "slideInLeft"
              : "slideInRight"
          }
          swipeThreshold={75}

          //animationOutTiming={50}
        >
          <HomeContent
            goToSignUp={this.goToSignUp}
            goToSignIn={this.goToSignIn}
          />
        </Modal>
        <Modal
          isVisible={this.state.signUp}
          onBackdropPress={() => {
            Keyboard.dismiss();
            console.log("backdrop");
          }}
          backdropOpacity={0}
          coverScreen={false}
          style={{ marginTop: screenHeight * 0.75 }}
          animationOut="slideOutLeft"
          animationIn="slideInRight"
          swipeDirection="right"
          onSwipeComplete={() =>
            this.setState({ home: true, signUp: false, signIn: false })
          }
          swipeThreshold={75}
        >
          <SignUp goToSignIn={this.goToSignIn} goToMain={this.props.goToMain} />
        </Modal>
        <Modal
          isVisible={this.state.signIn}
          onBackdropPress={() => {
            Keyboard.dismiss();
            console.log("backdrop");
          }}
          backdropOpacity={0}
          coverScreen={false}
          style={{ marginTop: screenHeight * 0.75 }}
          animationOut="slideOutRight"
          animationIn={this.state.forgotCase ? "slideInRight" : "slideInLeft"}
          swipeDirection="left"
          onSwipeComplete={() =>
            this.setState({
              home: true,
              signUp: false,
              signIn: false,
              forgotCase: false,
            })
          }
          swipeThreshold={75}
        >
          <SignIn
            goToSignUp={this.goToSignUp}
            goToForgot={this.goToForgot}
            goToMain={this.props.goToMain}
          />
        </Modal>
        <Modal
          isVisible={this.state.forgotPassword}
          onBackdropPress={() => {
            Keyboard.dismiss();
            console.log("backdrop");
          }}
          backdropOpacity={0}
          coverScreen={false}
          //style={{ marginTop: screenHeight * 0.75 }}
          animationOut="slideOutRight"
          animationIn="slideInLeft"
          swipeDirection="left"
          onSwipeComplete={() =>
            this.setState({
              home: false,
              signUp: false,
              signIn: true,
              forgotPassword: false,
            })
          }
          swipeThreshold={75}
        >
          <Forgot />
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
    height: "22%",
    width: "50%",
    marginTop: screenHeight * 0.075,
  },
  lock: {
    height: "22%",
    width: "35%",
    marginTop: screenHeight * 0.075,
  },
  animated: {
    width: "100%",
  },
});
