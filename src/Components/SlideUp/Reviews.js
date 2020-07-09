import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import contactReducer from "../../reducers/index";
import { ScrollView } from "react-native-gesture-handler";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragHandler: contactReducer(null, "GET_DRAG_HANDLE"),
      placeData: null,
    };
  }

  componentDidMount() {
    const placeData = contactReducer(null, "GET_PLACE_DATA");

    console.log("review: " + placeData["reviews"][0]);

    this.setState({
      placeData: placeData,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.placeData != null && (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {this.state.placeData["reviews"].map((val, idx) => {
              return (
                <View style={styles.scrollContainer} key={idx}>
                  <View style={styles.topSection}>
                    <Image
                      source={{
                        uri: val["profile_photo_url"],
                      }}
                      style={styles.image}
                    />
                  </View>
                </View>
              );
            })}
          </ScrollView>
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
  },
  scrollContainer: {
    width: screenWidth,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
  },
  topSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    height: screenHeight * 0.1,
    width: screenWidth * 0.15,
    resizeMode: "contain",
  },
});
