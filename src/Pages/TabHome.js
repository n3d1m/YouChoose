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
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Entypo, Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import contactReducer from "../reducers/index";
import AnimatedLoader from "react-native-animated-loader";

//StatusBar.setBarStyle("dark-content", true);

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class TabHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.setState({ randomSelection: true });
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
      "https://parilis.serveo.net/random_selection",
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
        // console.log(returnStatement);
        placeData = returnStatement;
      } else {
        error = true;
      }
      this.setState({
        randomSelection: false,
        error: error,
        popover: true,
        placeData: placeData,
      });
    }
  };

  componentDidMount() {
    this.getLocation();
  }

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
              <View style={styles.smallBox} key={idx}>
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
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  popover = () => {
    console.log(this.state.placeData["image_url"]);
    return (
      <View style={styles.popover}>
        <View style={styles.popoverHeaderRow}>
          <View style={{ width: RFValue(15) }} />
          <Text style={styles.popoverText}>Your Selection:</Text>
          <AntDesign
            name="close"
            color="#002A57"
            size={RFValue(15)}
            style={{ marginLeft: -10, marginTop: -10 }}
            onPress={() => this.setState({ popover: false })}
          />
        </View>
        <View style={styles.contentRow}>
          <Image
            source={{ uri: this.state.placeData["image_url"] }}
            style={styles.image}
          />
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
                <Text
                  style={styles.buttonText}
                  onPress={() => {
                    this.randomSelection();
                  }}
                >
                  Random Selection
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
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
    height: screenHeight * 0.4,
    width: screenWidth * 0.85,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  popoverText: {
    fontSize: RFValue(18),
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
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  image: {
    height: screenHeight * 0.15,
    width: screenWidth * 0.4,
    resizeMode: "cover",
    borderRadius: (screenHeight * 0.15) / 4,
  },
});
