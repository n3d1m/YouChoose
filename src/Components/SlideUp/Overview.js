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
import call from "react-native-phone-call";

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
      dragHandler: contactReducer(null, "GET_DRAG_HANDLE"),
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

  callNumber(number) {
    const args = {
      number: number,
      prompt: true,
    };

    call(args).catch(console.error);
  }

  openCloseTime(type) {
    const dayDict = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    let date = new Date(),
      day = date.getDay(),
      currentHour = date.getHours(),
      currentDay = dayDict[day];

    day -= 1;
    if (day < 0) {
      day = 6;
    }

    if (
      this.state.placeData["opening_hours"]["open_now"] == true &&
      0 < currentHour < 6
    ) {
      day -= 1;
      if (day < 0) {
        day = 6;
      }
    }

    console.log(day);

    let todaysHours = this.state.placeData["opening_hours"]["hours"][day];
    let hours = todaysHours.split(":");
    hours.shift();
    hours = hours.join(":").split("–");

    console.log(hours);

    if (type == "close") {
      return <Text style={styles.openCloseText}>(Closes at{hours[1]})</Text>;
    } else {
      return <Text style={styles.openCloseText}>(Opens at{hours[0]})</Text>;
    }
  }

  render() {
    const priceMap = {
      1: "$",
      2: "$$",
      3: "$$$",
      4: "$$$$",
      5: "$$$$$",
    };
    //console.log(this.state.placeData);
    //console.log(this.state.dragHandler);

    return (
      <View style={styles.container}>
        {this.state.placeData != null && (
          <View style={styles.contentContainer}>
            <View style={styles.contentRow} {...this.state.dragHandler}>
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
                <TouchableOpacity
                  onPress={() =>
                    this.callNumber(this.state.placeData["phone_number"])
                  }
                >
                  <Text style={styles.phoneText}>
                    {this.state.placeData["phone_number"]}
                  </Text>
                </TouchableOpacity>

                {this.state.placeData["opening_hours"]["open_now"] ? (
                  <View style={styles.openCloseRow}>
                    <Text style={styles.openText}>Open</Text>
                    {this.openCloseTime("close")}
                  </View>
                ) : (
                  <View style={styles.openCloseRow}>
                    <Text style={styles.closedText}>Closed</Text>
                    {this.openCloseTime("open")}
                  </View>
                )}
              </View>
            </View>
            <View style={styles.lowerRow}>
              <View style={styles.box1}>
                <Text style={styles.hoursText}>Hours</Text>
                <View style={styles.hoursCol}>
                  {this.state.placeData["opening_hours"]["hours"].map(
                    (val, idx) => {
                      let day = val.split(":");
                      let hours = val.split(":");
                      hours.shift();
                      hours = hours.join(":");

                      return (
                        <View
                          style={{
                            justifyContent: "flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            width: "100%",
                            flexWrap: "wrap",
                          }}
                          key={idx}
                        >
                          <Text style={styles.hoursHeader}>{day[0]}:</Text>
                          <Text style={styles.hoursSubText}>{hours}</Text>
                        </View>
                      );
                      //   return <Text key={idx}>{val}</Text>;
                    }
                  )}
                </View>
              </View>
              <View style={styles.box2}>
                <Text>hello</Text>
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
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    width: "100%",
  },
  contentRow: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop: screenHeight * 0.025,
    paddingBottom: screenHeight * 0.025,
    borderBottomColor: "#002A57",
    borderBottomWidth: 2,
  },
  image: {
    height: screenHeight * 0.18,
    width: screenWidth * 0.4,
    resizeMode: "contain",
    //borderRadius: (screenHeight * 0.18) / 4,
  },
  contentCol: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    width: screenWidth * 0.45,
    marginLeft: 10,
    marginTop: -5,
  },
  contentText: {
    fontSize: RFValue(10),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    marginTop: 5,
  },
  infoRow: {
    width: screenWidth * 0.45,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  infoText: {
    fontSize: RFValue(10),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    marginLeft: 5,
  },
  lowerRow: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  box1: {
    width: "50%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    borderRightColor: "#002A57",
    borderRightWidth: 1,
  },
  box2: {
    width: "50%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    borderLeftColor: "#002A57",
    borderLeftWidth: 1,
  },
  hoursText: {
    fontSize: RFValue(16),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    marginTop: 5,
  },
  hoursCol: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    height: "50%",
    overflow: "scroll",
  },
  hoursHeader: {
    fontSize: RFValue(10),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    fontWeight: "bold",
    marginTop: 10,
  },
  hoursSubText: {
    fontSize: RFValue(10),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    marginTop: 10,
  },
  openText: {
    fontSize: RFValue(10),
    fontFamily: "AvenirNext-Regular",
    color: "green",
    marginTop: 5,
  },
  closedText: {
    fontSize: RFValue(10),
    fontFamily: "AvenirNext-Regular",
    color: "red",
    marginTop: 5,
  },
  phoneText: {
    fontSize: RFValue(10),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    marginTop: 5,
  },
  openCloseRow: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  openCloseText: {
    fontSize: RFValue(8),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    marginLeft: 5,
    marginTop: 5,
  },
});
