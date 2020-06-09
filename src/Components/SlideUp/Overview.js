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
import { Rating } from "react-native-ratings";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getDistance } from "geolib";
import axios from "axios";

import contactReducer from "../../reducers/index";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeData: null,
      logo: null,
      latLong: null,
    };
  }

  componentDidMount() {
    console.log("i am being called");

    const placeData = contactReducer(null, "GET_PLACE_DATA");
    this.getLogo(placeData["logo_url"]);

    this.setState({
      placeData: placeData,
      latLong: contactReducer(null, "GET_LAT_LONG"),
    });
  }

  getLogo = (logo) => {
    console.log(logo);
    axios
      .get(`https://logo.clearbit.com/${logo}?size=100`)
      .then((response) => {
        console.log("response: " + response["request"]["responseURL"]);
        this.setState({ logo: response["request"]["responseURL"] });
      })
      .catch((e) => this.setState({ logo: null }));
  };

  getDistance(placeGeometry) {
    const distance = getDistance(
      {
        latitude: this.state.latLong["latitude"],
        longitude: this.state.latLong["longitude"],
      },
      { latitude: placeGeometry["lat"], longitude: placeGeometry["lng"] }
    );

    return (distance / 1000).toFixed(2);
  }

  render() {
    const priceMap = {
      1: "$",
      2: "$$",
      3: "$$$",
      4: "$$$$",
      5: "$$$$$",
    };
    console.log("latLong: " + this.state.latLong);
    return (
      <View style={styles.container}>
        {this.state.placeData != null && (
          <View style={styles.contentRow}>
            <Image
              source={{
                uri:
                  this.state.logo == null
                    ? this.state.placeData["image_url"]
                    : this.state.logo,
              }}
              //source={{ uri: "https://logo.clearbit.com/spotify.com" }}
              //source={{ uri: this.state.placeData["image_url"] }}
              style={styles.image}
            />
            <View style={styles.contentCol}>
              <Text style={styles.contentText}>
                {this.state.placeData["name"]}
              </Text>
              <Text style={styles.contentText}>
                {this.state.placeData["address"]}
              </Text>
              <View style={styles.infoRow}>
                <Rating
                  ratingColor="#FF6B00"
                  type="custom"
                  imageSize={RFValue(10)}
                  startingValue={this.state.placeData["rating"]}
                  readonly={true}
                />
                <Text style={styles.infoText}>
                  |{"  "}
                  {priceMap[this.state.placeData["price_level"]]}
                  {"  "}|{"  "}
                  {this.getDistance(
                    this.state.placeData["geometry"]["location"]
                  )}{" "}
                  km away
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingBottom: "10%",
  },
  contentRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: screenHeight * 0.05,
  },
  image: {
    height: screenHeight * 0.13,
    width: screenWidth * 0.375,
    resizeMode: "contain",
    borderRadius: (screenHeight * 0.15) / 4,
  },
});
