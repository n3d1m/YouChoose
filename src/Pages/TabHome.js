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
  Linking,
  Platform,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Entypo, Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import contactReducer from "../reducers/index";
import AnimatedLoader from "react-native-animated-loader";
import { Rating } from "react-native-ratings";
import { getDistance } from "geolib";
import SlidingUpPanel from "rn-sliding-up-panel";

import SlidingPanelContents from "../Components/SlidingPanelContents";
import Filters from "../Components/Filters";

//StatusBar.setBarStyle("dark-content", true);

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class TabHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentApi: contactReducer(null, "GET_API")["api"],
      currentLocation: "",
      filters: {
        Category: {
          iconName: "md-grid",
          set: "IonIcons",
        },
        "Price Range": {
          iconName: "attach-money",
          set: "MaterialIcons",
        },
        Distance: {
          iconName: "directions-car",
          set: "MaterialIcons",
        },
        Rating: {
          iconName: "star",
          set: "MaterialIcons",
        },
      },
      locationPermission: null,
      locationObj: null,
      latLong: null,
      spinner: true,
      randomSelection: false,
      popover: false,
      placeData: null,
      error: false,
      logo: null,
      bottomMenu: false,
      category: null,
      priceRange: null,
      distance: null,
      rating: null,
      filterSelected: false,
      filterType: null,
    };
  }

  getLocation = async () => {
    let statusObj = await Location.requestPermissionsAsync();

    if (statusObj["status"] !== "granted") {
      this.setState({
        locationPermission: false,
        currentLocation: "Select a Location",
        spinner: false,
      });
    } else {
      let location = await Location.getCurrentPositionAsync();
      let latLong = {
        latitude: location["coords"]["latitude"],
        longitude: location["coords"]["longitude"],
      };
      let reverseGeocode = await Location.reverseGeocodeAsync(latLong);

      contactReducer(latLong, "UPDATE_LAT_LONG");

      this.setState({
        locationPermission: true,
        locationObj: reverseGeocode[0],
        currentLocation: `${reverseGeocode[0]["city"]}, ${reverseGeocode[0]["region"]}`,
        spinner: false,
        latLong: latLong,
      });
    }
  };

  randomSelection = async () => {
    this.setState({
      randomSelection: true,
      popover: false,
      logo: null,
      bottomMenu: false,
    });
    const authData = contactReducer(null, "GET_AUTH")["payload"];
    console.log(authData);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData["access_token"]}`,
    };

    const data = {
      lat: this.state.latLong["latitude"],
      long: this.state.latLong["longitude"],
    };

    const res = axios.post(
      this.state.currentApi + "/random_selection",
      data,
      {
        headers: headers,
      }
      //access_token
    );

    const response = await res;

    //console.log(response.data);

    if (response.data.ok != undefined) {
      const returnStatement = response.data.data;

      let error = false;
      let placeData = null;

      if (response.data.ok == true) {
        console.log(returnStatement);
        placeData = returnStatement;
      } else {
        error = true;
      }
      this.getLogo(placeData["logo_url"]);
      contactReducer(placeData, "UPDATE_PLACE_DATA");

      this.setState({
        randomSelection: false,
        error: error,
        popover: true,
        placeData: placeData,
        bottomMenu: true,
        filterSelected: false,
      });
    }
  };

  componentDidMount() {
    this.getLocation();
  }

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
      //console.log(hours[0].replace(/\s+/g, ""));
      if (hours[0] == " Closed") {
        return <Text></Text>;
      } else {
        return <Text style={styles.openCloseText}>(Opens at{hours[0]})</Text>;
      }
    }
  }

  openMaps = () => {
    let latLong = this.state.placeData["geometry"]["location"];
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    let url = scheme + `${latLong["lat"]},${latLong["lng"]}`;
    console.log(url);
    Linking.openURL(url);
  };

  getFilter = (name) => {
    this.setState({ filterSelected: true, filterType: name });
    this._filterPanel.show();
  };

  topBar = () => {
    var filterState = this.state.filters;
    return (
      <View style={styles.topBar}>
        <View style={styles.row1}>
          <View style={styles.bigBox}>
            <Entypo name="location-pin" color="#002A57" size={RFValue(20)} />
            <Text style={styles.row1Text}>{this.state.currentLocation}</Text>
            <View style={{ width: RFValue(20) }} />
          </View>
        </View>
        <View style={styles.row2}>
          {Object.keys(filterState).map((val, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={styles.smallBox}
                onPress={() => {
                  this.getFilter(val);
                }}
              >
                {filterState[val]["set"] == "IonIcons" ? (
                  <Ionicons
                    name={filterState[val]["iconName"]}
                    color="#002A57"
                    size={RFValue(12)}
                  />
                ) : filterState[val]["set"] == "MaterialIcons" ? (
                  <MaterialIcons
                    name={filterState[val]["iconName"]}
                    color="#002A57"
                    size={RFValue(12)}
                  />
                ) : null}
                <Text style={styles.row2Text}>{val}</Text>
                <View style={{ width: RFValue(5) }} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  popover = () => {
    //console.log(this.state.placeData);
    const priceMap = {
      1: "$",
      2: "$$",
      3: "$$$",
      4: "$$$$",
      5: "$$$$$",
    };

    return (
      <View style={styles.popover}>
        {console.log(this.state.logo)}
        <View style={styles.popoverHeaderRow}>
          <View style={{ width: RFValue(15) }} />
          <Text style={styles.popoverText}>Your Selection:</Text>
          <AntDesign
            name="close"
            color="#002A57"
            size={RFValue(15)}
            style={{ marginLeft: -10, marginTop: -5 }}
            onPress={() => this.setState({ popover: false })}
          />
        </View>
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
            <TouchableOpacity onPress={() => this.openMaps()}>
              <Text style={styles.contentText}>
                {this.state.placeData["address"]}
              </Text>
            </TouchableOpacity>

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
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => this._panel.show()}
          >
            <Text style={styles.smallButtonText}>More Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallButton}
            onPress={() => this.randomSelection()}
          >
            <Text style={styles.smallButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.main}>
        {this.topBar()}
        <View style={styles.mainCol}>
          {this.state.spinner ? (
            <ActivityIndicator size="large" color="white" />
          ) : this.state.randomSelection ? (
            <AnimatedLoader
              visible={this.state.randomSelection}
              overlayColor="rgba(255,255,255,0)"
              source={require("../Animations/load.json")}
              animationStyle={styles.customSpinner}
              speed={1}
            />
          ) : this.state.popover ? (
            this.popover()
          ) : (
            <View style={styles.mainCol}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Filtered Selection</Text>
              </TouchableOpacity>
              <View style={{ marginTop: screenHeight * 0.05 }} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.randomSelection()}
              >
                <Text style={styles.buttonText}>Random Selection</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {this.state.bottomMenu && (
          <SlidingUpPanel
            ref={(node) => (this._panel = node)}
            height={screenHeight * 0.6}
            draggableRange={{ top: screenHeight * 0.6, bottom: 0 }}
            // onBottomReached={() => this.setState({ bottomMenu: false })}
          >
            {(dragHandler) => (
              <SlidingPanelContents dragHandler={dragHandler} />
            )}
          </SlidingUpPanel>
        )}

        {/* create another sliding panel component that doesn't need to be conditionally rendered and call it from
        getFilter */}

        <SlidingUpPanel
          ref={(node) => (this._filterPanel = node)}
          height={screenHeight * 0.4}
          draggableRange={{ top: screenHeight * 0.4, bottom: 0 }}
          // onBottomReached={() => this.setState({ bottomMenu: false })}
        >
          {(dragHandler) => (
            <Filters
              dragHandler={dragHandler}
              filterType={this.state.filterType}
            />
          )}
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    backgroundColor: "#002A57",
  },
  topBar: {
    position: "absolute",
    top: 0,
    width: "100%",
    backgroundColor: "white",
    height: "20%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 1,
  },
  row1: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.025,
  },
  row2: {
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  bigBox: {
    width: "60%",
    height: screenHeight * 0.04,
    borderColor: "#FF6B00",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  smallBox: {
    width: "20%",
    height: screenHeight * 0.03,
    zIndex: 2,
    borderColor: "#FF6B00",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 2,
    paddingRight: 2,
  },
  row1Text: {
    fontSize: RFValue(14),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
  },
  row2Text: {
    fontSize: RFValue(8),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
  },
  mainCol: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: "20%",
    width: "100%",
  },
  button: {
    width: "70%",
    height: screenHeight * 0.075,
    backgroundColor: "#FF6B00",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: RFValue(16),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    fontWeight: "bold",
  },
  customSpinner: {
    width: RFValue(125),
    height: RFValue(125),
  },
  popover: {
    height: screenHeight * 0.35,
    width: screenWidth * 0.9,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  popoverText: {
    fontSize: RFValue(16),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    fontWeight: "bold",
  },
  popoverHeaderRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
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
    borderRadius: (screenHeight * 0.13) / 4,
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
  buttonRow: {
    width: screenWidth * 0.9,
    marginTop: screenHeight * 0.04,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  smallButton: {
    width: screenWidth * 0.3,
    height: screenHeight * 0.05,
    backgroundColor: "#FF6B00",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  smallButtonText: {
    fontSize: RFValue(12),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    fontWeight: "bold",
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
