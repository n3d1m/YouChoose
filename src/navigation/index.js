import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Bottom from "../Components/Bottom";
import AppHome from "../Pages/AppHome";
import Main from "../Pages/Main";

const stackOptions = {
  headerMode: "none",
  transparentCard: true,
};

function BottomBar() {
  return <Bottom />;
}

function HomePage({ navigation }) {
  return <AppHome goToMain={() => navigation.navigate("Main")} />;
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppHome"
        headerMode="none"
        screenOptions={{ transparentCard: true }}
      >
        <Stack.Screen name="AppHome" component={HomePage} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerTitle: (props) => <BottomBar {...props} /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//   {
//     AppHome: {
//       screen: AppHome,
//     },
//     // Forgot: {
//     //   screen: Forgot,
//     //   navigationOptions: {
//     //     ...TransitionPresets.SlideFromRightIOS,
//     //     gestureDirection: "horizontal-inverted",
//     //   },
//     // },
//   },
//   {
//     initialRouteName: "AppHome",
//     headerMode: "none",
//   }
// );

export default App;
