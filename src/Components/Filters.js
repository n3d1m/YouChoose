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
import { AntDesign } from "@expo/vector-icons";
import Slider from "@brlja/react-native-slider";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragHandler: props.dragHandler,
      filterType: props.filterType,
      priceRange: props.priceRange,
      priceArr: null,
      distanceVal: 1,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.filterType !== state.filterType) {
      return {
        filterType: props.filterType,
      };
    }

    if (props.priceRange !== state.priceRange) {
      return {
        priceRange: props.priceRange,
      };
    }

    return null;
  }

  componentDidMount() {
    if (this.state.priceRange == null) {
      this.state.priceArr = [];
    }
  }

  priceDeconstruct = () => {
    if (this.state.priceArr.length == 0) {
      return null;
    } else {
      return this.state.priceArr.join(", ");
    }
  };

  priceSelect = (val) => {
    if (this.state.priceArr.includes(val)) {
      this.state.priceArr = this.state.priceArr.filter((item) => item !== val);
    } else {
      this.state.priceArr.push(val);
    }

    this.setState({ priceArr: this.state.priceArr });
  };

  distanceText = (usage) => {
    let number =
        Math.round((this.state.distanceVal + Number.EPSILON) * 100) / 100,
      returnText = "";

    if (number == 1) {
      returnText = "<1 km";
    } else if (number == 20) {
      returnText = "20 km +";
    } else {
      returnText = `${number} km`;
    }

    if (usage == "render") {
      return <Text style={styles.distanceText}>{returnText}</Text>;
    } else {
      return returnText;
    }
  };

  category = () => {
    //console.log(images);
    const keys = Object.keys(images);
    keys.sort();
    return (
      <View style={styles.filterCol}>
        <Text style={styles.titleText} {...this.state.dragHandler}>
          {this.state.filterType}
        </Text>
        <ScrollView contentContainerStyle={styles.photoCol}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => this.props.filterValue(this.state.filterType, null)}
          >
            <AntDesign
              name="close"
              size={RFPercentage(14)}
              style={{ marginTop: 0, opacity: 0.5 }}
              color="red"
            />
            <View style={styles.centerView}>
              <Text style={styles.imageText}>None</Text>
            </View>
          </TouchableOpacity>
          {keys.map((val, idx) => {
            return (
              <TouchableOpacity
                style={styles.imageContainer}
                key={idx}
                onPress={() =>
                  this.props.filterValue(this.state.filterType, val)
                }
              >
                <Image
                  source={{ uri: images[val]["uri"] }}
                  style={styles.image}
                />
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

  priceRange = () => {
    const prices = ["$", "$$", "$$$", "$$$$"];
    return (
      <View style={styles.filterCol} {...this.state.dragHandler}>
        <Text style={styles.titleText}>{this.state.filterType}</Text>
        <View style={[styles.photoCol, { marginTop: screenHeight * 0.04 }]}>
          {prices.map((val, idx) => {
            return (
              <TouchableOpacity
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor:
                      this.state.priceArr != null &&
                      this.state.priceArr.includes(val)
                        ? "#FF6B00"
                        : "white",
                  },
                ]}
                key={idx}
                onPress={() => this.priceSelect(val)}
              >
                <Text style={styles.priceText}>{val}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            this.props.filterValue(
              this.state.filterType,
              this.priceDeconstruct()
            )
          }
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  };

  distance = () => {
    const markerValues = [
      { value: 1, text: "<1 km" },
      { value: 5, text: "5 km" },
      { value: 10, text: "10 km" },
      { value: 15, text: "15 km" },
      { value: 20, text: "20 km +" },
    ];

    return (
      <View style={styles.filterCol} {...this.state.dragHandler}>
        <Text style={styles.titleText}>{this.state.filterType}</Text>
        {this.distanceText("render")}
        <View style={styles.slideContainer}>
          <View style={styles.markerContainer}>
            {markerValues.map((val, idx) => {
              return (
                <View style={styles.markerFlex} key={idx}>
                  <View
                    style={[
                      styles.markers,
                      {
                        backgroundColor:
                          this.state.distanceVal < val["value"]
                            ? "#002A57"
                            : "#FF6B00",
                      },
                    ]}
                  ></View>
                  <Text style={styles.markerText}>{val["text"]}</Text>
                </View>
              );
            })}
          </View>
          <Slider
            value={this.state.distanceVal}
            onValueChange={(value) => this.setState({ distanceVal: value })}
            style={styles.sliderStyle}
            minimumTrackTintColor="#FF6B00"
            maximumTrackTintColor="#002A57"
            thumbTintColor="#FF6B00"
            minimumValue={1}
            maximumValue={20}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { marginTop: screenHeight * 0.3 }]}
          onPress={() =>
            this.props.filterValue(
              this.state.filterType,
              this.distanceText("return")
            )
          }
        >
          <Text style={styles.buttonText}>Enter</Text>
        </TouchableOpacity>
      </View>
    );
  };

  rating = () => {
    const ratings = [1, 2, 3, 4, 5];
    return (
      <View style={styles.filterCol} {...this.state.dragHandler}>
        <Text style={styles.titleText}>{this.state.filterType}</Text>
        <View style={[styles.photoCol, { marginTop: screenHeight * 0.04 }]}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => this.props.filterValue(this.state.filterType, null)}
          >
            <AntDesign
              name="close"
              size={RFPercentage(14)}
              style={{ marginTop: 0, opacity: 0.5 }}
              color="red"
            />
            <View style={styles.centerView}>
              <Text style={styles.imageText}>None</Text>
            </View>
          </TouchableOpacity>
          {ratings.map((val, idx) => {
            return (
              <TouchableOpacity
                style={[styles.iconContainer]}
                key={idx}
                onPress={() =>
                  this.props.filterValue(this.state.filterType, val)
                }
              >
                <Rating
                  ratingColor="#002A57"
                  tintColor="#fff"
                  type="custom"
                  imageSize={RFValue(24)}
                  startingValue={val}
                  ratingCount={val}
                  readonly={true}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  filterRender() {
    switch (this.state.filterType) {
      case null:
        return null;

      case "Category":
        return this.category();

      case "Price Range":
        return this.priceRange();

      case "Distance":
        return this.distance();

      case "Rating":
        return this.rating();
    }
  }

  render() {
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
  priceCol: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "red",
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
    width: screenWidth,
    justifyContent: "space-evenly",
  },
  image: {
    height: screenHeight * 0.125,
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
    marginTop: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#002A57",
    marginTop: 10,
    height: screenHeight * 0.13,
    width: screenWidth * 0.4,
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
  priceText: {
    fontSize: RFValue(32),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    fontWeight: "bold",
  },
  button: {
    width: screenWidth * 0.5,
    height: screenHeight * 0.075,
    backgroundColor: "#FF6B00",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.07,
  },
  buttonText: {
    fontSize: RFValue(16),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    fontWeight: "bold",
  },
  sliderStyle: {
    width: screenWidth * 0.85,
  },
  slideContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    marginTop: screenHeight * 0.025,
  },
  markerContainer: {
    position: "absolute",
    width: screenWidth * 0.91,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  markerFlex: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    width: 40,
  },
  markers: {
    height: 15,
    width: 15,
    borderRadius: 100,
    marginTop: 12.5,
  },
  markerText: {
    fontSize: RFValue(8),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 4,
  },
  distanceText: {
    fontSize: RFValue(24),
    fontFamily: "AvenirNext-Regular",
    color: "#FF6B00",
    textAlign: "center",
    fontWeight: "bold",
    marginTop: screenHeight * 0.025,
  },
});
