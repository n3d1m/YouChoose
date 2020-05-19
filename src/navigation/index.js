import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppHome from "../Pages/AppHome";
import Main from "../Pages/Main";

const stackOptions = {
  headerMode: "none",
  transparentCard: true,
};

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppHome"
        headerMode="none"
        screenOptions={{ transparentCard: true }}
      >
        <Stack.Screen name="AppHome" component={AppHome} />
        <Stack.Screen name="Main" component={Main} />
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
