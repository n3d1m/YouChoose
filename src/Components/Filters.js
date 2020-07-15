import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import contactReducer from "../reducers/index";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Rating } from "react-native-ratings";
import images from "../categoryImages/images";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragHandler: props.dragHandler,
      filterType: props.filterType,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.filterType !== state.filterType) {
      return {
        filterType: props.filterType,
      };
    }

    return null;
  }

  category = () => {
    console.log(images);
    return (
      <View style={styles.filterCol}>
        <Text style={styles.titleText} {...this.state.dragHandler}>
          {this.state.filterType}
        </Text>
        <ScrollView contentContainerStyle={styles.photoCol}>
          {Object.keys(images).map((val, idx) => {
            return (
              <TouchableOpacity style={styles.imageContainer} key={idx}>
                <Image source={images[val]["uri"]} style={styles.image} />
                <View style={styles.centerView}>
                  <Text style={styles.imageText}>{val}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  filterRender() {
    switch (this.state.filterType) {
      case null:
        return null;

      case "Category":
        return this.category();
    }
  }

  render() {
    console.log(this.state.dragHandler, this.state.filterType);
    return <View style={styles.container}>{this.filterRender()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  filterCol: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  titleText: {
    fontSize: RFValue(16),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    width: screenWidth,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  photoCol: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: screenWidth * 0.85,
    justifyContent: "space-between",
  },
  image: {
    height: screenHeight * 0.15,
    width: screenWidth * 0.4,
    resizeMode: "stretch",
    borderRadius: 7.5,
    opacity: 0.5,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#002A57",
  },
  centerView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  imageText: {
    fontSize: RFValue(16),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    fontWeight: "bold",
  },
});
