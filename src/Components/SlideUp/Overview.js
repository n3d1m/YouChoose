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
  Text,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import contactReducer from "../../reducers/index";

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: contactReducer(null, "GET_PLACE_DATA"),
    };
  }

  render() {
    console.log("data:", this.state.data);
    return (
      <View style={styles.container}>
        <Text>Overview</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "10%",
  },
});
