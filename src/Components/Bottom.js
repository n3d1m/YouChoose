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
import { Entypo } from "@expo/vector-icons";

const screenHeight = Math.round(Dimensions.get("window").height);

export default class Bottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.row}>
        <Entypo name="home-outline" size={26} color="#FF6B00" />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    height: screenHeight * 0.05,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
});
