import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import contactReducer from "../../reducers/index";
import { ScrollView } from "react-native-gesture-handler";

const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);

export default class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragHandler: contactReducer(null, "GET_DRAG_HANDLE"),
      placeData: null,
    };
  }

  componentDidMount() {
    //console.log("i am being called");

    const placeData = contactReducer(null, "GET_PLACE_DATA");

    this.setState({
      placeData: placeData,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.placeData != null && (
          <ScrollView contentContainerStyle={styles.photoCol}>
            {this.state.placeData["photo_array"].map((val, idx) => {
              return (
                <View style={styles.imageContainer} key={idx}>
                  <Image
                    source={{
                      uri: val,
                    }}
                    style={styles.image}
                  />
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
    paddingBottom: "10%",
  },
  photoCol: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    width: screenWidth,
  },
  image: {
    height: screenHeight * 0.35,
    width: screenWidth * 0.9,
    resizeMode: "stretch",
    borderRadius: 7.5,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#FF6B00",
    marginTop: 20,
  },
});
