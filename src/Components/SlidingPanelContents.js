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
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Overview from "../Components/SlideUp/Overview";
import Photos from "../Components/SlideUp/Photos";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

const Tab = createMaterialTopTabNavigator();

export default class SlidingPanelContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  tabs = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          indicatorStyle: {
            backgroundColor: "#FF6B00",
          },
          labelStyle: {
            color: "#002A57",
            fontFamily: "AvenirNext-Regular",
            textTransform: "none",
          },
        }}
      >
        <Tab.Screen name="Overview" component={Overview} />
        <Tab.Screen name="Photos" component={Photos} />
      </Tab.Navigator>
    );
  };

  render() {
    return this.tabs();
    //   <View style={styles.container}>
    //     <Text>Hello world</Text>
    //   </View>
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
