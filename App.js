import React from "react";
import { Provider } from "react-redux";
import store from "./src/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./src/screens/MainScreen";
import AppTabNavigation from "./src/navigation/AppTabNavigation";
import SingUp from "./src/screens/SingUp";
import SignIn from "./src/screens/SingIn";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="SingIn" component={SignIn} />
          <Stack.Screen name="SingUp" component={SingUp} />
          <Stack.Screen name="AppTabNavigation" component={AppTabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
