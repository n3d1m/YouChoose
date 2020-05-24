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
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import axios from "axios";
import contactReducer from "../reducers/index";

StatusBar.setBarStyle("dark-content", true);

const screenHeight = Math.round(Dimensions.get("window").height);

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

  randomSelection = () => {
    console.log(this.state.latLong);
  };

  componentDidMount() {
    this.getLocation();
    const authData = contactReducer(null, "GET_AUTH");
    console.log(authData);
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

  render() {
    return (
      <View style={styles.main}>
        {this.topBar()}
        <View style={styles.mainCol}>
          {this.state.spinner ? (
            <ActivityIndicator size="large" color="white" />
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
});
