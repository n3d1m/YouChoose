import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import contactReducer from "../../reducers/index";
import { ScrollView } from "react-native-gesture-handler";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Rating } from "react-native-ratings";

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
                <View
                  style={[
                    styles.scrollContainer,
                    idx < this.state.placeData["reviews"].length - 1 &&
                      styles.scrollBorder,
                  ]}
                  key={idx}
                >
                  <View style={styles.topSection}>
                    <Image
                      source={{
                        uri: val["profile_photo_url"],
                      }}
                      style={styles.image}
                    />
                    <View style={styles.textCol}>
                      <Text style={styles.topText}>{val["author_name"]}</Text>
                      <View style={styles.ratingRow}>
                        <Rating
                          ratingColor="#FF6B00"
                          type="custom"
                          imageSize={RFValue(10)}
                          startingValue={val["rating"]}
                          readonly={true}
                        />
                        <Text style={styles.ratingText}>
                          ({val["relative_time_description"]})
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.ratingSection}>
                    <Text style={styles.descriptionText}>{val["text"]}</Text>
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
    paddingBottom: screenHeight * 0.015,
  },
  scrollBorder: {
    borderBottomColor: "#FF6B00",
    borderBottomWidth: 1,
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
  topText: {
    fontSize: RFValue(12),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
  },
  textCol: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    marginLeft: 10,
  },
  ratingSection: {
    width: screenWidth * 0.95,
    textAlign: "left",
  },
  ratingRow: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  ratingText: {
    fontSize: RFValue(10),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    marginLeft: 5,
  },
  descriptionText: {
    fontSize: RFValue(12),
    fontFamily: "AvenirNext-Regular",
    color: "#002A57",
    marginTop: 5,
  },
});
