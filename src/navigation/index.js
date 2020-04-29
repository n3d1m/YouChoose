import { createAppContainer } from "react-navigation";
import {
  createStackNavigator,
  TransitionPresets,
} from "react-navigation-stack";
import { fromLeft, zoomIn, zoomOut } from "react-navigation-transitions";
import AppHome from "../Pages/AppHome";
import Forgot from "../Components/Forgot";

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  // Custom transitions go there
  // if (prevScene
  //   && prevScene.route.routeName === 'ScreenA'
  //   && nextScene.route.routeName === 'ScreenB') {
  //   return zoomIn();
  // } else if (prevScene
  //   && prevScene.route.routeName === 'ScreenB'
  //   && nextScene.route.routeName === 'ScreenC') {
  //   return zoomOut();
  // }
  return fromLeft();
};

const StackNavigator = createStackNavigator(
  {
    AppHome: {
      screen: AppHome,
    },
    // Forgot: {
    //   screen: Forgot,
    //   navigationOptions: {
    //     ...TransitionPresets.SlideFromRightIOS,
    //     gestureDirection: "horizontal-inverted",
    //   },
    // },
  },
  {
    initialRouteName: "AppHome",
    headerMode: "none",
  }
);

export default createAppContainer(StackNavigator);
