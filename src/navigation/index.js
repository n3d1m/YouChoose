import * as React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Bottom from "../Components/Bottom";
import AppHome from "../Pages/AppHome";
import TabHome from "../Pages/TabHome";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store from "../store/index";

const stackOptions = {
  headerMode: "none",
  transparentCard: true,
};

function BottomBar() {
  return <Bottom />;
}

function HomePage({ navigation }) {
  StatusBar.setBarStyle("light-content", true);
  return <AppHome goToMain={() => navigation.navigate("Main")} />;
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// navigationOptions: {
//   tabBarIcon: () => <Entypo name="Home" color="#FF6B00" />,
// },

function Main() {
  StatusBar.setBarStyle("dark-content", true);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          }

          return (
            <TouchableHighlight>
              <MaterialCommunityIcons
                color="#FF6B00"
                size={35}
                name={iconName}
                style={{ marginTop: 5 }}
              />
            </TouchableHighlight>
          );
        },
      })}
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#FF6B00",
        inactiveTintColor: "#FF6B00",
        showLabel: true,
        labelPosition: "below-icon",
        tabStyle: {
          marginTop: "2%",
        },
        style: {
          height: "10%",
        },
      }}
    >
      <Tab.Screen name="Home" component={TabHome} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AppHome"
          headerMode="none"
          screenOptions={{ transparentCard: true }}
        >
          <Stack.Screen name="AppHome" component={HomePage} />
          <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
